import React from "react";
import userAvatar from "../avatars/user.png";
import assistantAvatar from "../avatars/assistant.png";
import "./Message.less";

const Message = ({ text, type }) => {
  const avatar = type === "sent" ? userAvatar : assistantAvatar;

  return (
    <div className={`message ${type}`}>
      <img src={avatar} alt="avatar" className="message-img" />
      <p>{text}</p>
    </div>
  );
};

export default Message;
