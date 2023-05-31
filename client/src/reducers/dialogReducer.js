import {
  DIALOG_LIST_FAIL,
  DIALOG_LIST_REQUEST,
  DIALOG_LIST_SUCCESS,
} from "../constants/dialogConstants";

export const dialogReducer = (state = { dialog: [] }, action) => {
  switch (action.type) {
    case DIALOG_LIST_REQUEST:
      return {
        loading: true,
      };
    case DIALOG_LIST_SUCCESS:
      return {
        loading: false,
        itemInOrder: action.payload,
      };
    case DIALOG_LIST_FAIL:
      return {
        loading: false,
        error: action.paylod,
      };

    default:
      return state;
  }
};
