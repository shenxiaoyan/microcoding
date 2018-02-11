import React, {Component} from 'react';
import Header from "../../container/header/header";
import {connect} from "react-redux";
import marked from "marked";
import {getArticleDetail} from "../../reducers/article.redux";
import LeftNav from "../../container/left-nav/left-nav";
import {checkLogin} from "../../reducers/user.redux";
import "./articleDetail.css"
import highlight from "highlight.js"
import "../../style/atom-one-dark.css"
import {Link} from "react-router-dom";
import CommonUtils from "../../utils/commonUtils";

// 文章详情页
// 写作页面
@connect(
    store => {
        return {...store.articles, ...store.user}
    },
    {getArticleDetail, checkLogin}
)
export default class ArticleDetail extends Component {

    constructor() {
        super()
        marked.setOptions({
            highlight: function (code) {
                return highlight.highlightAuto(code).value;
            }
        });
    }

    componentDidMount() {

        this.props.checkLogin()

        this.initArticle()
    }

    // 获取一篇文章详情
    initArticle = () => {
        // url中文章id
        const id = this.props.match.params.id
        this.props.getArticleDetail(id)
    }

    render() {
        const articleDetail = this.props.articleDetail.content
        return (
            <div className="article-detail">
                <Header {...this.props}/>
                <LeftNav {...this.props}/>
                <div className="note">
                    <div className="post">
                        <div className="article">
                            <h1 className="title">{this.props.articleDetail.title}</h1>
                            <div className="author">
                                <div className="info">
                                    <span className="name">
                                        <Link to="/"/>
                                    </span>
                                    <div className="meta">
                                        <span className="wordage">字数 {this.props.articleDetail.len}</span>
                                        <span className="views-count">阅读 </span>
                                    </div>
                                </div>
                            </div>
                            <div className="show-content">
                                <div className="show-content-free markdown-body"
                                     dangerouslySetInnerHTML={{__html: marked(articleDetail || "")}}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}