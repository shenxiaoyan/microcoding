import React, {Component} from 'react';
import './App.css';
import {Redirect, Route, Switch} from "react-router-dom";
import Login from "./pages/Login";
import Editor from "./pages/Editor";
import Drafts from "./pages/Drafts";
import Page404 from "./pages/404";
import Home from "./pages/Home";
import FancyRoute from "./component/Router";


class App extends Component {

    render() {
        return (
            <div className="App">
                <Switch>
                    <FancyRoute exact path={"/"} component={Home}/>
                    <FancyRoute path={"/login"} component={Login}/>
                    <FancyRoute path={"/editor/drafts"} component={Drafts}/>
                    <FancyRoute path={"/editor/draft/new"} component={Editor}/>
                    <FancyRoute path={"/editor/draft/:id"} component={Editor}/>
                    <Redirect exact from={"/editor"} to={"/editor/drafts"}/>
                    <FancyRoute component={Page404}/>
                </Switch>
            </div>
        );
    }

}

export default App;
