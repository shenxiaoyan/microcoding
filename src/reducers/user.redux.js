import {host} from "../config/config";
import axios from "axios";
import * as ActionTypes from "./actionTypes";

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
            return {...state, errMsg: "", ...action.data,}
        case "LOG_OUT":
            return {...state, errMsg: "", ...action.data,}
        case "ERROR_MSG":
            return {...state, errMsg: action.errMsg}
        default:
            return state
    }

}

function loginSuccess(data) {

    return {type: ActionTypes.LOGIN_SUCESS, data: data, errMsg: ""}
}

function logOutSucess(data) {
    return {type: ActionTypes.LOG_OUT, data: data, errMsg: ""}
}


function error(msg) {
    return {type: ActionTypes.ERROR_MSG, errMsg: msg}
}


// 登录
export function login({account, password}, history) {
    return dispatch => {
        axios.post(`${host}/login`, {
            account: account,
            password: password
        }).then(res => {
            if (!res.data.success) {
                dispatch(error(res.data.message))
            } else {
                dispatch(loginSuccess(res.data.data))
                history.push("/")
            }
        })

    }
}

// 注册
export function register({email, pwd}) {

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

// 退出登录
export function logOut() {
    return dispatch => {
        axios.post(`${host}/signOut`, {})
            .then(res => {
                if (res.data.success) {
                    dispatch(logOutSucess({isLogin: false}))
                } else {
                    dispatch(error(res.data.message))
                }
            })
    }
}


// 是否登录
export function checkLogin(history) {
    return (dispatch, getState) => {
        if (getState().isLogin && history) {
            return
        }
        axios.get(`${host}/userInfo`)
            .then(res => {
                if (res.data.success) {
                    if (history) {
                        history.push("/")
                    }
                    dispatch({type: ActionTypes.IS_LOGIN, data: {isLogin: true}})
                } else {
                    dispatch({type: ActionTypes.IS_LOGIN, data: {isLogin: false}})
                }
            })
    }
}
