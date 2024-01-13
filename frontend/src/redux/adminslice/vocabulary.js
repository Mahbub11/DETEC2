import { createSlice } from "@reduxjs/toolkit";
import { dispatch } from "../store";
import axiosInstant from "../../utils/axios";
import axiosInstance from "../../utils/axios";
import { API_LEVEL } from "../../config";
import { ShowNotification } from "../actions";
import { getVocabularyList } from "../slices/getVocList";
import { getListOfReading } from "../slices/getReadingList";
import { getListOfWriting } from "../slices/getWritingList";
import { getListOfSpeaking } from "../slices/getSpeakingList";
import { getListOfListening } from "../slices/getListeningList";

// ----------------------------------------------------------------------

const initialState = {
  loading: false,
  error: [],
};

const slice = createSlice({
  name: "vocabulary",
  initialState,
  reducers: {
    SaveVocquest: (state) => {
      state.loading = true;
    },
    SaveVocRequestSuccess: (state, action) => {
      state.loading = false;
    },
    SaveVocRequestFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------
//  Actions:

export const SaveVoc = (data) => async (dispatch) => {
  try {
    axiosInstance
      .post(`${API_LEVEL}/module/voc/create-voc`, {
        type: data.type,
        inner_type: data.innerType,
        level: data.level,
        time: data.time,
        qa: {
          q: data.vocList,
          a: data.ansList,
        },
      })
      .then((response) => {
        dispatch(
          ShowNotification({
            severity: "success",
            message: "Saved Successfully",
          })
        );
      })
      .catch((error) => {
        dispatch(
          ShowNotification({ severity: "error", message: "We have an error" })
        );
        console.log(error.message);
      });
  } catch (error) {}
};

export const UpdateVoc = (data) => async (dispatch) => {
  try {
    axiosInstance
      .put(`${API_LEVEL}/module/voc/update-voc`, {
        id: data.id,
        type: data.type,
        inner_type: data.innerType,
        level: data.level,
        time: data.time,
        qa: {
          q: data.vocList,
          a: data.ansList,
        },
      })
      .then((response) => {
        dispatch(
          ShowNotification({
            severity: "success",
            message: "Saved Successfully",
          })
        );
      })
      .catch((error) => {
        dispatch(
          ShowNotification({ severity: "error", message: "We have an error" })
        );
      });
  } catch (error) {}
};

// Considering this a commmon route for every module for deletion items
export const DeleteItem = (type, id) => async (dispatch) => {
  try {
    // catch the type
    const module = type.split("-")[1];
    const commandReq = (module, id) => {
      axiosInstance
        .delete(`${API_LEVEL}/module/${module}/delete/${id}`, {})
        .then((response) => {
          dispatch(
            ShowNotification({
              severity: "success",
              message: "Delete Successfully",
            })
          );
         
        })
        .catch((error) => {
          console.log(error);
          dispatch(
            ShowNotification({ severity: "error", message: "We have an error" })
          );
        });
    };

    if (module) {
      switch (module) {
        case "v":
          commandReq("voc", id);
          dispatch(getVocabularyList());
          break;
        case "r":
          commandReq("reading", id);
          dispatch(getListOfReading());
          break;
        case "w":
          commandReq("writing", id);
          dispatch(getListOfWriting());
          break;
        case "s":
          commandReq("speaking", id);
          dispatch(getListOfSpeaking());
          break;
        case "l":
          commandReq("listening", id);
          dispatch(getListOfListening());
          break;

        default:
          break;
      }
    }
  } catch (error) {}
};
