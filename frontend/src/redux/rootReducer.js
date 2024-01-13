import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
// slices
import appReducer from './slices/app';
import fillgap from './slices/fillgap';
import wordSelect from './slices/wordSelect';
import disctionary from './slices/disctionary';
import vocabulary from './adminslice/vocabulary'
import getVocList from './slices/getVocList'
import getReadingList from './slices/getReadingList'
import getWritingList from './slices/getWritingList'
import getAssesment from './slices/getAssesment';
import getSpeakingList from './slices/getSpeakingList';
import Speaking from './adminslice/Speaking';
import getListeningList from './slices/getListeningList';
import converSationHandler from './slices/converSationHandler';
import auth from './slices/auth';
import statistic from './slices/statistic';
import bookmark from './slices/bookmark';
import readingInput from './slices/readingInput';
import Reading from './adminslice/Reading';
import assesmentResult from './slices/assesmentResult';
import general from './slices/general';


// ----------------------------------------------------------------------

const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  //   whitelist: [],
    blacklist: [],
};

const rootReducer = combineReducers({
  general:general,
  app: appReducer,
  auth:auth,
  readingInput:readingInput,
  fillgap:fillgap,
  assesmentResult:assesmentResult,
  wordSelect:wordSelect,
  disctionary:disctionary,
  vocabulary:vocabulary,
  getVocList:getVocList,
  getReadingList:getReadingList,
  Reading:Reading,
  getWritingList:getWritingList,
  getAssesment:getAssesment,
  getSpeakingList:getSpeakingList,
  speaking:Speaking,
  getListeningList:getListeningList,
  converSationHandler:converSationHandler,
  statistic:statistic,
  bookmark:bookmark

 
  
});

export { rootPersistConfig, rootReducer };