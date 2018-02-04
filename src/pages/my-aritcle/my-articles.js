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

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.getMineArticleList()
    }

    render() {
        return (
            <div className="my-articles">
                <Header {...this.props}/>
                <div className="layout-center">
                    <div className="my-timeLine">
                        <section id="cd-timeline" className="cd-container">
                            {
                                this.props.mineArticleList.map((article, index) => {
                                    return (
                                        <div className="cd-timeline-block" key={index}>
                                            <div className="cd-timeline-img cd-picture">
                                                <img src={"assets/image/book.svg"} alt="Picture"/>
                                            </div>
                                            <div className="cd-timeline-content">
                                                <h2>{article.title}</h2>
                                                <p>{article.content}</p>
                                                <Link to={`/article/${article.id}`} className="cd-read-more">查看全文</Link>
                                                <span className="cd-date">{article.creatime}</span>
                                            </div>
                                        </div>)
                                })
                            }
                        </section>
                    </div>
                </div>
            </div>
        )
    }

}
