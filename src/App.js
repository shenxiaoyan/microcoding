import React, {Component} from 'react';
import './App.css';
import Login from './pages/Login';
import {Route} from "react-router-dom";

class App extends Component {

    render() {
        return (
            <div className="App">
                <Route path={`/login`} component={Login} />
            </div>
        );
    }

}

export default App;
