import { createSlice, current } from "@reduxjs/toolkit";
import { dispatch } from "../store";
import axiosInstant from "../../utils/axios";
import axiosInstance from "../../utils/axios";
import { API_LEVEL } from "../../config";
import { filterInteractiveReading, filterReading } from "./readingFilterHelper";
// ----------------------------------------------------------------------

const initialState = {
  loading: false,
  error: null,
  list: [],
  listInteractive:[],
  listRC: [],
  listRCS: [],
  listRCP: [],
  listRCI: [],
  listRHA: [],
  listRGPT: [],
};

const slice = createSlice({
  name: "getReadingList",
  initialState,
  reducers: {
    LoadReadingRequest: (state) => {
      state.loading = true;
    },
    LoadReadingRequestSuccess: (state, action) => {
      state.loading = false;
      state.list = action.payload.payload;
    },
    LoadRC: (state, action) => {
      state.loading = false;
      state.listRC = filterReading(current(state.list), 31);
    },
    LoadInteractive: (state, action) => {
      state.loading = false;
      state.listInteractive = filterReading(current(state.list), 32);
    },
    LoadRCS: (state, action) => {
      state.loading = false;
      state.listRCS = filterInteractiveReading(current(state.list), 321);
    },

    LoadRCP: (state, action) => {
      state.loading = false;
      state.listRCP =  filterInteractiveReading(current(state.list), 322);

    },
    LoadRCI: (state, action) => {
      state.loading = false;
      state.listRCI =  filterInteractiveReading(current(state.list), 323);
    },
    LoadRHA: (state, action) => {
      state.loading = false;
      state.listRHA =  filterInteractiveReading(current(state.list), 324);
    },
    LoadRGPT: (state, action) => {
      state.loading = false;
      state.listRGPT =  filterInteractiveReading(current(state.list), 325);
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
export const getListOfReading = (data,statData) => async (dispatch) => {
 
  try {
    dispatch(slice.actions.LoadReadingRequest());

    axiosInstance
      .get(`${API_LEVEL}/module/reading/get-all`)
      .then((response) => {

        dispatch(
          slice.actions.LoadReadingRequestSuccess({
            payload: response.data.data.sort((a, b) => a.id - b.id).map(val=>({
              ...val,
              bookmark: data.find((item)=>item.qNo === val.id) ? true:false,
              practice:statData.filter(item=> parseInt(item.qn) === val.id).length
            })),
          })
        );

        dispatch(slice.actions.LoadRC());
        dispatch(slice.actions.LoadInteractive());
        dispatch(slice.actions.LoadRCS());
        dispatch(slice.actions.LoadRCP());
        dispatch(slice.actions.LoadRCI());
        dispatch(slice.actions.LoadRHA());
        dispatch(slice.actions.LoadRGPT());
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

