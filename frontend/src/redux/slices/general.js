import { createSlice, current } from "@reduxjs/toolkit";
import axios from "axios";
import { ShowNotification } from "../actions";
// import { dispatch } from "../store";

// ----------------------------------------------------------------------

const initialState = {
 notificationState: false,
 isModalOpen:false,
};

const slice = createSlice({
  name: "general",
  initialState,
  reducers: {
    destroyNotification: (state, action) => {
      state.notificationState = false
    },
    initNotification: (state, action) => {
      if(state.isModalOpen){
        state.notificationState = true
      }
      
    },
    modalViewClose: (state, action) => {
      state.isModalOpen =  false
    },
    modalViewOpen: (state, action) => {
      state.isModalOpen =  true
    },
    
  },
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------
//  Actions:

export const destroyNotificationState = (sentences) => async (dispatch) => {
 try {
    dispatch(slice.actions.destroyNotification());
    
 } catch (error) {
    dispatch(ShowNotification({severity:'error',message:error.message}))
    
 }
};

export const setNotification = (sentences) => async (dispatch) => {
  try {
     dispatch(slice.actions.initNotification());
     
  } catch (error) {
     dispatch(ShowNotification({severity:'error',message:error.message}))
     
  }
 };
 
 export const closeModalActivity = (sentences) => async (dispatch) => {

  try {
    dispatch(slice.actions.modalViewClose());
    
 } catch (error) {
    dispatch(ShowNotification({severity:'error',message:error.message}))
    
 }
 }
 export const openModal = (sentences) => async (dispatch) => {

  try {
    dispatch(slice.actions.modalViewOpen());
    
 } catch (error) {
    dispatch(ShowNotification({severity:'error',message:error.message}))
    
 }
 }

