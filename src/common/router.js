import React from 'react';
import Login from "../pages/Login";
import Editor from "../pages/Editor";
import {Redirect, Route} from "react-router-dom";


export const routes = [
    {
        path: '/login',
        component: Login
    },
    {
        path: "/editor/drafts",
        component: Editor
    },
    {
        path: "/editor/draft/new",
        component: Editor
    },
    {
        path: '/editor/draft/:id',
        component: Editor
    },
    /*需要重定向的路由(必须放在后面)放前面报错*/
    {
        path: "/editor/draft",
        to: "/editor/draft/new"
    },
    {
        path: '/editor',
        to: "/editor/drafts"
    },
];

/*路由配置*/
export const RouteWithSubRoutes = (route) => {
    if (route.to) {
        return <Redirect from={route.path} to={route.to}/>
    }
    return <Route exact={true} strict={true} path={route.path} render={props => {
        return <route.component {...props} routes={route.routes} render={props => {
            if (props.routes) {
                props.routes.map((route, i) => (
                    <RouteWithSubRoutes key={i} {...route}/>
                ))
            }
        }}/>
    }}/>
}
