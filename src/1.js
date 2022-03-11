const [messages, setMessages] = useState(getLocalMessages());
const [CUID, setCUID] = useState(getLocalCUID());
const [lastBotMsg, setLastBotMsg] = useState("");
const [lastUserMsg, setLastUserMsg] = useState("");

const countUserMessages = messages.filter((msg) => msg.type === "sent").length;

const fetchInput = (inputType) => {
  let fetchURL = "";
  let reqBody = {};

  switch (inputType) {
    case "init":
      return (fetchURL = URL + "init"), (reqBody = { UUID });
    case "event":
      return {
        fetchURL: URL + "event",
        reqBody: {
          EUID,
          CUID,
        },
      };
    case "request":
      return {
        fetchURL: URL + "request",
        reqBody: {
          CUID,
          text: lastUserMsg,
        },
      };
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

const fetchData = async (inputType) => {
  try {
    const { fetchURL, params } = fetchInput(inputType);
    const response = await fetch(fetchURL, params);
    const data = await response.json();
    if (inputType === "init") {
      setCUID(data.result.CUID);
    } else {
      inputType === "request" &&
        data.result.cuid &&
        data.result.cuid !== CUID &&
        setCUID(data.result.cuid);
      const textValue = data.result.text.value;
      textValue && setLastBotMsg(textValue);
      (lastBotMsg || textValue === "Здравствуйте.") && addBotMsg(textValue);
    }
  } catch (error) {
    throw error;
  }
};

const addBotMsg = (msg) => {
  const newMsg = { text: msg, type: "received" };
  setMessages([...messages, newMsg]);
};

const resetChat = () => {
  localStorage.clear();
  setMessages([]);
  setCUID("");
  setLastBotMsg("");
  setLastUserMsg("");
  fetchData("init");
};
useEffect(() => {
  !CUID && fetchData("init");
  // eslint-disable-next-line
}, []);

useEffect(() => {
  CUID && fetchData("event");
  // eslint-disable-next-line
}, [CUID]);

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

___________________________________________________________;

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

// const [textIinput, setTextInput] = useState("");
// const changeTextInput = (e) => {
//   setTextInput(e.target.value);
// };

// const sendMessage = (e) => {
//   e.preventDefault();
//   const newMsg = {
//     text: textIinput,
//     type: "sent",
//     id: new Date().getTime().toString(),
//   };
//   setMessages([...messages, newMsg]);
//   setLastUserMsg(newMsg.text);
//   setTextInput("");
// };

// useEffect(() => {
//   feedEnd.current.scrollIntoView({ behavior: "smooth" });
// }, [messages, feedEnd]);

// return (
//   <form className="form" onSubmit={sendMessage}>
//     <input
//       type="text"
//       placeholder="Введите сообщение..."
//       className="form-input"
//       value={textIinput}
//       onChange={changeTextInput}
//     />
//     <button type="submit" className="form-btn">
//       <img src={SendButton} alt="Send" className="form-btn-img" />
//     </button>
//   </form>
// );
