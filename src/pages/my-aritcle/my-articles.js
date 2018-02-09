import React, {Component} from 'react';
import 'particles.js/particles';
import Header from "../../container/header/header";
import "./my-article.css"
import "../../style/timeline.css"
import {connect} from "react-redux";
import {getMineArticleList} from "../../reducers/article.redux";
import {Link} from "react-router-dom";

@connect(
    store => store.articles,
    {getMineArticleList}
)
export default class MyArticles extends Component {

    componentDidMount() {
        this.props.getMineArticleList()
        this.initHeight()
    }

    // 初始化最小高度
    initHeight = () => {
        const clientHeight = document.body.clientHeight
            || document.documentElement.clientHeight
        const ele = document.getElementsByClassName("my-timeLine")[0]
        ele.style.minHeight = clientHeight - 92 + 'px'
    }

    render() {
        return (
            <div className="my-articles">
                <Header {...this.props}/>
                <div className="layout-center">
                    <div className="my-timeLine">
                        {
                            this.props.mineArticleList.length > 0 ? <section id="cd-timeline" className="cd-container">
                                    {
                                        this.props.mineArticleList.map((article, index) => {
                                            return (
                                                <div className="cd-timeline-block" key={index}>
                                                    <div className="cd-timeline-img cd-picture">
                                                        <img src={"assets/image/book.svg"} alt="..."/>
                                                    </div>
                                                    <div className="cd-timeline-content">
                                                        <h2>{article.title}</h2>
                                                        <p>{article.content}</p>
                                                        <Link to={`/article/${article.id}`}
                                                              className="cd-read-more">查看全文</Link>
                                                        <span className="cd-date">{article.creatime}</span>
                                                    </div>
                                                </div>)
                                        })
                                    }
                                </section> :
                                <div className='empty'>
                                    <p>列表为空, 快去<Link to={"/editor/draft/new"}>写文章</Link>吧</p>
                                </div>
                        }
                    </div>
                </div>
            </div>
        )
    }

}
