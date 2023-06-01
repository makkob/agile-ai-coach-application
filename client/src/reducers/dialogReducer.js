import {
  DIALOG_LIST_FAIL,
  DIALOG_LIST_REQUEST,
  DIALOG_LIST_SUCCESS,
} from "../constants/dialogConstants";

export const dialogReducer = (state = { dialog: [] }, action) => {
  console.log("state", state);
  console.log("action.payload", action.payload);
  switch (action.type) {
    case DIALOG_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DIALOG_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        dialog: [...state.dialog, action.payload],
      };
    case DIALOG_LIST_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
