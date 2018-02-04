import React, {Component} from 'react';
import {Popover, Tooltip} from "antd";
import CommonUtils from "../../utils/commonUtils";
import "./left-nav.css"
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {logOut} from "../../reducers/user.redux";

// 左边栏导航块
@connect(
    null,
    {logOut}
)
export default class LeftNav extends Component {

    constructor(props) {
        super()
    }

    slideItems = [
        {
            path: "login",
            icon: "icon-denglu",
            text: "登录注册",
            need: "nologin"
        },
        {
            path: "/editor/draft/new",
            icon: "icon-xiezuo",
            text: "Write ...",
            need: "login"
        }
    ]

    componentDidMount() {
    }

    // 退出登录
    signOut() {
        this.props.logOut()
    }

    render() {

        const content =
            <div className="menu">
                <ul className="menu-list">
                    <li className="menu-item">
                        <Link to="/editor/drafts">草稿</Link>
                    </li>
                    <li className="menu-item">
                        <Link to="/articles">已发布文章</Link>
                    </li>
                </ul>
            </div>


        return (
            <div className="left-nav">
                <aside className="aside">
                    <div id="slideBar" className="slide-bar">
                        <div className="menu">
                            <ul>
                                {
                                    this.props.isLogin ? <li onClick={(e) => CommonUtils.stopBubble(e)}>
                                        <Popover placement="right" title="我的" content={content} trigger="hover" overlayClassName={"left-nav-pop"}>
                                            <a>
                                                <i className="tab-ico iconfont icon-book-dairy-note-write-tag-mark-important-office-log-stationery-fef"/>
                                            </a>
                                        </Popover>
                                    </li> : ""
                                }
                                {this.slideItems.map((item, i) => {
                                    if (item.need === "login" && this.props.isLogin) {
                                        return (
                                            <li key={i} onClick={(e) => CommonUtils.stopBubble(e)}>
                                                <Tooltip title={item.text} placement={"left"}>
                                                    <Link to={item.path}>
                                                        <i className={`tab-ico iconfont ${item.icon}`}/>
                                                    </Link>
                                                </Tooltip>
                                            </li>
                                        )
                                    }
                                    if (item.need === "nologin" && !this.props.isLogin) {
                                        return (
                                            <li key={i} onClick={(e) => CommonUtils.stopBubble(e)}>
                                                <Tooltip title={item.text} placement={"left"}>
                                                    <Link to={item.path}>
                                                        <i className={`tab-ico iconfont ${item.icon}`}/>
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
                                                <i className="tab-ico iconfont icon-tuichu"/>
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