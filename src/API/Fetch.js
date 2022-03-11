import axios from "axios";

const base = axios.create({
  baseURL: `https://biz.nanosemantics.ru/api/2.1/json/`,
});

const uuid =
  localStorage.getItem("uuid") || "772c9859-4dd3-4a0d-b87d-d76b9f43cfa4";

const cuid = localStorage.getItem("cuid") || "";

export const chatAPI = {
  init() {
    return base
      .post("Chat.init", { uuid: uuid, cuid: cuid })
      .then((response) => response.data);
  },
  request(text) {
    return base
      .post("Chat.request", {
        cuid: localStorage.getItem("cuid"),
        text: text,
      })
      .then((response) => response.data);
  },
};
export { uuid, cuid };
