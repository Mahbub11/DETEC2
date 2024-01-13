import { createSlice } from "@reduxjs/toolkit";
import { dispatch } from "../store";
import { CloseNotification, ForceBlurFalse, ShowNotification, ToggleBlury } from "../actions";
// import axios from "../../utils/axios";
import { API_LEVEL } from "../../config";

// ----------------------------------------------------------------------

const initialState = {
  common: {
    loading: true,
    error: null,
    blury: false,
    open:false,
    severity:null,
    message:[],
    showOption:true,
    checkBox:false
  },
};

const slice = createSlice({
  name: "app",
  initialState,
  reducers: {

    DisableOptionsForce: (state, action) => {
      state.common.showOption = false;
    },
    ShowOptionsForce: (state, action) => {
      state.common.showOption = true;
    },
    DisableCheckForce: (state, action) => {
      state.common.checkBox = false;
    },
   
  },

  extraReducers(builder) {
    builder.addCase(ShowNotification, (state,action)=>{
      state.common.open = true;
      state.common.severity = action.payload.severity;
      state.common.message = action.payload.message;
      
    }).addCase(CloseNotification,(state,action)=>{
      state.common.open = false;
      state.common.message = null;
    })
    builder.addCase(ToggleBlury, (state, action) => {
      state.common.blury = !state.common.blury;
    });
    builder.addCase(ForceBlurFalse, (state, action) => {
      state.common.blury = false
    });
  },
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------
//  Actions:
export const DisableOptionView = (data) => async (dispatch) => {
 

  try {
    dispatch(slice.actions.DisableOptionsForce());
  } catch (error) {}
};
export const ShowOptionView = (data) => async (dispatch) => {
 

  try {
    dispatch(slice.actions.ShowOptionsForce());
  } catch (error) {}
};
export const DisableCheckBoxView = (data) => async (dispatch) => {
 

  try {
    dispatch(slice.actions.DisableCheckForce());
  } catch (error) {}
};

