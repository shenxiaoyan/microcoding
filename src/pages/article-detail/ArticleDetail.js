import React, {Component} from 'react';
import Header from "../../container/header/header";

// 文章详情页
export default class ArticleDetail extends Component {

    componentDidMount() {
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