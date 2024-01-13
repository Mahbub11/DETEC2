import { createSlice, current } from "@reduxjs/toolkit";
// import { dispatch } from "../store";

// ----------------------------------------------------------------------

const initialState = {
  loading: false,
  isEvaluate: false,
  currentQ: 0,
  data: null,
  voiceIndex: 0,
  voiceList: [],
  evaluateResult: [],
};

const slice = createSlice({
  name: "converSationHandler",
  initialState,
  reducers: {
    startEvaluate: (state, action) => {
      state.isEvaluate = true;
      state.currentQ = action.payload.currentQ;
      state.data = action.payload.data;
      state.voiceIndex = action.payload.voiceIndex;
      state.voiceList = action.payload.voiceList;
    },
    endEvaluate: (state, action) => {
      state.isEvaluate = false;
      state.currentQ = 0;
      state.data =null;
      state.voiceIndex = 0;
      state.voiceList = [];
      state.evaluateResult=[]
    },
    saveEvaluate: (state, action) => {
      state.evaluateResult = [...state.evaluateResult,action.payload];
    },
  },
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------
//  Actions:

export const startEvaluateOption =
  ({ currentIndex, data, voiceIndex, voiceList }) =>
  async (dispatch) => {
    try {
      console.log("dddd");
      dispatch(
        slice.actions.startEvaluate({
          currentQ: currentIndex,
          data: data,
          voiceIndex: voiceIndex,
          voiceList: voiceList,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

export const EndEvaluateOption = (data) => async (dispatch) => {
  try {
    dispatch(slice.actions.endEvaluate());
  } catch (error) {}
};

export const saveEvaluation = ({data}) => async (dispatch) => {
  try {
    console.log(data)
    dispatch(
      slice.actions.saveEvaluate(data)
    );
  } catch (error) {}
};
