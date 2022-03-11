import React from "react";
import userAvatar from "../avatars/user.png";
import assistantAvatar from "../avatars/assistant.png";
import "./Message.less";

export const Message = ({ message }) => {
  return (
    <div className="message">
      <img src={userAvatar} alt="userAvatar" className="message-img" />
      <p>{message}</p>
    </div>
  );
};

export const BotMessage = ({ message }) => {
  return (
    <div className="message bot">
      <img
        src={assistantAvatar}
        alt="assistantAvatar"
        className="message-img"
      />
      <p className="p-bot">{message}</p>
    </div>
  );
};
