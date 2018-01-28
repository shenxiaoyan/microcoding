import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import {Provider} from "react-redux";
import store from "./store/store";
import {Router} from "react-router-dom";
import App from "./App";
import createHistory from 'history/createBrowserHistory';

const history = createHistory()
history.listen((location, action) => {
    console.log(action, location.pathname, location)
});
ReactDOM.render(
    (<Provider store={store}>
        <Router history={history}>
           <App/>
        </Router>
    </Provider>), document.querySelector('#root')
);
registerServiceWorker();
