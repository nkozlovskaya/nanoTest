import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./MessageList.less";
import MessageForm from "../MessageForm/MessageForm";
import { Message, BotMessage } from "../Message/Message";
import { ScrollDown } from "../Scroll/Scroll";
import { chatInit, removeDialogAction } from "../../store/reduser";

const MessageList = () => {
  const chat = useSelector((state) => state.chat.chat);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(chatInit());
  }, []);

  const resetChat = () => {
    localStorage.setItem("history", "[]");
    dispatch(removeDialogAction());
  };

  return (
    <div className="container">
      <div>
        <h2>Чат с виртуальным консультантом</h2>
      </div>
      <div className="list">
        {chat.map((chat) => {
          return chat.isBot ? (
            <BotMessage
              message={chat.message}
              key={new Date().getTime().toString()}
            />
          ) : (
            <Message message={chat.message} key={new Date().toString()} />
          );
        })}

        <ScrollDown />
      </div>

      <MessageForm />
      <button className="btn-reset" onClick={resetChat}>
        Очистить
      </button>
    </div>
  );
};

export default MessageList;
