import React from 'react';
import './App.css';
import Routing from './Routing';
import store from './store'
import { Provider } from 'react-redux';

function App() {
  return (
    <div>
      <Provider store={store} >
        <Routing />
      </Provider>
    </div>
  );
}

export default App;