import { createSlice } from "@reduxjs/toolkit";
import { API_LEVEL } from "../../config";
// import { dispatch } from "../store";
import axiosInstance from "../../utils/axios";

// ----------------------------------------------------------------------

const initialState = {
  userChoice: [],
  loading: false,
  visibility: false,
  checkbox: false,
  error: null,
};

const slice = createSlice({
  name: "wordSelect",
  initialState,
  reducers: {
    ToggleVisiblity: (state, action) => {
      state.visibility = !state.visibility;
    },
    SaveUserChoice: (state, action) => {
      state.userChoice = action.payload.payload;
    },
    ClearUserChoice: (state, action) => {
      state.userChoice =[]
    },
    ForceChecked: (state, action) => {
      state.checkbox = !state.checkbox;
    },
    SaveStatDataFailed: (state, action) => {
      state.error = action.payload;
    },
    ClearStatError: (state, action) => {
      state.error = null
    },
  },
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------
//  Actions:

export const ToggleVisibility = (data) => async (dispatch) => {
  try {
    dispatch(slice.actions.ToggleVisiblity());
  } catch (error) {}
};
export const saveUserchoice = (data) => async (dispatch) => {
  try {
    dispatch(
      slice.actions.SaveUserChoice({
        payload: data,
      })
    );
  } catch (error) {}
};
export const CleanUserchoice = (data) => async (dispatch) => {
  try {
    dispatch(slice.actions.ClearUserChoice());
  } catch (error) {
    
  }

}
export const removeChecked = (data) => async (dispatch) => {
  try {
    dispatch(slice.actions.ForceChecked());
  } catch (error) {}
};

export const saveVocStatistic = (data) => async (dispatch) => {
  try {
    console.log(data);
    axiosInstance
      .post(`${API_LEVEL}/profile/save-stat-duolingo`, data)
      .then((res) => {})
      .catch((error) => {
        console.log(error);
        dispatch(
          slice.actions.SaveStatDataFailed("Statistic data Saving Failed")
        );
      });
  } catch (error) {}
};

export const clearStatDataError = (data) => async (dispatch) => {
  dispatch(
    slice.actions.ClearStatError()
  );
}