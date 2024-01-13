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
  listWAP: [],
  listRTW: [],
  listWS: [],
};

const slice = createSlice({
  name: "getWritingList",
  initialState,
  reducers: {
    LoadReadingRequest: (state) => {
      state.loading = true;
    },
    LoadReadingRequestSuccess: (state, action) => {
      state.loading = false;
      state.list = action.payload.payload;
    },
    LoadWAP: (state, action) => {
      state.loading = false;
      state.listWAP = filterReading(current(state.list), 21);
    },
    LoadRTW: (state, action) => {
      state.loading = false;
      state.listRTW = filterReading(current(state.list), 22);
    },
    LoadWS: (state, action) => {
      state.loading = false;
      state.listWS = filterReading(current(state.list), 23);
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
export const getListOfWriting = (data,statData) => async (dispatch) => {
  
  try {
    dispatch(slice.actions.LoadReadingRequest());

   await axiosInstance
      .get(`${API_LEVEL}/module/writing/get-all`)
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

        dispatch(slice.actions.LoadWAP());
        dispatch(slice.actions.LoadRTW());
        dispatch(slice.actions.LoadWS());
        
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
