import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import SendIcon from "@mui/icons-material/Send";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Button, TextField } from "@mui/material";
import styles from "./ChatWindow.module.css";
import { setDialog } from "../../actions/dialogAction";

export default function DialogComponent() {
  const dispatch = useDispatch();

  const { dialogState } = useSelector((state) => state);
  const { loading, dialog } = dialogState;

  const [inputValue, setInputValue] = useState("");

  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socket = io("http://localhost:5000");
    setSocket(socket);

    // Прослушивание события 'message' от сервера
    socket.on("message", (data) => {
      dispatch(setDialog(data, "CoachAI"));
    });

    // Отключение от сервера при размонтировании компонента
    return () => {
      socket.close();
    };
  }, []);

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = () => {
    // Добавление значения инпута в стейт

    dispatch(setDialog(inputValue, "Client"));
    // Отправка сообщения на сервер
    socket.emit("message", inputValue);

    // Очистка значения инпута
    setInputValue("");
  };

  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <strong>AGILE</strong>
        <div className={styles.AIAgileCoach}>
          <FavoriteBorderIcon sx={{ fontSize: 30, marginRight: "1rem" }} />{" "}
          <b>AI Agile Coach</b>
        </div>
      </div>
      <div className={styles.chatWindow} id="chat-window">
        {loading && <p>Coach is typing...</p>}
        {dialog &&
          dialog.map((item, index) =>
            item.sender === "CoachAI" ? (
              <p key={index} className={styles.speechBubbleAI}>
                <strong>{item.sender}: </strong>
                {item.message}
              </p>
            ) : (
              <p key={index} className={styles.speechBubbleUser}>
                <strong>{item.sender}: </strong>
                {item.message}
              </p>
            )
          )}
      </div>
      <div className={styles.inputDiv}>
        <TextField
          type="text"
          value={inputValue}
          onChange={handleChange}
          placeholder="Ask me anything that I can help you or your team..."
          variant="outlined"
          fullWidth
        />
        <Button onClick={handleSubmit}>
          <SendIcon />
        </Button>
      </div>
    </div>
  );
}
