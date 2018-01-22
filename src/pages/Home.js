import React, {Component} from 'react';
import {Link} from "react-router-dom";
import "../style/home.css"
import CommonUtils from "../utils/commonUtils";
import {Tooltip} from "antd";

// 首页
export default class Home extends Component {

    slideItems = [
        {
            path: "/mine",
            icon: "icon-book-dairy-note-write-tag-mark-important-office-log-stationery-fef",
            text: "我的",
            show: true
        },
        {
            path: "/login",
            icon: "icon-denglu",
            text: "登录注册",
            show: true
        },
        {
            path: "/editor",
            icon: "icon-xiezuo",
            text: "Write ...",
            show: true
        },
        {
            path: "/logOut",
            icon: "icon-tuichu",
            text: "退出登录",
            show: true
        }
    ]

    constructor(props) {
        super(props)
        this.state = {
            isFocus: false,  // 搜索框是否focus
        }
    }


    componentWillMount() {

    }

    componentDidMount() {
        this.init()

    }

    componentWillUnmount() {
        document.removeEventListener("click", this.golbalListen) // 必须移除同一个绑定函数
    }

    init = () => {
        document.addEventListener("click", this.golbalListen)
    }

    golbalListen = () => {
        this.setState({
            isFocus: false
        })
    }

    handleFocus = () => {
        this.setState({isFocus: true})
    }


    render() {
        return (
            <div className="home">
                <header className="header">
                    <div className="Sticky header-inner is-fixed">
                        <Link to={"/"}>
                            <img className="logo" src={"assets/image/logo1.png"} alt="logo"/>
                        </Link>
                        <nav className="header-nav">
                            <Link to={"/"} className="header-navItem">首页</Link>
                            <Link to={"/TODO"} className="header-navItem">Todo</Link>
                            <Link to={"/collections"} className="header-navItem">收藏集</Link>
                        </nav>
                        <div className="search-bar">
                            <div className="search-bar-tool-wrapper">
                                <form className="search-bar-tool">
                                    <div
                                        className={`search-bar-input input-wrapper-search input-wrapper--grey ${this.state.isFocus ? "is-focus" : ""}`}
                                    >
                                        <input type="text" autoComplete="off" placeholder="搜索" className="Input"
                                               onFocus={() => this.handleFocus()}
                                               onClick={(e) => CommonUtils.stopBubble(e)}
                                        />
                                        <div className="Input-af1ter">
                                            <i className="anticon anticon-search search-icon"/>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </header>
                <aside className="aside">
                    <div id="slideBar" className="slide-bar">
                        <div className="menu">
                            <ul>
                                {this.slideItems.map((item, i) => {
                                    return (
                                        <li key={i} onClick={(e) => CommonUtils.stopBubble(e)}>
                                            <Tooltip title={item.text} placement={"left"}>
                                                <Link to={item.path}>
                                                    <i className={`tab-ico icon iconfont ${item.icon}`}/>
                                                </Link>
                                            </Tooltip>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    </div>
                </aside>
            </div>
        )
    }
}