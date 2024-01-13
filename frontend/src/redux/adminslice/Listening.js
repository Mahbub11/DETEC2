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
  name: "listening",
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

export const SaveListening = (data) => async (dispatch) => {
  try {

    
    axiosInstance
    .post(
      `${API_LEVEL}/module/listening/create`,
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



export const UpdatListening = (data) => async (dispatch) => {
  try {

    axiosInstance
      .put(`${API_LEVEL}/module/listening/update`, data)
      .then((response) => {
        dispatch(  ShowNotification({severity:'success',message:'Updated Successfully'}))
      })
      .catch((error) => {
        console.log(error)
        dispatch( ShowNotification({severity:'error',message:'We have an error'}))
      });
  } catch (error) {}
};