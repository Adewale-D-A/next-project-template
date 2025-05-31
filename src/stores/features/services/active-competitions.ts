import { Competition } from "@/types/competition";
import { pagination } from "@/types/types";
import { createSlice } from "@reduxjs/toolkit";

export const activeCompetitions = createSlice({
  name: "active-competitions",
  initialState: {
    value: {
      status: false,
      pagination: [] as {
        pagination_data: pagination;
        data: Competition[];
      }[],
      data: [] as Competition[],
    },
  },
  reducers: {
    updateActiveCompetition: (state, action) => {
      state.value.status = true;
      state.value.data = action?.payload?.data;
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
    replaceActiveCompetition: (state, action) => {
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
    clearActiveCompetition: (state) => {
      state.value.status = false;
      state.value.data = [];
    },
  },
});

export const {
  updateActiveCompetition,
  addToPaginationHistory,
  replaceActiveCompetition,
  clearActiveCompetition,
} = activeCompetitions.actions;

export default activeCompetitions.reducer;
