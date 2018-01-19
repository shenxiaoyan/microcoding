import React, {Component} from 'react';
import './App.css';
import {routes, RouteWithSubRoutes} from "./common/router";
import {Redirect, Route, Switch} from "react-router-dom";


class App extends Component {

    render() {
        return (
            <div className="App">
                <Switch>
                    {/*路由配置*/}
                    {routes.map((route, i) => (
                        <RouteWithSubRoutes key={i} {...route}/>
                    ))}
                </Switch>
            </div>
        );
    }

}

export default App;
