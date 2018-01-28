import React, {Component} from 'react';
import {connect} from "react-redux";
import {getDraftList} from "../../reducers/drafts.redux";
import {Link} from "react-router-dom";
import "./drafts.css"
import {Popover} from "antd";

// 草稿箱页面
@connect(
    store => store.drafts,
    {getDraftList}
)
export default class Drafts extends Component {

    constructor() {
        super()
        this.state = {
            isShowPopoverMore: false
        }

    }

    componentDidMount() {
        this.props.getDraftList()
    }

    render() {

        const content = <div className="pop-content">
            <ul className="menu-list">
                <li className="menu-item">
                    <Link to="">我的文章</Link>
                </li>
            </ul>
        </div>

        return (
            <div className="drafts">
                <header className="navbar scroll-back-fixed scroll-back-fixed-active">
                    <div className="navbar-logo-wrapper">
                        <Link to="/" className="navbar-logo" target="_blank">
                            <img src={"/assets/image/logo1.png"} alt="微Coding"/>
                        </Link>
                    </div>
                    <div className="nav-title">
                        <div className="nav-title-wrap">
                            <div className="page-title-sub">草稿箱</div>
                        </div>
                    </div>
                    <div className="navbar-functionality">
                        <div className="writing">
                            <Link to={"/editor/draft/new"} target="_blank">
                                <i className="iconfont icon-xiezuo"/>
                                写文章
                            </Link>
                        </div>
                        <div className="menu">
                            <Popover visible={this.state.isShowPopoverMore} trigger="'click'"
                                     placement="bottomRight" content={content}>
                                <div>
                                    <i className="iconfont icon-gengduo"/>
                                </div>
                            </Popover>
                        </div>
                    </div>
                </header>
            </div>
        )
    }
}