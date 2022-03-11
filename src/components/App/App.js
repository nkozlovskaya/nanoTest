import React, { StrictMode } from "react";
import { Provider } from "react-redux";
import MessageList from "../MessageList/MessageList";
import store from "../../store";

const App = () => {
  return (
    <StrictMode>
    <Provider store={store}>
      <MessageList />
    </Provider>  
    </StrictMode>
    
  );
};
export default App;
