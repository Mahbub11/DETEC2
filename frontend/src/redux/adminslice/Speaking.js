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
};

const slice = createSlice({
  name: "speaking",
  initialState,
  reducers: {
    SaveRequest: (state) => {
      state.loading = true;
    },
    SaveRequestSuccess: (state, action) => {
      state.loading = false;
    },
    SaveRequestFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------
//  Actions:

export const SaveSpeaking = (data) => async (dispatch) => {
  try {

    axiosInstance
    .post(
      `${API_LEVEL}/module/speaking/create`,
      data

    )
    .then((response) => {
     dispatch(  ShowNotification({severity:'success',message:'Saved Successfully'}))
      console.log(response);
    })
    .catch((error) => {
      dispatch( ShowNotification({severity:'error',message:'We have an error'}))
      console.log(error);
    });
  } catch (error) {}
};



export const UpdatSpeaking = (data) => async (dispatch) => {
  try {

    console.log(data)
    axiosInstance
      .put(`${API_LEVEL}/module/speaking/update`, data)
      .then((response) => {
        dispatch(  ShowNotification({severity:'success',message:'Updated Successfully'}))
      })
      .catch((error) => {
        console.log(error)
        dispatch( ShowNotification({severity:'error',message:'We have an error'}))
      });
  } catch (error) {}
};