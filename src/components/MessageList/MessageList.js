import React from "react";
import "./MessageList.less";
import MessageForm from "../MessageForm/MessageForm";
import Message from "../Message/Message";

const MessageList = ({ messages, setMessages, setLastUserMsg }) => {
  return (
    <div>
      <div className="list">
        {messages &&
          messages.map((msg) => (
            <Message key={msg.id} text={msg.text} type={msg.type} />
          ))}
      </div>

      <MessageForm
        messages={messages}
        setMessages={setMessages}
        setLastUserMsg={setLastUserMsg}
      />
    </div>
  );
};

export default MessageList;
