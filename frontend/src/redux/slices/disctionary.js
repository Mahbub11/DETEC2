import { createSlice } from "@reduxjs/toolkit";
import { API_LEVEL } from "../../config";
import axiosInstance from "../../utils/axios";
import { ShowNotification } from "../actions";

// ----------------------------------------------------------------------

const initialState = {
  loading: true,
  error: null,
  isOpen: null,
  dictionaryData: [],
  wordList: [],
  wordCList: [],
  wordLList: [],
  wordDList: [],
  wordSList: [],
};

const slice = createSlice({
  name: "disctionary",
  initialState,
  reducers: {
    LoadWordRequest: (state) => {
      state.loading = true;
    },
    LoadWordRequestSuccess: (state, action) => {
      state.loading = true;
      state.isOpen = true;
      state.dictionaryData = action.payload.payload;

      console.log(action.payload.payload);
    },
    LoadWordRequestFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    RequestToCloseDictionary: (state, action) => {
      state.isOpen = false;
    },
    LoadWordSaveRequest: (state) => {
      state.loading = true;
    },
    LoadWordSaveRequestSuccess: (state, action) => {
      state.loading = false;
    },
    LoadWordSaveRequestFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    SaveWordListRequestSuccess: (state, action) => {
      state.loading = false;
      state.wordList = action.payload.payload;
    },
    SaveWordClistSuccess: (state, action) => {
      state.loading = false;
      state.wordCList = action.payload.payload;
    },
    SaveWordLlistSuccess: (state, action) => {
      state.loading = false;
      state.wordLList = action.payload.payload;
    },
    SaveWordSlistSuccess: (state, action) => {
      state.loading = false;
      state.wordSList = action.payload.payload;
    },
    SaveWordDlistSuccess: (state, action) => {
      state.loading = false;
      state.wordDList = action.payload.payload;
    },
    
  },
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------
//  Actions:
export const getWordDetails = (data) => async (dispatch) => {
  try {
    dispatch({
      type: "LoadWordRequest",
    });

    fetchWordDefinitions(data)
      .then((defintions) => {
        dispatch(
          slice.actions.LoadWordRequestSuccess({
            payload: defintions,
          })
        );
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    dispatch({
      type: "LoadWordRequestFail",
      payload: error,
    });
    // dispatch( ShowsnackBar({ severity: "error", message: error.message }))

    console.log(error);
  }
};

const DICTIONARY_API_BASE_URL =
  "https://api.dictionaryapi.dev/api/v2/entries/en/";

const fetchWordDefinitions = async (word) => {
  console.log(`Making request for definitions of ${word}...`);
  const response = await fetch(DICTIONARY_API_BASE_URL + word);
  const json = await response.json();
  const phonetics = json[0].phonetics.filter((val) =>
    val.sourceUrl ? val.audio : false
  );
  const obj = [];
  try {
    json[0].meanings.map((val) => {
      obj.push({
        wordName: word,
        phonetics: phonetics,
        partOfSpeech: val.partOfSpeech,
        definitions: val.definitions.map((val) => val.definition),
        synonyms: val.synonyms.map((val) => val),
        antonyms: val.antonyms.map((val) => val),
      });
    });
  } catch (error) {
    obj.push({
      error: "Word not Exist",
    });
  }
  return obj;
};

export const closeDictionary = (data) => async (dispatch) => {
  try {
    dispatch(slice.actions.RequestToCloseDictionary());
  } catch (error) {}
};

export const saveWord = (data) => async (dispatch) => {
  try {
    dispatch(slice.actions.LoadWordSaveRequest());

    axiosInstance
      .post(`${API_LEVEL}/profile/save-word`, data)
      .then((response) => {
        dispatch(slice.actions.LoadWordSaveRequestSuccess());

        dispatch(
          ShowNotification({
            severity: "success",
            message: response.data.message,
          })
        );
      })
      .catch((error) => {
        console.log(error);
        dispatch(
          ShowNotification({
            severity: "error",
            message: "Word Saving Failed",
          })
        );
      });
  } catch (error) {
    dispatch(
      ShowNotification({
        severity: "error",
        message: "Word Saving Failed",
      })
    );
  }
};

export const getWordList = (data) => async (dispatch) => {
  try {
    dispatch(slice.actions.LoadWordSaveRequest());
    axiosInstance.get(`${API_LEVEL}/profile/get-word-list`).then((response) => {
    
      dispatch(slice.actions.SaveWordListRequestSuccess({
        payload: response.data.list ? Object.values(response.data.list).flat() :[]
      }));

      if(response.data.list){
        dispatch(slice.actions.SaveWordClistSuccess({
          payload:response.data.list['c'] ? response.data.list['c'] :[]
        }))
        dispatch(slice.actions.SaveWordLlistSuccess({
          payload:response.data.list['l'] ? response.data.list['l'] :[]
        }))
        dispatch(slice.actions.SaveWordSlistSuccess({
          payload:response.data.list['s'] ? response.data.list['s'] :[]
        }))
        dispatch(slice.actions.SaveWordDlistSuccess({
          payload:response.data.list['d'] ? response.data.list['d'] :[]
        }))
      }


    });
  } catch (error) {
    dispatch(
      ShowNotification({
        severity: "error",
        message: "Word Fetch Failed",
      })
    );
  }
};


export const deleteWord = (doc) => async (dispatch) => {
  try {
    const {data,flag}= doc
    dispatch(slice.actions.LoadWordSaveRequest());
    axiosInstance.delete(`${API_LEVEL}/profile/delete-word/${flag}/${data}`).then((response) =>{


      dispatch(
        ShowNotification({
          severity: "success",
          message: response.data.message,
        })
      );
    })
    
  } catch (error) {
    dispatch(
      ShowNotification({
        severity: "error",
        message: error.message,
      })
    );
    
  }


}