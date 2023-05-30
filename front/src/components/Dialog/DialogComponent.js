import React, { useState } from "react";

export default function DialogComponent() {
  const [inputValue, setInputValue] = useState("");
  const [dialog, setDialog] = useState([]);

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = () => {
    // Додаємо значення інпуту до діалогу
    setDialog([...dialog, { sender: "user", message: inputValue }]);

    // Очищаємо значення інпуту
    setInputValue("");
  };

  return (
    <div>
      <h2>Dialog Window</h2>
      <div>
        {dialog.map((item, index) => (
          <p key={index}>
            <strong>{item.sender}: </strong>
            {item.message}
          </p>
        ))}
      </div>
      <input type="text" value={inputValue} onChange={handleChange} />
      <button onClick={handleSubmit}>Відправити</button>
    </div>
  );
}
