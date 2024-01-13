import { createSlice } from "@reduxjs/toolkit";
import { dispatch } from "../store";
import axiosInstant from "../../utils/axios";
import axiosInstance from "../../utils/axios";
import { API_LEVEL } from "../../config";
import { ShowNotification } from "../actions";

// ----------------------------------------------------------------------

const initialState = {
  loading: false,
  error: [],
  initializeData: null,
};

const slice = createSlice({
  name: "Reading",
  initialState,
  reducers: {
    SaveReadingquest: (state) => {
      state.loading = true;
    },
    SaveReadingRequestSuccess: (state, action) => {
      state.loading = false;
    },
    SavereadingRequestFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    SaveInitializedData: (state, action) => {
      state.loading = false;
      state.initializeData = action.payload.data;
    },
    ClearInitializedData: (state, action) => {
      state.loading = false;
      state.initializeData = null;
    },
  },
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------
//  Actions:

export const SaveReading = (data) => async (dispatch) => {
  try {
    axiosInstance
      .post(`${API_LEVEL}/module/reading/create`, {
        title: data.title ? data.title : "",
        type: data.type,
        inner_type: data.innerType,
        level: data.level,
        time: data.time,
        qa: {
          q: data.question,
          a: data.ansList,
          options: data.optionList ? data.optionList : "",
          passage: data.passage ? data.passage : "",
        },
      })
      .then((response) => {
        dispatch(
          ShowNotification({
            severity: "success",
            message: "Saved Successfully",
          })
        );
      })
      .catch((error) => {
        dispatch(
          ShowNotification({ severity: "error", message: "We have an error" })
        );
      });
  } catch (error) {}
};

export const SaveInteractiveReading = (data) => async (dispatch) => {
  try {

    axiosInstance
      .post(`${API_LEVEL}/module/reading-interactive/create`, {
        title: data.title ? data.title : "",
        rid: data.rid,
        inner_type: data.innerType,
        qa: {
          q: data.question,
          a: data.ansList,
          options: data.optionList ? data.optionList : "",
          passage: data.passage ? data.passage : "",
        },
      })
      .then((response) => {
        dispatch(
          ShowNotification({
            severity: "success",
            message: "Saved Successfully",
          })
        );
      })
      .catch((error) => {
        dispatch(
          ShowNotification({ severity: "error", message: error.message })
        );
      });
  } catch (error) {}
};

export const UpdatReading = (data) => async (dispatch) => {
  try {
    axiosInstance
      .put(`${API_LEVEL}/module/reading/update`, {
        id: data.id,
        title: data.title,
        type: data.type,
        inner_type: data.innerType,
        level: data.level,
        time: data.time,
        qa: {
          q: data.question,
          a: data.ansList,
          options: data.optionList ? data.optionList : "",
          passage: data.passage ? data.passage : "",
        },
      })
      .then((response) => {
        dispatch(
          ShowNotification({
            severity: "success",
            message: "Saved Successfully",
          })
        );
      })
      .catch((error) => {
        dispatch(
          ShowNotification({ severity: "error", message: "We have an error" })
        );
      });
  } catch (error) {}
};

export const inilizeInteractiveReading = (data) => async (dispatch) => {
  try {



    axiosInstance
      .post(`${API_LEVEL}/module/reading/create`, {
        type: data.type,
        inner_type: data.innerType,
        level: data.level,
        time: data.time,
        qa: {},
      })
      .then((response) => {
        dispatch(slice.actions.SaveInitializedData(response));
        dispatch(
          ShowNotification({
            severity: "success",
            message: "Initialized module",
          })
        );
      })
      .catch((error) => {
        dispatch(
          ShowNotification({ severity: "error", message: "We have an error" })
        );
      });
  } catch (error) {}
};

export const clearInterActiveInitial = (data) => async (dispatch) => {
  try {
    dispatch(slice.actions.ClearInitializedData());
  } catch (error) {}
};


export const UpdatInteractiveReading = (data) => async (dispatch) => {
  try {
    axiosInstance
      .put(`${API_LEVEL}/module/reading/update-interactive`, {
        id: data.id,
        title: data.title,
        qa: {
          q: data.question,
          a: data.ansList,
          options: data.optionList ? data.optionList : "",
          passage: data.passage ? data.passage : "",
        },
      })
      .then((response) => {
        dispatch(
          ShowNotification({
            severity: "success",
            message: "Updated Successfully",
          })
        );
      })
      .catch((error) => {
        dispatch(
          ShowNotification({ severity: "error", message: "We have an error" })
        );
      });
  } catch (error) {}
};