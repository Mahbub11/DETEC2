import { createSlice, current } from "@reduxjs/toolkit";
import { dispatch } from "../store";
import axiosInstant from "../../utils/axios";
import axiosInstance from "../../utils/axios";
import { API_LEVEL } from "../../config";
import { filterReading } from "./readingFilterHelper";
// ----------------------------------------------------------------------

const initialState = {
  loading: false,
  error: null,
  list: [],
  listSAL: [],
  listSAP: [],
  listSRS: [],
  listSLS: [],
  listSS:[],
};

const slice = createSlice({
  name: "getSpeakingList",
  initialState,
  reducers: {
    LoadReadingRequest: (state) => {
      state.loading = true;
    },
    LoadReadingRequestSuccess: (state, action) => {
      state.loading = false;
      state.list = action.payload.payload;
    },
    LoadSAL: (state, action) => {
      state.loading = false;
      state.listSAL = filterReading(current(state.list), 41);
    },
    LoadSAP: (state, action) => {
      state.loading = false;
      state.listSAP = filterReading(current(state.list), 42);
    },
    LoadSRS: (state, action) => {
      state.loading = false;
      state.listSRS = filterReading(current(state.list), 43);
    },
    LoadSLS: (state, action) => {
      state.loading = false;
      state.listSLS = filterReading(current(state.list), 44);
    },
    LoadSS: (state, action) => {
      state.loading = false;
      state.listSS = filterReading(current(state.list), 45);
    },


    LoadReadingRequestFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------
//  Actions:
export const getListOfSpeaking = (data,statData) => async (dispatch) => {

  try {
    dispatch(slice.actions.LoadReadingRequest());

    axiosInstance
      .get(`${API_LEVEL}/module/speaking/get-all`)
      .then((response) => {

        console.log(response)
        dispatch(
          slice.actions.LoadReadingRequestSuccess({
            payload: response.data.data.sort((a, b) => a.id - b.id).map(val=>({
              ...val,
              bookmark: data.find((item)=>item.qNo === val.id) ? true:false,
              practice:statData.filter(item=> parseInt(item.qn) === val.id).length
            })),
          })
        );

        dispatch(slice.actions.LoadSAP());
        dispatch(slice.actions.LoadSAL());
        dispatch(slice.actions.LoadSRS());
        dispatch(slice.actions.LoadSLS());
        dispatch(slice.actions.LoadSS());
        
      })


      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    dispatch(
      slice.actions.LoadReadingRequestFail({
        payload: error,
      })
    );
    // dispatch( ShowsnackBar({ severity: "error", message: error.message }))

    console.log(error);
  }
};
