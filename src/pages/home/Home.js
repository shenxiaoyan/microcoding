import React, {Component} from 'react';
import "./home.css"
import Header from "../../container/header/header";
import LeftNav from "../../container/left-nav/left-nav";
import {connect} from "react-redux";
import {checkLogin} from "../../reducers/user.redux";
// 首页
@connect(
    store => store.user,
    {checkLogin}
)
export default class Home extends Component {

    componentDidMount(){
        this.props.checkLogin()
    }

    render() {
        console.log("home", this.props)
        return (
            <div className="home">
                <Header {...this.props}/>
                <LeftNav {...this.props}/>
            </div>
        )
    }
}