import React, {Component} from 'react';
import './App.css';
import {Redirect, Switch} from "react-router-dom";
import Login from "./pages/login/Login";
import Editor from "./pages/editor/Editor";
import Drafts from "./pages/drafts/Drafts";
import Page404 from "./pages/404/404";
import Home from "./pages/home/Home";
import FancyRoute from "./component/fancy-router/fancy-router";
import ArticleDetail from "./pages/article-detail/ArticleDetail";


class App extends Component {

    componentDidMount() {

    }

    render() {
        return (
            <div className="App">
                <Switch>
                    <FancyRoute exact path={"/"} component={Home} />
                    <FancyRoute path={"/login"} component={Login} />
                    <FancyRoute path={"/editor/drafts"} component={Drafts}/>
                    <FancyRoute path={"/editor/draft/new"} component={Editor}/>
                    <FancyRoute path={"/editor/draft/:id"} component={Editor}/>
                    <FancyRoute path={`/article/:id`} component={ArticleDetail}/>
                    <Redirect exact from={"/editor"} to={"/editor/drafts"}/>
                    <FancyRoute component={Page404}/>
                </Switch>
            </div>
        );
    }

}

export default App;
