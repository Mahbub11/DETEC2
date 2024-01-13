import { createSlice } from "@reduxjs/toolkit";
// import { dispatch } from "../store";

// ----------------------------------------------------------------------

const initialState = {
  loading: false,
  inputRCP: "",
  inputRHA: "",
  inputRHA2: "",
  inputRGP: "",
  inputRCI: "",

  resultRCS: null,
  resultRCP: null,
  resultRHA: null,
  resultRHA2: null,
  resultRGP: null,
  resultRCI: null,
  visibility: false,
};

const slice = createSlice({
  name: "readingInput",
  initialState,
  reducers: {
    LoadGapRequest: (state) => {
      state.loading = true;
    },
    saveRCPInput: (state, action) => {
      state.loading = true;
      state.inputRCP = action.payload.payload
    },
    saveRCIInput: (state, action) => {
      state.loading = true;
      state.inputRCI = action.payload.payload
    },
    saveRGPInput: (state, action) => {
      state.loading = true;
      state.inputRGP = action.payload.payload
    },
    saveRHAInput: (state, action) => {
      state.loading = true;
      state.inputRHA = action.payload.payload
    },
    saveRHA2Input: (state, action) => {
      state.loading = true;
      state.inputRHA2 = action.payload.payload
    },
    saveRCSResult: (state, action) => {
      state.loading = true;
      state.resultRCS = action.payload.payload
    },
    saveRCPResult: (state, action) => {
      state.loading = true;
      state.resultRCP = action.payload.payload
    },
    saveRCIResult: (state, action) => {
      state.loading = true;
      state.resultRCI = action.payload.payload
    },
    saveRGPResult: (state, action) => {
      state.loading = true;
      state.resultRGP = action.payload.payload
    },
    saveRHAResult: (state, action) => {
      state.loading = true;
      state.resultRHA = action.payload.payload
    },
    saveRHA2Result: (state, action) => {
      state.loading = true;
      state.resultRHA2 = action.payload.payload
    },

    cleanReadingnput: (state, action) => {
      state.loading = true;
      state.inputRHA = ''
      state.inputRCI=''
      state.inputRCP=''
      state.inputRHA2 = ''
      state.inputRGP=''
    },
    cleanReadingResult: (state, action) => {
      state.loading = true;
      state.resultRCS = ''
      state.resultRCI=''
      state.resultRCP=''
      state.resultRHA2 = ''
      state.resultRHA=''
    
    },
   
  },
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------
//  Actions:

export const SaveRCPInput = (data) => async (dispatch) => {
  try {
    dispatch({
      type: "LoadGapRequest",
    });

    dispatch(
      slice.actions.saveRCPInput({
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

export const SaveRHAInput = (data) => async (dispatch) => {
  
  try {
    dispatch({
      type: "LoadGapRequest",
    });

    dispatch(
      slice.actions.saveRHAInput({
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

export const SaveRHA2Input = (data) => async (dispatch) => {
  try {
    dispatch({
      type: "LoadGapRequest",
    });

    dispatch(
      slice.actions.saveRHA2Input({
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

export const SaveRCIInput = (data) => async (dispatch) => {
  try {
    dispatch({
      type: "LoadGapRequest",
    });

    dispatch(
      slice.actions.saveRCIInput({
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
export const SaveRGPInput = (data) => async (dispatch) => {
  try {
    dispatch({
      type: "LoadGapRequest",
    });

    dispatch(
      slice.actions.saveRGPInput({
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

export const cleanUserReadingInput = (data) => async (dispatch) => {

  try {
    dispatch({
      type: "LoadGapRequest",
    });

    dispatch(
      slice.actions.cleanReadingnput()
    );
  } catch (error) {
    dispatch({
      type: "LoadGapFail",
      payload: error,
    });

    console.log(error);
  }

}

// result
export const SaveRCSResult = (data) => async (dispatch) => {
  try {
    dispatch({
      type: "LoadGapRequest",
    });

    dispatch(
      slice.actions.saveRCSResult({
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
export const SaveRCPResult = (data) => async (dispatch) => {
  try {
    dispatch({
      type: "LoadGapRequest",
    });

    dispatch(
      slice.actions.saveRCPResult({
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

export const SaveRHAResult = (data) => async (dispatch) => {
  try {
    dispatch({
      type: "LoadGapRequest",
    });

    dispatch(
      slice.actions.saveRHAResult({
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

export const SaveRHA2Result = (data) => async (dispatch) => {
  try {
    dispatch({
      type: "LoadGapRequest",
    });

    dispatch(
      slice.actions.saveRHA2Result({
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

export const SaveRCIResult = (data) => async (dispatch) => {
  try {
    dispatch({
      type: "LoadGapRequest",
    });

    dispatch(
      slice.actions.saveRCIResult({
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
export const SaveRGPResult = (data) => async (dispatch) => {
  try {
    dispatch({
      type: "LoadGapRequest",
    });

    dispatch(
      slice.actions.saveRGPResult({
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

export const cleanUserReadingResult = (data) => async (dispatch) => {

  try {
    

    dispatch(
      slice.actions.cleanReadingResult()
    );
  } catch (error) {
    dispatch({
      type: "LoadGapFail",
      payload: error,
    });

    console.log(error);
  }

}