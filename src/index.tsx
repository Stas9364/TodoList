import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App/App';
import * as serviceWorker from './serviceWorker';
import {Provider} from 'react-redux';
import {store} from './bll/storeTodoList';
import {BrowserRouter} from "react-router-dom";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <BrowserRouter>
        <Provider store={store}>
            <App/>
        </Provider>
    </BrowserRouter>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
