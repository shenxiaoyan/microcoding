import axios from "axios";
import * as ActionTypes from "./actionTypes";
import {host} from "../config/config";

const initState = {
    errMsg: '',
    id: "",
    title: "",
    content: "",
    previewValue: "",
    writeStatus: 1,
    isLogin: false,     // 是否登录
}

export function editor(state = initState, action) {

    switch (action.type) {
        case "EDITOR_CHANGE":
            return {...state, errMsg: action.errMsg, writeStatus: action.writeStatus};
        case "EDITOR_TITLE_CHANGE":
            return {...state, errMsg: action.errMsg, writeStatus: action.writeStatus};
        case "EDITOR_TITLE_CHANGING":
            return {...state, errMsg: action.errMsg, writeStatus: action.writeStatus};
        case "DRAFT_CHANGE":
            return {...state, errMsg: action.errMsg, writeStatus: action.writeStatus, ...action.data};
        case "ERROR_MSG":
            return {...state, errMsg: action.errMsg, writeStatus: action.writeStatus,};
        default:
            return state
    }
}

function creatSuccess(data) {
    return {type: ActionTypes.EDITOR_CHANGED, data: data, errMsg: ""}
}


// 创建文章
export function createArticle({title, content}, history) {
    return dispatch => {
        dispatch({type: ActionTypes.EDITOR_STATE_CHANGING, writeStatus: 2, errMsg: ""})
        axios.post(`${host}/article/create`, {
            title: title,
            content: content
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

// 获取草稿箱
export function getDraft(articleId) {
    return dispatch => {
        axios.get(`${host}/draft`, {
            params: {
                articleId: articleId
            }
        }).then(res => {
            if (res.data.success) {
                dispatch({type: ActionTypes.DRAFT_CHANGE, data: res.data.data, writeStatus: 1})
            } else {
                dispatch({type: ActionTypes.ERROR_MSG, errMsg: res.data.message})
            }
        })
    }
}

// 更新文章
export function update(args) {
    return dispatch => {
        dispatch({type: ActionTypes.EDITOR_STATE_CHANGING, writeStatus: 2, errMsg: ""})
        axios.put(`${host}/article/update`, args)
            .then(res => {
                if (res.data.success) {
                    dispatch({type: ActionTypes.DRAFT_CHANGE, data: args, writeStatus: 3})
                } else {
                    dispatch({type: ActionTypes.ERROR_MSG, errMsg: res.data.message, writeStatus: 3})
                }
            })
    }
}