import React, {Component} from 'react';
import {Link} from "react-router-dom";
import "../style/home.css"
import CommonUtils from "../utils/commonUtils";

// 首页
export default class Home extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isFocus: false,  // 搜索框是否focus
        }
    }


    componentWillMount() {

    }

    componentDidMount() {
        this.init()
    }

    componentWillUnmount() {
        document.removeEventListener("click", () => {
        })
    }

    init() {
        document.addEventListener("click", () => {
            this.setState({
                isFocus: false
            })
        })
    }

    handleFocus = (e) => {
        this.setState({isFocus: true})
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
                                        className={`search-bar-input input-wrapper input-wrapper--grey ${this.state.isFocus ? "is-focus" : ""}`}
                                    >
                                        <input type="text" autoComplete="off" placeholder="搜索" className="Input"
                                               onFocus={(e) => this.handleFocus(e)}
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
                <aside></aside>
            </div>
        )
    }
}