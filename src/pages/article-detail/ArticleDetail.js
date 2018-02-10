import React, {Component} from 'react';
import Header from "../../container/header/header";
import {connect} from "react-redux";
import {getArticleDetail} from "../../reducers/article.redux";

// 文章详情页
// 写作页面
@connect(
    store => store.article,
    {getArticleDetail}
)
export default class ArticleDetail extends Component {

    componentDidMount() {
        this.initArticle()
    }

    // 获取一篇文章详情
    initArticle = () => {
        // url中文章id
        const id = this.props.match.params.id
        this.props.getArticleDetail(id)
    }

    render() {
        return (
            <div className="article-detail">
                <Header {...this.props}/>
                文章详情页
            </div>
        )
    }

}