import React from "react";
import { HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "redux/store";
import { TodoList } from "components/TodoList/TodoList";
import "./assets/scss/app.scss";

function App() {
  return (
    <Provider store={store}>
      <HashRouter>
        <TodoList />
      </HashRouter>
    </Provider>
  );
}

export default App;
