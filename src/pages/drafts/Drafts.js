import React, {Component} from 'react';
import {connect} from "react-redux";
import {delDraft, getDraftList} from "../../reducers/drafts.redux";
import {Link} from "react-router-dom";
import "./drafts.css"
import {Popover, Modal, Button} from "antd";
import Time from "../../component/time/time"

// 草稿箱页面
@connect(
    store => store.drafts,
    {getDraftList, delDraft}
)
export default class Drafts extends Component {


    constructor() {
        super()
        this.state = {
            delOpen: false,
            delId: ""
        }
    }

    componentDidMount() {
        this.props.getDraftList()
    }

    deleteDraft = () => {
        console.log(this.state.delId)
        if (this.state.delId !== "") {
            this.props.delDraft(this.state.delId)
            this.toggleDelModal()
        }
    }

    toggleDelModal = (id) => {
        this.setState({
            delOpen: !this.state.delOpen,
            delId: !id || id === "" ? "" : id
        })
    }

    render() {

        console.log(this.props.draftList)
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
                                            <span className="Drafts-removeButton"
                                                  onClick={() => this.toggleDelModal(draft.articleId)}>删除</span>
                                        </div>
                                    </li>
                                })
                            }
                        </ul>
                    </div>
                </div>
                <Modal
                    visible={this.state.delOpen}
                    footer={null}
                    width="400px"
                    maskClosable={false}
                    wrapClassName="deleteModal"
                    onCancel={() => this.toggleDelModal()}
                >
                    <div className="w-modal-body delete-draft">
                        <h3 className="w-modal-title">删除草稿</h3>
                        <div className="w-modal-content">
                            <div>
                                <div className="draft-modal-delete">
                                    确认删除此草稿么?
                                </div>
                                <div className="w-modal-button-group button-group-center">
                                    <Button size={"large"} onClick={() => this.toggleDelModal()}>取消</Button>
                                    <Button type="primary" size={"large"} onClick={() => this.deleteDraft()}>确定</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal>
            </div>
        )
    }
}