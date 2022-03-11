import { chatAPI } from "../API/Fetch";
import { localHistory } from "../components/utils/localHistory";

const initialState = {
  chat: [],
};

export const getDialogAction = () => ({ type: "GET_DIALOG" });
export const removeDialogAction = () => ({ type: "REMOVE_DIALOG" });

export const chatInit = () => async (dispatch) => {
  try {
    let response = await chatAPI.init();
    if (
      !localStorage.getItem("cuid") ||
      localStorage.getItem("cuid") !== response.result["cuid"]
    ) {
      localStorage.setItem("cuid", response.result["cuid"]);
      localStorage.setItem("history", "[]");
    } else {
      dispatch(getDialogAction());
    }
  } catch (e) {
    console.log(e.message);
  }
};

export const chatRequest = (message) => async (dispatch) => {
  try {
    let newUserMessage = { message: message, isBot: false };
    await localHistory(newUserMessage);
    const response = await chatAPI.request(message);
    const newBotAnswer = { message: response.result.text.value, isBot: true };
    await localHistory(newBotAnswer);
    dispatch(getDialogAction());
  } catch (e) {
    console.log(e.message);
  }
};
export const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_DIALOG":
      let historyData = localStorage.getItem("history");
      return { ...state, chat: JSON.parse(historyData) };

    case "REMOVE_DIALOG":
      return { ...state, chat: [] };

    default:
      return state;
  }
};
