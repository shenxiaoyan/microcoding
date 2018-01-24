import axios from "axios";
import * as ActionTypes from "./actionTypes";
import {host} from "../config/config";

const initState = {
    errMsg: '',
    id: "",
    title: "",
    editorValue: "",
    writeStatus: 1,
    isLogin: false     // 是否登录
}

export function editor(state = initState, action) {

    switch (action.type) {
        case "EDITOR_CHANGE":
            return {...state, errMsg: action.errMsg, ...action.data};
        case "EDITOR_TITLE_CHANGE":
            return {...state, errMsg: action.errMsg, ...action.data}
        default:
            return state
    }
}

function creatSuccess(data) {
    return {type: ActionTypes.EDITOR_CHANGED, data: data, errMsg: ""}
}


// 创建文章
export function createArticle({title, editorValue}, history) {

    return dispatch => {
        dispatch({type: ActionTypes.EDITOR_STATE_CHANGING, writeStatus: 2, errMsg: ""})
        axios.post(`${host}/article/create`, {
            title: title,
            content: editorValue
        }).then(res => {
            if (!res.data.success) {
                dispatch({type: ActionTypes.ERROR_MSG, errMsg: res.data.message})
            } else {
                history.push(`/editor/draft/${res.data.data.id}`)
                dispatch(creatSuccess(Object.assign({writeStatus: 3}, res.data.data)))
            }
        })
    }
}