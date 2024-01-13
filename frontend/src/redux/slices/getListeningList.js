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
  listLLT: [],
  listLLR: [],
  
};

const slice = createSlice({
  name: "getListeningList",
  initialState,
  reducers: {
    LoadListeningRequest: (state) => {
      state.loading = true;
    },
    LoadListeningRequestSuccess: (state, action) => {
      state.loading = false;
      state.list = action.payload.payload;
    },
    LoadLLT: (state, action) => {
      state.loading = false;
      state.listLLT = filterReading(current(state.list), 51);
    },
    LoadLLR: (state, action) => {
      state.loading = false;
      state.listLLR = filterReading(current(state.list), 52);
    },
   

    LoadListeningRequestFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------
//  Actions:
export const getListOfListening = (data,statData) => async (dispatch) => {
  
  try {
    dispatch(slice.actions.LoadListeningRequest());

    axiosInstance
      .get(`${API_LEVEL}/module/listening/get-all`)
      .then((response) => {

        console.log(response)
        dispatch(
          slice.actions.LoadListeningRequestSuccess({
            payload: response.data.data.sort((a, b) => a.id - b.id).map(val=>({
              ...val,
              bookmark: data.find((item)=>item.qNo === val.id) ? true:false,
              practice:statData.filter(item=> parseInt(item.qn) === val.id).length
            })),
          })
        );

        dispatch(slice.actions.LoadLLT());
        dispatch(slice.actions.LoadLLR());
       
        
      })


      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    dispatch(
      slice.actions.LoadListeningRequestFail({
        payload: error,
      })
    );
    // dispatch( ShowsnackBar({ severity: "error", message: error.message }))

    console.log(error);
  }
};
