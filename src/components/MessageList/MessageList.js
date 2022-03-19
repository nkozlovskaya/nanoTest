import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./MessageList.less";
import MessageForm from "../MessageForm/MessageForm";
import { Message, BotMessage } from "../Message/Message";
import { ScrollDown } from "../Scroll/Scroll";
import { chatInit } from "../../store/reduser";

const MessageList = () => {
  const chat = useSelector((state) => state.chat.chat);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(chatInit());
  }, []);

  return (
    <div className="container">
      <div>
        <h1>Чат с виртуальным консультантом</h1>
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
    </div>
  );
};

export default MessageList;
