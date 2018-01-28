import React, {Component} from 'react';
import {Link, NavLink} from "react-router-dom";
import CommonUtils from "../../utils/commonUtils";
import "./header.css"


export default class Header extends Component {

    constructor() {
        super()
        this.state = {
            isFocus: false    // 搜索框是否focus
        }
    }

    componentWillUnmount() {
        document.removeEventListener("click", this.globalListen) // 必须移除同一个绑定函数
    }

    globalListen = () => {
        this.setState({
            isFocus: false
        })
    }

    componentDidMount() {
        this.init()
    }

    // 初始化
    init = () => {
        document.addEventListener("click", this.globalListen)
    }


    // 搜索框是否focus
    handleFocus = () => {
        this.setState({isFocus: true})
    }

    render() {
        return (
            <header className="header">
                <div className="Sticky header-inner is-fixed">
                    <Link to={"/"}>
                        <img className="logo" src={"/assets/image/logo1.png"} alt="logo"/>
                    </Link>
                    <nav className="header-nav">
                        <NavLink to={"/"} className="header-navItem"
                                 activeClassName={this.props.match.url === "/" ? "is-active" : ""}>首页</NavLink>
                        <NavLink to={"/article/1"} className="header-navItem" activeClassName="is-active">收藏集</NavLink>
                        <NavLink to={"/todo"} className="header-navItem" activeClassName="is-active">Todo</NavLink>
                    </nav>
                    <div className="search-bar">
                        <div className="search-bar-tool-wrapper">
                            <form className="search-bar-tool">
                                <div
                                    className={`search-bar-input input-wrapper-search input-wrapper--grey ${this.state.isFocus ? "is-focus" : ""}`}
                                >
                                    <input type="text" autoComplete="off" placeholder="搜索" className="Input"
                                           onFocus={() => this.handleFocus()}
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
        )
    }
}