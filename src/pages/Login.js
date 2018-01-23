import React, {Component} from 'react';
import 'particles.js/particles';
import "../style/login.css"
import {Form, Tabs} from 'antd';
import {connect} from "react-redux";
import {checkLogin, login, register} from "../reducers/user.redux";


const particlesJS = window.particlesJS;
const TabPane = Tabs.TabPane;
const FormItem = Form.Item;

@connect(
    store => store.user,
    {login, register,checkLogin}
)
export default class Login extends Component {

    constructor(props) {
        super(props)
        this.isLogin()
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

    // 是否登陆 登陆了则直接跳转到首页
    isLogin = () => {
       this.props.checkLogin(this.props.history)
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

    // 登录
    handleLogin = () => {
        this.props.login(this.state, this.props.history)
    }

    handleRegister = () => {
        // 表单校验
        this.props.register(this.state)
    }

    // 注册和登录切换
    tabChange = (key) => {
        this.setState({
            activeTab: key
        })
    }

    // 检查两次密码是否相同
    checkTwoPass = (rule, value, callback) => {

        if (value !== this.state.pwd) {
            callback("两次密码不匹配")
        }
        callback()
    }

    render() {
        const {getFieldDecorator, getFieldError, isFieldTouched} = this.props.form;

        const emailError = isFieldTouched('email') && getFieldError('email');
        const passwordError = isFieldTouched('password') && getFieldError('password');
        const passwordError1 = isFieldTouched('password1') && getFieldError('password1');

        const accountError = isFieldTouched('account') && getFieldError('account')
        const passwordError2 = isFieldTouched('password2') && getFieldError('password2')


        // 注册模板
        let registerTemplate = <div className="sign-up">
            <Form>
                <div className="group-inputs">
                    <FormItem
                        validateStatus={emailError ? 'error' : ''}
                        help={emailError || ''}
                    >
                        <div className="name input-wrapper">
                            {getFieldDecorator('email', {
                                rules: [
                                    {required: true, message: '请输入邮箱'},
                                    {
                                        type: "email",
                                        message: "邮箱格式不正确"
                                    }
                                ],
                                validateFirst: true,
                                validateTrigger:"onBlur",
                                initialValue: ""
                            })(
                                <input type="text" name="email" placeholder="邮箱号"
                                       onChange={v => this.handlerChange("email", v.target.value)}/>
                            )}

                        </div>
                    </FormItem>
                    <FormItem
                        validateStatus={passwordError ? 'error' : ''}
                        help={passwordError || ''}
                    >
                        <div className="email input-wrapper">
                            {getFieldDecorator('password', {
                                rules: [
                                    {required: true, message: '请输入密码'},
                                    {min: 6, message: '密码至少6位'},
                                    {max: 15, message: "密码最多15位"},
                                    {pattern: "^[A-Za-z0-9_]{6,15}$", message: "密码只能是字母数字_组合"}
                                ],
                                initialValue: "",
                                validateFirst: true
                            })(
                                <input type="password" name="rpassword" placeholder="密码(不少于6位)"
                                       onChange={v => this.handlerChange("pwd", v.target.value)}/>
                            )}
                        </div>
                    </FormItem>
                    <FormItem
                        validateStatus={passwordError1 ? 'error' : ''}
                        help={passwordError1 || ''}
                    >
                        <div className="input-wrapper">
                            {getFieldDecorator('password1', {
                                rules: [
                                    {required: true, message: '请再次输入密码'},
                                    {validator: this.checkTwoPass}
                                ],
                                initialValue: "",
                                validateFirst: true
                            })(
                                <input type="password" name="rpassword1" placeholder="确认密码"
                                       onChange={v => this.handlerChange("pwd1", v.target.value)}/>
                            )}

                        </div>
                    </FormItem>
                </div>
                <div className="button-wrapper command">
                    <button className="sign-button submit" onClick={() => this.props.register(this.state)}>
                        注册微Coding
                    </button>
                    <div className="spin-modal-mask">
                    </div>
                </div>
            </Form>

        </div>;

        // 登录模板
        let loginTemplate = <div className="sign-in">
            <Form>
                <div className="group-inputs">
                    <FormItem
                        validateStatus={accountError ? 'error' : (this.props.errMsg === "用户不存在" ? "error" : "" )}
                        help={accountError || this.props.errMsg === "用户不存在" ? "用户不存在" : undefined || ''}
                    >
                        <div className="email input-wrapper">
                            {getFieldDecorator('account', {
                                rules: [
                                    {required: true, message: '请输入邮箱/昵称'},
                                ],
                                initialValue: "",
                            })(
                                <input type="text" name="account" placeholder="邮箱或昵称"
                                       onChange={v => this.handlerChange("account", v.target.value)}/>
                            )}

                        </div>
                    </FormItem>
                    <FormItem
                        validateStatus={passwordError2 ? 'error' : (this.props.errMsg === "密码错误" ? "error" : "" )}
                        help={passwordError2 || this.props.errMsg === "密码错误" ? "密码错误" : undefined || ''}
                    >
                        <div className="input-wrapper">
                            {getFieldDecorator('password2', {
                                rules: [
                                    {required: true, message: '请输入密码'},
                                ],
                                initialValue: "",
                            })(
                                <input type="password" name="lpassword" autoComplete="off"
                                       placeholder="密码"
                                       onChange={v => this.handlerChange("password", v.target.value)}/>
                            )}
                        </div>
                    </FormItem>
                </div>
                <div className="button-wrapper command">
                    <button className="sign-button submit"
                            onClick={this.handleLogin}>
                        登录
                    </button>
                </div>
            </Form>
        </div>

        return (
            <div className={`hide ${this.props.isLogin ? "" : "show"}`}>
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
// ant-design 表单props
Login = Form.create({})(Login);