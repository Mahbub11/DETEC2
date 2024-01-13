import { createSlice } from "@reduxjs/toolkit";
import { API_LEVEL } from "../../config";
// import { dispatch } from "../store";
import axiosInstance from "../../utils/axios";
import { ShowNotification } from "../actions";

// ----------------------------------------------------------------------

const initialState = {
  statData: [],
  error: null,
  loading: false,
  statReading: [],
  statWriting: [],
  statVocabulary: [],
  statSpeaking: [],
  statListening: [],
};

const slice = createSlice({
  name: "statistic",
  initialState,
  reducers: {
    SaveStatDataFailed: (state, action) => {
      state.error = action.payload;
    },
    ClearStatError: (state, action) => {
      state.error = null;
    },
    RequestStatData: (state, action) => {
      state.loading = true;
    },
    RequestStatDataSuccess: (state, action) => {
      state.loading = false;
      state.statData = action.payload.payload;
    },
    SavingReadingList: (state, action) => {
      state.statReading = action.payload.payload;
    },
    SavingWritingList: (state, action) => {
      state.statWriting = action.payload.payload;
    },
    SavingSpeakingList: (state, action) => {
      state.statSpeaking = action.payload.payload;
    },
    SavingListeningList: (state, action) => {
      state.statListening = action.payload.payload;
    },
    SavingVocList: (state, action) => {
      state.statVocabulary = action.payload.payload;
    },
  },
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------
//  Actions:
export const saveStatData = (data) => async (dispatch) => {
  try {
    console.log(data);
    axiosInstance
      .post(`${API_LEVEL}/profile/save-stat-duolingo`, data)
      .then((res) => {})
      .catch((error) => {
        console.log(error);
        dispatch(ShowNotification({severity:'error',message:'Statistic data Saving Failed'}))
       
      });
  } catch (error) {}
};

export const clearStatDataError = (data) => async (dispatch) => {
  dispatch(slice.actions.ClearStatError());
};

export const getStatDuolingo = (data) => async (dispatch) => {
  dispatch(slice.actions.RequestStatData());

  try {
    axiosInstance
      .get(`${API_LEVEL}/profile/get-statd`)
      .then((response) => {
        const voc = response.data.list.filter((val) => val.type === 1);
        const reading = response.data.list.filter((val) => val.type === 3);
        const writing = response.data.list.filter((val) => val.type === 2);
        const listening = response.data.list.filter((val) => val.type === 5);
        const speaking = response.data.list.filter((val) => val.type === 4);
 
        dispatch(
          slice.actions.RequestStatDataSuccess({
            payload: response.data.list,
          })
        );
        dispatch(
          slice.actions.SavingVocList({
            payload: voc,
          })
        );
        dispatch(
          slice.actions.SavingReadingList({
            payload: reading,
          })
        );
        dispatch(
          slice.actions.SavingWritingList({
            payload: writing,
          })
        );
        dispatch(
          slice.actions.SavingListeningList({
            payload: listening,
          })
        );
        dispatch(
          slice.actions.SavingSpeakingList({
            payload: speaking,
          })
        );
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    console.log(error);
  }
};
