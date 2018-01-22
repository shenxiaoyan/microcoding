import {host} from "../common/config";
import axios from "axios";

const LOGIN_SUCESS = "LOGIN_SUCCESS"   // 登陆成功
const IS_LOGIN = "IS_LOGIN"             // 是否登录
const ERROR_MSG = "ERROR_MSG"           // 出错

const initState = {
    errMsg: '',
    account: "",
    password: "",
    isLogin: false       // 只在登录页使用，其他页面使用无意义
}

export function user(state = initState, action) {

    switch (action.type) {
        case "LOGIN_SUCCESS":
            return {...state, errMsg: action.errMsg, ...action.data};
        case "IS_LOGIN":
            return {...state, ...action.data, errMsg: ""}
        case "ERROR_MSG":
            return {...state, errMsg: action.errMsg}
        default:
            return state
    }

}

function loginSuccess(data) {
    return {type: LOGIN_SUCESS, data: data, errMsg: ""}
}

function error(msg) {
    return {type: ERROR_MSG, errMsg: msg}
}


export function login({account, password}) {

    return async dispatch => {
        let res = await axios.post(`${host}/login`, {
            account: account,
            password: password
        })
        if (res.code !== 200) {
            dispatch(error(res.data.message))
        } else {
            dispatch(loginSuccess(res.data.data))
        }
    }
}

// 注册
export function register({email, pwd, pwd1}) {

    if (pwd !== pwd1) {
        return
    }

    return dispatch => {
        axios.post(`${host}/register`, {
            email: email,
            password: pwd
        }).then((res) => {
            console.log(res)
            // dispatch(loginSuccess({account, password}))
        })
    }

}

// 是否登录
export function checkLogin() {

    return dispatch => {
        axios.get(`${host}/userInfo`)
            .then(res => {
                if (res.data.code === 200) {
                    dispatch({type: IS_LOGIN, data: {isLogin: true}})
                }
            })
    }
}
