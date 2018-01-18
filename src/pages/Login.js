import React, {Component} from 'react';
import 'particles.js/particles';
import "../style/login.css"
import {Tabs} from 'antd';


const particlesJS = window.particlesJS;
const TabPane = Tabs.TabPane;

export default class Login extends Component {

    constructor(props) {
        super(props)
        this.state = {
            activeTab: '1'
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

    tabChange = (key) => {
        console.log(key)
        this.setState({
            activeTab: key
        })
    }

    render() {
        return (
            <div>
                <div className="index-main login">
                    <div className="index-main-body">
                        <div className="index-header">
                            <h1 className="logo hide-text">微Coding</h1>
                            <h2 className="subtitle">分享你的coding经验和见解哈哈</h2>
                        </div>
                        <div className="desk-front sign-flow clearfix sign-flow-simple">
                            <Tabs defaultActiveKey="1" onChange={this.tabChange}>
                                <TabPane tab="注册" key="1"/>
                                <TabPane tab="登录" key="2"/>
                            </Tabs>
                            <div className="view">
                                {this.state.activeTab === 1 ? <div className="sign-up">
                                    <div className="group-inputs">
                                        <div className="name input-wrapper">
                                            <input type="text" name="name" placeholder="昵称"/>
                                        </div>
                                        <div className="email input-wrapper">
                                            <input type="text" name="email" placeholder="邮箱号"/>
                                        </div>
                                        <div className="input-wrapper">
                                            <input type="password" name="password" placeholder="密码(不少于6位)"/>
                                        </div>
                                    </div>
                                    <div className="button-wrapper command">
                                        <button className="sign-button submit">
                                            注册微Coding
                                        </button>
                                        <div className="spin-modal-mask">
                                        </div>
                                    </div>
                                </div> : <div className="sign-in">
                                    <div className="group-inputs">
                                        <div className="email input-wrapper">
                                            <input type="text" name="email1" placeholder="邮箱"/>
                                        </div>
                                        <div className="input-wrapper">
                                            <input type="password" name="password1" autoComplete="off"
                                                   placeholder="密码"/>
                                        </div>
                                    </div>
                                    <div className="button-wrapper command">
                                        <button className="sign-button submit">
                                            登录
                                        </button>
                                    </div>
                                </div>}


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
