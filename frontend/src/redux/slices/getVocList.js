import { createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axios";
import { API_LEVEL } from "../../config";
import { ReFetch } from "../actions";
// ----------------------------------------------------------------------

const initialState = {
  loading: false,
  error: null,
  list: [],
};

const slice = createSlice({
  name: "getVocList",
  initialState,
  reducers: {
    LoadVocRequest: (state) => {
      state.loading = true;
    },
    LoadVocRequestSuccess: (state, action) => {
      state.loading = false;
      state.list = action.payload.payload;
    },
    LoadVocRequestFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    extraReducers(builder) {
      builder.addCase(ReFetch, (state,action)=>{
        state.common.open = true;
        state.common.severity = action.payload.severity;
        state.common.message = action.payload.message;
      })
    },
  },
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------
//  Actions:
export const getVocabularyList = (data,statData) => async (dispatch) => {
  try {
    dispatch({
      type: "LoadVocRequest",
    });

    axiosInstance
      .get(`${API_LEVEL}/module/voc/get-all-voc`,{
        withCredentials:true
      })
      .then((response) => {
        dispatch(
          slice.actions.LoadVocRequestSuccess({
            payload: response.data.data.sort((a, b) => a.id - b.id).map((val, index) => ({
              ...val,
              index: ++index,
              bookmark: data.find((item)=>item.qNo === val.id),
              practice:statData.filter(item=> parseInt(item.qn) === val.id).length
            })),
          })
        );
      })
      .catch((error) => {
        
        console.log(error);
      });
  } catch (error) {
    dispatch(
      slice.actions.LoadVocRequestFail({
        payload: error,
      })
    );
   
    console.log(error);
  }
};
