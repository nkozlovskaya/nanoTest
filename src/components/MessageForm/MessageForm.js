import React, { useState } from "react";
import "./MessageForm.less";
import SendButton from "../avatars/send.png";

const MessageForm = ({ messages, setMessages, setLastUserMsg }) => {
  const [textIinput, setTextInput] = useState("");
  const changeTextInput = (e) => {
    setTextInput(e.target.value);
  };

  const sendMessage = (e) => {
    e.preventDefault();
    const newMsg = { text: textIinput, type: "sent" };
    setMessages([...messages, newMsg]);
    setLastUserMsg(newMsg.text);
    setInputValue("");
  };

  return (
    <form className="form" onSubmit={sendMessage}>
      <input
        type="text"
        placeholder="Введите сообщение..."
        className="form-input"
        value={textIinput}
        onChange={changeTextInput}
      />
      <button type="submit" className="form-btn">
        <img src={SendButton} alt="Send" className="form-btn-img" />
      </button>
    </form>
  );
};

export default MessageForm;
