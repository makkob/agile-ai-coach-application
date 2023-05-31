import React, { useState, useEffect } from "react";
import io from "socket.io-client";
// import { useDispatch, useSelector } from "react-redux";
import SendIcon from "@mui/icons-material/Send";
import styles from "./ChatWindow.module.css";
// import { setDialog } from "../../actions/dialogAction";

export default function DialogComponent() {
  // const dispatch = useDispatch();

  // const { dialogState } = useSelector((state) => state);
  // const { loading, dialog } = dialogState;

  const [inputValue, setInputValue] = useState("");
  const [dialog, setDialog] = useState([]);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // dispatch(setDialog("pizza"));
    // Подключение к серверу Socket.IO при монтировании компонента
    const socket = io("http://localhost:8000");
    setSocket(socket);

    // Прослушивание события 'message' от сервера
    socket.on("message", (data) => {
      setDialog((prevDialog) => [
        ...prevDialog,
        { sender: "server", message: data },
      ]);
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
    // Добавление значения инпута в диалог
    setDialog((prevDialog) => [
      ...prevDialog,
      { sender: "user", message: inputValue },
    ]);

    // Отправка сообщения на сервер
    socket.emit("message", inputValue);

    // Очистка значения инпута
    setInputValue("");
  };

  return (
    <div className={styles.container}>
      <div>AGILE</div>
      <div className={styles.chatWindow}>
        {dialog &&
          dialog.map((item, index) => (
            <p key={index}>
              <strong>{item.sender}: </strong>
              {item.message}
            </p>
          ))}

        <input type="text" value={inputValue} onChange={handleChange} />
        <button onClick={handleSubmit}>
          <SendIcon />
        </button>
      </div>
    </div>
  );
}
