import React, { useState } from "react";
import "./MessageForm.less";
import { FaPaperPlane } from "react-icons/fa";
import { chatRequest } from "../../store/reduser";
import { useDispatch } from "react-redux";
import { removeDialogAction } from "../../store/reduser";

const MessageForm = () => {
  const dispatch = useDispatch();
  const [newMessage, setNewMessage] = useState("");

  function sendNewMessage(message) {
    dispatch(chatRequest(message));
  }

  const resetChat = () => {
    localStorage.setItem("history", "[]");
    dispatch(removeDialogAction());
  };

  return (
    <div>
      <div className="form">
        <input
          type="text"
          placeholder="Введите сообщение..."
          className="form-input"
          value={newMessage}
          onKeyPress={(e) => {
            if (e.key === "Enter" && newMessage !== "") {
              sendNewMessage(newMessage);
              setNewMessage("");
            }
          }}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button
          className="form-btn"
          onClick={() => {
            if (newMessage !== "") {
              sendNewMessage(newMessage);
              setNewMessage("");
            }
            return undefined;
          }}
        >
          <FaPaperPlane className="form-btn-img" />
        </button>
      </div>
      <button className="btn-reset" onClick={resetChat}>
        Очистить
      </button>
    </div>
  );
};

export default MessageForm;
