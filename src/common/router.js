import React from 'react';
import Login from "../pages/Login";
import Editor from "../pages/Editor";
import {Redirect, Route} from "react-router-dom";
import {renderRoutes} from "react-router-config"

export const routes = [
    {
        path: '/login',
        component: Login
    },
    {
        path: "/editor",
        component:Editor,
        routes: [
            {
                path: "drafts",
                component: Editor
            },
            {
                path: "draft/new",
                component: Editor
            },
            {
                path: 'draft/:id',
                component: Editor
            },
        ]
    },
    /*需要重定向的路由(必须放在后面)放前面报错*/

    {
        path: '/editor',
        to: "/editor/drafts"
    }
];

/*路由配置*/
export const RouteWithSubRoutes = (route) => {

    if (route.to) {
        return <Redirect exact={true} strict={true} from={route.path} to={route.to}/>
    }

    return <Route path={route.path} render={props => {
        console.log(props)
        return <route.component {...props} routes={props.routes} render={props => {
            if (props.routes) {
                props.routes.map((route, i) => (
                    <RouteWithSubRoutes key={i} {...route}/>
                ))
            }
        }}/>
    }}/>
}
