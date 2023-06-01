// import io from "socket.io-client";
import {
  DIALOG_LIST_FAIL,
  DIALOG_LIST_REQUEST,
  DIALOG_LIST_SUCCESS,
} from "../constants/dialogConstants";

export const setDialog = (data) => (dispatch) => {
  try {
    dispatch({ type: DIALOG_LIST_REQUEST });

    // Підключення до сервера Socket.IO
    // const socket = io("http://localhost:8000");

    // Прослуховування події 'message' від сервера
    // socket.on("message", (data) => {
    //   dispatch({
    //     type: DIALOG_LIST_SUCCESS,
    //     payload: { sender: "server", message: data },
    //   });
    // });
    dispatch({
      type: DIALOG_LIST_SUCCESS,
      payload: { sender: "server", message: data },
    });
    // Відключення від сервера при закритті
    // socket.on("disconnect", () => {
    //   socket.close();
    // });
  } catch (error) {
    dispatch({
      type: DIALOG_LIST_FAIL,
      payload: error.message,
    });
  }
};
