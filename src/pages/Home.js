import React, {Component} from 'react';
import {Link} from "react-router-dom";
import "../style/home.css"
import CommonUtils from "../utils/commonUtils";
import {Tooltip} from "antd";
import {connect} from "react-redux";
import {checkLogin, logOut} from "../reducers/user.redux";

// 首页
@connect(
    store => store.user,
    {checkLogin, logOut}
)
export default class Home extends Component {

    slideItems = [
        {
            path: "/mine",
            icon: "icon-book-dairy-note-write-tag-mark-important-office-log-stationery-fef",
            text: "我的",
            type: "login"
        },
        {
            path: "/login",
            icon: "icon-denglu",
            text: "登录注册",
            type: "nologin"
        },
        {
            path: "/editor/draft/new",
            icon: "icon-xiezuo",
            text: "Write ...",
            type: "login"
        }
    ]

    constructor(props) {
        super(props)
        this.state = {
            isFocus: false,  // 搜索框是否focus
            isLogin: false
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.isLogin === this.state.isLogin) {
            return
        }
        this.setState({
            isLogin: nextProps.isLogin
        })
    }


    componentDidMount() {
        this.init()
    }

    componentWillUnmount() {
        document.removeEventListener("click", this.golbalListen) // 必须移除同一个绑定函数
    }

    // 初始化
    init = () => {
        this.props.checkLogin()
        document.addEventListener("click", this.golbalListen)
    }

    golbalListen = () => {
        this.setState({
            isFocus: false
        })
    }

    // 搜索框是否focus
    handleFocus = () => {
        this.setState({isFocus: true})
    }

    // 退出登录
    signOut() {
        this.props.logOut()
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
                                    if (item.type === "login" && this.props.isLogin) {
                                        return (
                                            <li key={i} onClick={(e) => CommonUtils.stopBubble(e)}>
                                                <Tooltip title={item.text} placement={"left"}>
                                                    {
                                                        item.path ? <Link to={item.path}>
                                                            <i className={`tab-ico icon iconfont ${item.icon}`}/>
                                                        </Link> : <i className={`tab-ico icon iconfont ${item.icon}`}/>
                                                    }

                                                </Tooltip>
                                            </li>
                                        )
                                    }
                                    if (item.type === "nologin" && !this.props.isLogin) {
                                        return (
                                            <li key={i} onClick={(e) => CommonUtils.stopBubble(e)}>
                                                <Tooltip title={item.text} placement={"left"}>
                                                    <Link to={item.path}>
                                                        <i className={`tab-ico icon iconfont ${item.icon}`}/>
                                                    </Link>
                                                </Tooltip>
                                            </li>
                                        )
                                    }
                                    return ""
                                })}
                                {/*退出登录比较特殊,不是一个链接*/}
                                {
                                    this.props.isLogin ? <li onClick={(e) => CommonUtils.stopBubble(e)}>
                                        <Tooltip title="退出登录" placement={"left"}>
                                            <a onClick={() => this.signOut()}>
                                                <i className="tab-ico icon iconfont icon-tuichu"/>
                                            </a>
                                        </Tooltip>
                                    </li> : ""
                                }
                            </ul>
                        </div>
                    </div>
                </aside>
            </div>
        )
    }
}