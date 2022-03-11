import axios from "axios";

const base = axios.create({
  baseURL: `https://biz.nanosemantics.ru/api/2.1/json/Chat.`,
});

const uuid =
  localStorage.getItem("uuid") || "772c9859-4dd3-4a0d-b87d-d76b9f43cfa4";

const cuid = localStorage.getItem("cuid") || "";

export const chatAPI = {
  async init() {
    const response = await base.post(`init`, { uuid: uuid, cuid: cuid });
    return response.data;
  },
  async request(text) {
    return await base
      .post(`request`, {
        cuid: localStorage.getItem("cuid"),
        text: text,
      })
      .then((response) => response.data);
  },
};
export { uuid, cuid };
