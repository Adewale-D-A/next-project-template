import { Player } from "@/types/player";
import { pagination } from "@/types/types";
import { createSlice } from "@reduxjs/toolkit";

export const playersListData = createSlice({
  name: "all-players",
  initialState: {
    value: {
      status: false,
      pagination: [] as {
        pagination_data: pagination;
        data: Player[];
      }[],
      data: [] as Player[],
    },
  },
  reducers: {
    updatePlayersList: (state, action) => {
      state.value.status = true;
      state.value.data = action?.payload?.data;
    },
    addPlayerToList: (state, action) => {
      state.value.data = [...state.value.data, action?.payload];
      //include in pagination data
      const pagination_data = [...state.value.pagination];
      const lastIndex = pagination_data?.length - 1;
      const addedItem = pagination_data.map((item, index) => {
        if (lastIndex === index) {
          return {
            pagination_data: item?.pagination_data,
            data: [...item.data, action?.payload],
          };
        } else {
          return item;
        }
      });
      state.value.pagination = addedItem;
    },
    addToPaginationHistory: (state, action) => {
      const found = state.value?.pagination?.find(
        (item) =>
          item?.pagination_data?.current_page ===
          action?.payload?.pagination_data?.current_page
      );
      if (!found) {
        state.value.pagination = [
          ...state.value.pagination,
          {
            pagination_data: action?.payload?.pagination_data,
            data: action?.payload?.data,
          },
        ];
      }
    },
    removePlayerInList: (state, action) => {
      const { id } = action?.payload;
      const currentArray = [...state.value.data];
      const currentIndex = currentArray.findIndex((v) => v.id === id);
      if (currentIndex >= 0) {
        currentArray.splice(currentIndex, 1);
        state.value.data = currentArray;
      }
      //remove from paginated data
      const pagination_data = [...state.value.pagination];
      const removed = pagination_data.map((item, index) => {
        const sencondFilter = item.data.filter((data, i) => {
          return !(data.id === id);
        });
        return {
          pagination_data: { ...item.pagination_data },
          data: sencondFilter,
        };
      });
      state.value.pagination = removed;
    },
    replacePlayerInList: (state, action) => {
      const { id } = action?.payload;
      const currentArray = state.value.data;
      const currentIndex = currentArray.findIndex((v) => v.id === id);
      if (currentIndex >= 0) {
        currentArray.splice(currentIndex, 1, action?.payload);
        state.value.data = currentArray;
      }
      //REPLACE pagination data
      const pagination_data = [...state.value.pagination];
      const replacedItem = pagination_data.map((item, index) => {
        const sencondFilter = item.data.map((data, i) => {
          if (data.id === id) {
            return { ...action.payload };
          } else {
            return data;
          }
        });
        return {
          pagination_data: { ...item.pagination_data },
          data: sencondFilter,
        };
      });
      state.value.pagination = replacedItem;
    },
    clearPlayersList: (state) => {
      state.value.status = false;
      state.value.data = [];
    },
  },
});

export const {
  updatePlayersList,
  addPlayerToList,
  addToPaginationHistory,
  removePlayerInList,
  replacePlayerInList,
  clearPlayersList,
} = playersListData.actions;

export default playersListData.reducer;
