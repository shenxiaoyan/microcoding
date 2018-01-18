import React, {Component} from 'react';
import 'particles.js/particles';
import "../style/login.css"
import {Tabs} from 'antd';
import {connect} from "react-redux";
import {login, register} from "../reducers/user.redux";


const particlesJS = window.particlesJS;
const TabPane = Tabs.TabPane;

@connect(
    state => state.user,
    {login,register}
)
export default class Login extends Component {

    constructor(props) {
        super(props)
        this.state = {
            activeTab: '1',
            account: '',
            password: '',   // 登录的密码
            email: '',
            pwd: '',    // 注册的密码
            pwd1: ''    // 注册重复输的密码
        }
    }

    componentDidMount() {
        this.loadParticle()
    }

    // 加载 particles canvas 动画
    loadParticle() {
        particlesJS.load('Particles', 'particles.json', function () {
            console.log('callback - particles.js config loaded');
        });
    }

    handlerChange(key, val) {
        this.setState({
            [key]: val
        })
    }

    handleLogin = () => {
        this.props.login(this.state)
    }


    tabChange = (key) => {
        this.setState({
            activeTab: key
        })
    }

    render() {

        // 注册模板
        let registerTemplate = <div className="sign-up">
            <div className="group-inputs">
                <div className="name input-wrapper">
                    <input type="text" name="email" placeholder="邮箱号"
                           onChange={v => this.handlerChange("email", v.target.value)}/>
                </div>
                <div className="email input-wrapper">
                    <input type="password" name="rpassword" placeholder="密码(不少于6位)"
                           onChange={v => this.handlerChange("pwd", v.target.value)}/>
                </div>
                <div className="input-wrapper">
                    <input type="password" name="rpassword1" placeholder="确认密码"
                           onChange={v => this.handlerChange("pwd1", v.target.value)}/>
                </div>
            </div>
            <div className="button-wrapper command">
                <button className="sign-button submit" onClick={()=>this.props.register(this.state)}>
                    注册微Coding
                </button>
                <div className="spin-modal-mask">
                </div>
            </div>
        </div>;

        // 登录模板
        let loginTemplate = <div className="sign-in">
            <div className="group-inputs">
                <div className="email input-wrapper">
                    <input type="text" name="account" placeholder="邮箱或昵称"
                           onChange={v => this.handlerChange("account", v.target.value)}/>
                </div>
                <div className="input-wrapper">
                    <input type="password" name="lpassword" autoComplete="off"
                           placeholder="密码"
                           onChange={v => this.handlerChange("password", v.target.value)}/>
                </div>
            </div>
            <div className="button-wrapper command">
                <button className="sign-button submit"
                        onClick={this.handleLogin}>
                    登录
                </button>
            </div>
        </div>

        return (
            <div>
                <div className="index-main login">
                    <div className="index-main-body">
                        <div className="index-header">
                            <h1 className="logo hide-text">微Coding</h1>
                            <h2 className="subtitle">分享你的coding经验和见解</h2>
                        </div>
                        <div className="desk-front sign-flow clearfix sign-flow-simple">
                            <Tabs defaultActiveKey="1" onChange={this.tabChange}>
                                <TabPane tab="注册" key="1"/>
                                <TabPane tab="登录" key="2"/>
                            </Tabs>
                            <div className="view">
                                {this.state.activeTab === "1" ? registerTemplate : loginTemplate}
                            </div>
                        </div>
                    </div>
                </div>
                {/*底部栏 备案信息*/}
                <div className="footer">
                    <span>© 2018 微Coding</span>
                    <span className="dot">·</span>
                    <a href="http://www.miibeian.gov.cn/" target="_blank" rel="noopener noreferrer">浙 ICP 证
                        17035117号</a>
                </div>
                {/*--背景*/}
                <div id="Particles"/>
            </div>

        )
    }

}
