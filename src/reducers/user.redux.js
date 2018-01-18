import {host} from "../config";
import axios from "axios";

const LOGIN_SUCESS = "LOGIN_SUCCESS"
const ERROR_MSG = "ERROR_MSG"

const initState = {
    msg: '',
    account: "",
    password: "",
}

export function user(state = initState, action) {

    switch (action.type) {
        case "LOGIN_SUCCESS":
            return {...state, msg: action.msg, ...action.data};
        case "ERROR_MSG":
            return {...state, msg: action.msg}
        default:
            return state
    }

    return state;
}

function loginSuccess(data) {
    return {type: LOGIN_SUCESS, data: data}
}



export function login({account, password}) {

    return dispatch => {
        axios.post(`${host}/login`, {
            account: account,
            password: password
        }).then((res) => {
            console.log(res)
            dispatch(loginSuccess({account, password}))
        })
    }
}

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
