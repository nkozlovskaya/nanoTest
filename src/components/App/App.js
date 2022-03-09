import React, { useState, useEffect } from "react";
import "./App.less";
import Header from "../Header/Header";
import MessageList from "../MessageList/MessageList";
import { UUID, EUID, URL, CUID } from "../../API/Fetch";

const getLocalMessages = () => {
  let messages = localStorage.getItem("messages");
  if (messages) {
    return JSON.parse(localStorage.getItem("messages"));
  } else {
    return [];
  }
};

const getLocalCUID = () => {
  let CUID = localStorage.getItem("CUID");
  if (CUID) {
    return JSON.parse(localStorage.getItem("CUID"));
  } else {
    return "";
  }
};

const App = () => {
  const [messages, setMessages] = useState(getLocalMessages());
  const [CUID, setCUID] = useState(getLocalCUID());
  const [lastBotMsg, setLastBotMsg] = useState("");
  const [lastUserMsg, setLastUserMsg] = useState("");
  // это значение нужно нам для ответа каждый раз, когда пользователь вводит повторное сообщение. Используется в качестве зависимости в useEffect.

  const countUserMessages = messages.filter(
    (msg) => msg.type === "sent"
  ).length;

  const fetchInput = (inputType) => {
    let fetchURL = "";
    let reqBody = {};

    switch (inputType) {
      case "init":
        return (fetchURL = URL + "init"), (reqBody = { UUID });
      case "event":
        return (
          (fetchURL = URL + "event"),
          (reqBody = {
            EUID,
            CUID,
          })
        );
      case "request":
        return (
          (fetchURL = URL + "request"),
          (reqBody = {
            text: lastUserMsg,
            CUID,
          })
        );
    }

    const params = {
      method: "POST",
      headers: {
        "Content-Type": "text/plain",
      },
      body: JSON.stringify(reqBody),
    };
    return { fetchURL, params };
  };

  // получаем данные от API и в зависимости от их типа обновляем стейты
  const fetchData = async (inputType) => {
    try {
      const { fetchURL, params } = fetchInput(inputType);
      const response = await fetch(fetchURL, params);
      const data = await response.json();
      // обновляем идентификатор чата когда происходит инициализация
      if (inputType === "init") {
        setCUID(data.result.CUID);
      }
      // когда событие READY (приветственное сообщение) или метод REQUEST (ответ на запрос пользователя) - обновляем последнее сообщение
      else {
        // проверяем, если сервер вернул новый CUID - обновляем его везде. Если хотим, чтобы при этом очищался чат и история - нужно вызвать resetChat (не уверен, что так нужно, оставляю только обновление CUID)
        inputType === "request" &&
          data.result.CUID &&
          data.result.CUID !== CUID &&
          setCUID(data.result.CUID);
        const textValue = data.result.text.value;
        textValue && setLastBotMsg(textValue);
        // отправляем сообщение от бота каждый раз, когда оно является приветственным или когда оно хранится в стейте. Это нужно, чтобы избежать дупликатов при обновлении страницы.
        (lastBotMsg || textValue === "Здравствуйте.") && addBotMsg(textValue);
      }
    } catch (error) {
      throw error;
    }
  };

  // добавляем сообщение от бота в наш список сообщений
  const addBotMsg = (msg) => {
    const newMsg = { text: msg, type: "received" };
    setMessages([...messages, newMsg]);
  };

  // перезапуск разговора в новой сессии с удалением истории текущего диалога
  const resetChat = () => {
    localStorage.clear();
    setMessages([]);
    setCUID("");
    setLastBotMsg("");
    setLastUserMsg("");
    fetchData("init");
  };
  // получаем CUID при первом рендере (в случае, если у нас нет CUID в локальном хранилище)
  useEffect(() => {
    !CUID && fetchData("init");
    // eslint-disable-next-line
  }, []);
  // получаем приветственное сообщение
  useEffect(() => {
    CUID && fetchData("event");
    // eslint-disable-next-line
  }, [CUID]);

  // сохраняем последнее отправленное сообщение пользователя для формирования запроса на реакцию бота
  // каждый раз, когда появляется пользовательское сообщение. Мы используем countUserMessages вместо lastUserMsg, чтобы обрабатывать повторные сообщения пользователя (3раза ввел lte = 3 раза получил ответы)
  useEffect(() => {
    fetchData("request");
    // eslint-disable-next-line
  }, [countUserMessages]);

  useEffect(() => {
    localStorage.setItem("messages", JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    localStorage.setItem("CUID", JSON.stringify(CUID));
  }, [CUID]);

  return (
    <div className="container app">
      <Header />
      <MessageList
        messages={messages}
        setMessages={setMessages}
        setLastUserMsg={setLastUserMsg}
      />

      <button onClick={resetChat}>Очистить</button>
    </div>
  );
};
export default App;
