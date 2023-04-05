import React from 'react';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from 'redux/store';
import { Todos } from 'components/Todos/Todos';
import './assets/scss/app.scss';

function App() {
  return (
    <Provider store={store}>
      <HashRouter>
        <Todos />
      </HashRouter>
    </Provider>
  );
}

export default App;
