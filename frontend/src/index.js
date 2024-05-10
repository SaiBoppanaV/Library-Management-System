import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import './App.css'
import { Provider} from 'react-redux';
import {positions,transitions,Provider as AlertProvider} from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import store from './Store';

const options={
  timeout:5000,
  positions:positions.BOTTOM_CENTER,
  transitions:transitions.SCALE
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
  <AlertProvider template={AlertTemplate} {...options} >
  <App />
  </AlertProvider>
</Provider>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
