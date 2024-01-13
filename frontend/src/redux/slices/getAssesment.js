import { createSlice,current } from "@reduxjs/toolkit";
import axios from "axios";
import { API_LEVEL } from "../../config";
import axiosInstance from "../../utils/axios";
// import { dispatch } from "../store";

// ----------------------------------------------------------------------

const initialState = {
  loading:  true,
  sentenceError: [],
  userInputSen: [],
  finalReWrite: [],
  error: null,
  showAssesment: false,
};

const slice = createSlice({
  name: "getAssesment",
  initialState,
  reducers: {
    getResultRequest: (state, action) => {
      state.loading= true
    },
    getResultRequestSuccess: (state, action) => {
      state.loading =  false;
      state.showAssesment =  true;
      state.sentenceError = action.payload.sentenceError;
      state.userInputSen = action.payload.userInputSen;
      state.finalReWrite = action.payload.finalReWrite;
      
    },
    getResultRequestFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload.payload;
    },
    // showAssesmentRequest: (state) => {
    //   state.showAssesment =  !state.showAssesment;
    // },
    closeAssesmentRequest: (state) => {
      state.showAssesment = false;
      state.sentenceError =[]
      state.userInputSen =[]
      state.finalReWrite = []
    },
  },
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------
//  Actions:

export const getInputAssesment = (sentences) => async (dispatch) => {
  try { 
    
   
    dispatch(slice.actions.getResultRequest());
    await axios
      .post(`http://localhost:8801/api/`, { influent_sentences: sentences })
      .then((response) => {

        
        let finalWrite = [];
      ( response.data.result).map((val) => {
           finalWrite.push(val.correct)
        });
       console.log(response.data.result)

        dispatch(
          slice.actions.getResultRequestSuccess({
            sentenceError: response.data.result,
            userInputSen: sentences,
            finalReWrite:finalWrite
          })
        );
        

      
      })
      .catch((error) => dispatch(
        slice.actions.getResultRequestFailed({
            error: error
        })
      ));
  } catch (error) {
    slice.actions.getResultRequestFailed({
        error: error
    })
  }
};
export const showAssesmentModal = (data) => async (dispatch) => {
  console.log('fff')

  try {
    dispatch(slice.actions.showAssesmentRequest());

    
  } catch (error) {
   

    console.log(error);
  }
};
export const closeAssesmentModal = (data) => async (dispatch) => {
  console.log('fff')

  try {
    dispatch(slice.actions.closeAssesmentRequest());

    
  } catch (error) {
   

    console.log(error);
  }
};

export const speakingAssesment = (data) => async (dispatch) => {
 
console.log('reached')
  try {
   
    let da=[]
    Object.entries(data).map((val, i) => {
      if (val.length > 0) {
        if (val[1].length > 0) {
         da.push( val[1]+'.')
        }
      }
    });
    console.log((da));
    await axiosInstance
    .post(`http://localhost:8801/api/`, { influent_sentences: da })
    .then((response) => {
      console.log(response);


    })

    
  } catch (error) {
   

    console.log(error);
  }
};

