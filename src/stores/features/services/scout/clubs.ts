import { Club } from "@/types/scout/clubs";
import { pagination } from "@/types/types";
import { createSlice } from "@reduxjs/toolkit";

export const clubs = createSlice({
  name: "clubs",
  initialState: {
    value: {
      status: false,
      pagination: [] as {
        pagination_data: pagination;
        data: Club[];
      }[],
      data: [] as Club[],
    },
  },
  reducers: {
    updateClubs: (state, action) => {
      state.value.status = true;
      state.value.data = action?.payload?.data;
    },
    addClubToList: (state, action) => {
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
    removeClubInList: (state, action) => {
      const { _id } = action?.payload;
      const currentArray = [...state.value.data];
      const currentIndex = currentArray.findIndex((v) => v._id === _id);
      if (currentIndex >= 0) {
        currentArray.splice(currentIndex, 1);
        state.value.data = currentArray;
      }
      //remove from paginated data
      const pagination_data = [...state.value.pagination];
      const removed = pagination_data.map((item, index) => {
        const sencondFilter = item.data.filter((data, i) => {
          return !(data._id === _id);
        });
        return {
          pagination_data: { ...item.pagination_data },
          data: sencondFilter,
        };
      });
      state.value.pagination = removed;
    },
    replaceClubInList: (state, action) => {
      const { _id } = action?.payload;
      const currentArray = state.value.data;
      const currentIndex = currentArray.findIndex((v) => v._id === _id);
      if (currentIndex >= 0) {
        const currentDataset = currentArray[currentIndex];
        currentArray.splice(currentIndex, 1, {
          ...currentDataset,
          ...action?.payload,
        });
        state.value.data = currentArray;
      }
      //REPLACE pagination data
      const pagination_data = [...state.value.pagination];
      const replacedItem = pagination_data.map((item) => {
        const sencondFilter = item.data.map((data) => {
          if (data._id === _id) {
            return { ...data, ...action.payload };
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
    clearClubsList: (state) => {
      state.value.status = false;
      state.value.data = [];
    },
  },
});

export const {
  updateClubs,
  addClubToList,
  addToPaginationHistory,
  removeClubInList,
  replaceClubInList,
  clearClubsList,
} = clubs.actions;

export default clubs.reducer;
