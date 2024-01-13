import { createSlice } from "@reduxjs/toolkit";
import { API_LEVEL } from "../../config";
// import { dispatch } from "../store";
import axiosInstance from "../../utils/axios";
import { ShowNotification } from "../actions";

// ----------------------------------------------------------------------

const initialState = {
  loading: false,
  error: null,
  bookmarkList:[],
  listReading: [],
  listWriting: [],
  listVocabulary: [],
  listSpeaking: [],
  listListening: [],
};

const slice = createSlice({
  name: "bookmark",
  initialState,
  reducers: {
    RequestBookmarkList: (state, action) => {
      state.loading = true;
    },
    RequestBookmarkListSuccess: (state, action) => {
      state.error = null;
    },
    RequestSaveBookmar: (state, action) => {
      state.loading = true;
    },
    RequestDeleteBookmar: (state, action) => {
      state.loading = true;
    },
    SavingBookmarkList: (state, action) => {
      state.bookmarkList = action.payload.payload;
    },
    SavingReadingList: (state, action) => {
      state.listReading = action.payload.payload;
    },
    SavingWritingList: (state, action) => {
      state.listWriting = action.payload.payload;
    },
    SavingSpeakingList: (state, action) => {
      state.listSpeaking = action.payload.payload;
    },
    SavingListeningList: (state, action) => {
      state.listListening = action.payload.payload;
    },
    SavingVocList: (state, action) => {
      state.listVocabulary = action.payload.payload;
    },
  },
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------
//  Actions:

export const toggleBookmark = (data) => async (dispatch) => {
  dispatch(slice.actions.RequestBookmarkList());

  try {
    const doc = {
      qNo: data.id,
      type: data.type,
      inner_type:data.inner_type
    };

    axiosInstance
      .post(`${API_LEVEL}/profile/save-bookmark`, doc)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {});
  } catch (error) {}
};

// export const removeBookmark = (data) => async (dispatch) => {
//   dispatch(slice.actions.RequestBookmarkList());

//   try {
//     const doc = {
//       qNo: data.id,
//       type: data.type,
//       inner_type:data.inner_type
//     };

//     axiosInstance
//       .delete(`${API_LEVEL}/profile/delete-bookmark/${doc.type}/${doc.inner_type}/${doc.qNo}`)
//       .then((response) => {
//         dispatch(ShowNotification({severity:'success',message:'Bookmark deleted'}))
//       })
//       .catch((err) => {
//         dispatch(ShowNotification({severity:'error',message:'Bookmark deleted Failed'}))
//       });
//   } catch (error) {}
// };

export const getBookmarkList = (data) => async (dispatch) => {
  dispatch(slice.actions.RequestBookmarkList());

  try {
    axiosInstance
      .get(`${API_LEVEL}/profile/get-bookmark`)
      .then((response) => {
        const voc = response.data.list.filter((val) => val.type === 1);
        const reading = response.data.list.filter((val) => val.type === 3);
        const writing = response.data.list.filter((val) => val.type === 2);
        const listening = response.data.list.filter((val) => val.type === 5);
        const speaking = response.data.list.filter((val) => val.type === 4);
        
        dispatch(
          slice.actions.SavingBookmarkList({
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
      .catch((err) => {});
  } catch (error) {}
};
