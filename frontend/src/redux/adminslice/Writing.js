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
  name: "writing",
  initialState,
  reducers: {
    Savequest: (state) => {
      state.loading = true;
    },
    SaveRequestSuccess: (state, action) => {
      state.loading = false;
    },
    SavereRequestFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------
//  Actions:

export const SaveWriting = (data) => async (dispatch) => {
  console.log(data)
  try {
    axiosInstance
      .post(
        `${API_LEVEL}/module/writing/create`,
        data

      )
      .then((response) => {
        dispatch(  ShowNotification({severity:'success',message:'Saved Successfully'}))
        console.log(response);
      })
      .catch((error) => {
        dispatch( ShowNotification({severity:'error',message:'We have an error'}))
        
        console.log(error.message);
      });
  } catch (error) {}
};

export const UpdatWriting = (data) => async (dispatch) => {
  try {


    console.log(data)
    axiosInstance
      .put(`${API_LEVEL}/module/writing/update`, data)
      .then((response) => {
        dispatch(  ShowNotification({severity:'success',message:'Updated Successfully'}))
        console.log(response);
      })
      .catch((error) => {
        dispatch( ShowNotification({severity:'error',message:'We have an error'}))
        console.log(error.message);
      });
  } catch (error) {}
};
