import React, {Component} from 'react';
import {connect} from "react-redux";
import {getDraftList} from "../../reducers/drafts.redux";
import {Link} from "react-router-dom";
import "./drafts.css"
import {Popover} from "antd";
import Time from "../../component/time/time"

// 草稿箱页面
@connect(
    store => store.drafts,
    {getDraftList}
)
export default class Drafts extends Component {

    constructor() {
        super()
    }

    componentDidMount() {
        this.props.getDraftList()
    }

    render() {

        const content = <div className="">
            <ul className="menu-list">
                <li className="menu-item">
                    <Link to="">首页</Link>
                </li>
                <li className="menu-item">
                    <Link to="">我的文章</Link>
                </li>
            </ul>
        </div>

        return (
            <div className="drafts">
                <header className="navbar scroll-back-fixed scroll-back-fixed-active">
                    <div className="navbar-logo-wrapper">
                        <Link to="/" className="navbar-logo">
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
                            <Popover trigger="'click'"
                                     placement="bottomRight" content={content} overlayClassName={"pop-content"}>
                                <div>
                                    <i className="iconfont icon-gengduo"/>
                                </div>
                            </Popover>
                        </div>
                    </div>
                </header>
                <div className="Layout-main av-card">
                    <div className="InfiniteList Drafts-list">
                        <ul>
                            {
                                this.props.draftList.map((draft, index) => {
                                    return <li className="Drafts-item" key={index}>
                                        <div className="Drafts-title">
                                            <Link className="Drafts-link"
                                                  to={`/editor/draft/${draft.articleId}`}>{draft.title.trim() !== "" ? draft.title : "无标题"}</Link>
                                        </div>
                                        <div className="Drafts-meta">
                                            <Time className="Drafts-updated" time={draft.creatime}/>
                                            <span className="Bull"/>
                                            <span className="Drafts-words">共 {draft.len} 字</span>
                                            <span className="Bull"/>
                                            <span className="Drafts-removeButton">删除</span>
                                        </div>
                                    </li>
                                })
                            }
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}