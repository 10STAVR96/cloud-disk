const SET_FILES = 'SET_FILES';
const SET_CURRENT_DIR = 'SET_CURRENT_DIR';
const ADD_FILE = 'ADD_FILE';
const POPUP_DISPLAY_OPENED = 'POPUP_DISPLAY_OPENED';

const defaultState = {
  files: [],
  currentDir: null,
  popupOpened: false
};

export default function fileReducer(state = defaultState, action) {
  switch(action.type) {
    case SET_FILES: return { ...state, files: action.payload }
    case SET_CURRENT_DIR: return { ...state, currentDir: action.payload }
    case ADD_FILE: return { ...state, files: [...state.files, action.payload] }
    case POPUP_DISPLAY_OPENED: return { ...state, popupOpened: action.payload }
    default:
      return state;
  }
}

export const setFiles = (files) => ({ type: SET_FILES, payload: files });
export const setCurrentDir = (dir) => ({ type: SET_CURRENT_DIR, payload: dir });
export const addFile = (files) => ({type: ADD_FILE, payload: files});
export const setPopupOpened = (opened) => ({ type: POPUP_DISPLAY_OPENED, payload: opened });