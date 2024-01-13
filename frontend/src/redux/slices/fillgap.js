import { createSlice } from "@reduxjs/toolkit";
// import { dispatch } from "../store";

// ----------------------------------------------------------------------

const initialState = {
  options: [],
  loading: false,
  userInput: [],
  visibility: false,
};

const slice = createSlice({
  name: "gapfill",
  initialState,
  reducers: {
    LoadGapRequest: (state) => {
      state.loading = true;
    },
    LoadGapSuccess: (state, action) => {
      state.loading = true;
      state.options = [...state.options, action.payload];
    },
    LoadGapFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    ClearGapFill: (state, action) => {
      state.loading = false;
      const data = state.options;
      state.options = [];
      state.options = data;
    },
    SetUserInput: (state, action) => {
      state.userInput = { ...state.userInput, ...action.payload.payload };
    },
    ToggleVisiblity: (state, action) => {
      state.visibility = !state.visibility;
    },
    DisableVisibilityForce: (state, action) => {
      state.visibility = false;
    },
    ClearUserInput: (state, action) => {
      state.userInput = [];
    },
  },
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------
//  Actions:

export const SaveGapInfo = (data) => async (dispatch) => {
  try {
    dispatch({
      type: "LoadGapRequest",
    });

    dispatch(
      slice.actions.LoadGapSuccess({
        payload: data,
      })
    );
  } catch (error) {
    dispatch({
      type: "LoadGapFail",
      payload: error,
    });
    // dispatch( ShowsnackBar({ severity: "error", message: error.message }))

    console.log(error);
  }
};

export const clearOptions = (data) => async (dispatch) => {
  try {
  

    dispatch(
      slice.actions.ClearGapFill({
        payload: data,
      })
    );
  } catch (error) {}
};
export const saveUserInput = (data) => async (dispatch) => {
 
  try {
    dispatch(
      slice.actions.SetUserInput({
        payload: data,
      })
    );
  } catch (error) {}
};
export const ToggleVisibility = (data) => async (dispatch) => {


  try {
    dispatch(slice.actions.ToggleVisiblity());
  } catch (error) {}
};
export const DisableVisibility = (data) => async (dispatch) => {

  try {
    dispatch(slice.actions.DisableVisibilityForce());
  } catch (error) {}
};
export const ClearUserInputs = (data) => async (dispatch) => {
  try {
    dispatch(slice.actions.ClearUserInput());
  } catch (error) {}
};
