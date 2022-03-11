import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { chatReducer } from "./reduser";

export const rootReducer = combineReducers({
  chat: chatReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
