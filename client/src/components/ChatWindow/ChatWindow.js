import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import SendIcon from "@mui/icons-material/Send";
import styles from "./ChatWindow.module.css";

export default function DialogComponent() {
  const [inputValue, setInputValue] = useState("");
  const [dialog, setDialog] = useState([]);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Підключення до сервера Socket.IO при монтуванні компонента
    const socket = io("http://localhost:8000");
    setSocket(socket);

    // Прослуховування події 'message' від сервера
    socket.on("message", (data) => {
      setDialog([...dialog, { sender: "server", message: data }]);
      console.log(data);
    });

    // Відключення від сервера при розмонтовуванні компонента
    return () => {
      socket.close();
    };
  }, []);

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = () => {
    // Додаємо значення інпуту до діалогу
    setDialog([...dialog, { sender: "user", message: inputValue }]);

    // Відправка повідомлення на сервер
    socket.emit("message", inputValue);

    // Очищаємо значення інпуту
    setInputValue("");
  };

  return (
    <div className={styles.container}>
      <div>AGILE</div>
      <div className={styles.chatWindow}>
        {dialog.map((item, index) => (
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
