// import io from "socket.io-client";
import {
  DIALOG_LIST_FAIL,
  DIALOG_LIST_REQUEST,
  DIALOG_LIST_SUCCESS,
} from "../constants/dialogConstants";

export const setDialog =
  (data, sender = "server") =>
  (dispatch) => {
    try {
      dispatch({ type: DIALOG_LIST_REQUEST });

      dispatch({
        type: DIALOG_LIST_SUCCESS,
        payload: { sender: sender, message: data },
      });
    } catch (error) {
      dispatch({
        type: DIALOG_LIST_FAIL,
        payload: error.message,
      });
    }
  };
