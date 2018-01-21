import React, {Component} from 'react';
import './App.css';
import {Redirect, Route, Switch} from "react-router-dom";
import Login from "./pages/Login";
import Editor from "./pages/Editor";
import Drafts from "./pages/Drafts";
import Page404 from "./pages/404";
import Home from "./pages/Home";


class App extends Component {

    render() {
        return (
            <div className="App">
                <Switch>
                    <Route exact path={"/"} component={Home}/>
                    <Route path={"/login"} component={Login}/>
                    <Route path={"/editor/drafts"} component={Drafts}/>
                    <Route path={"/editor/draft/new"} component={Editor}/>
                    <Route path={"/editor/draft:id"} component={Editor}/>
                    <Redirect exact from={"/editor"} to={"/editor/drafts"}/>
                    <Route component={Page404}/>
                </Switch>
            </div>
        );
    }

}

export default App;
