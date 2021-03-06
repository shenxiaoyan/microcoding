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
    isInit: false,       // 在编辑页 是否初始化
    tags: "",
    tagList: []
}

export function editor(state = initState, action) {

    switch (action.type) {
        case "ARTICLE_CREAT":
            return {...state, errMsg: action.errMsg, writeStatus: action.writeStatus, ...action.data};
        case "DRAFT_CHANGE":
            return {...state, errMsg: action.errMsg, writeStatus: action.writeStatus, isInit: true, ...action.data};
        case "EDITOR_ERROR_MSG":
            return {...state, errMsg: action.errMsg, writeStatus: action.writeStatus};
        case "TAG_LIST":
            return {...state, errMsg: action.errMsg, tagList: action.data};
        case "RESET_EDITOR_INIT":
            return {...state, isInit: false};
        default:
            return state
    }
}

function createSuccess(data) {
    return {type: ActionTypes.ARTICLE_CREAT, data: data, errMsg: "", writeStatus: 3}
}

export function updateSuccess(data) {
    return {type: ActionTypes.DRAFT_CHANGE, data: data, errMsg: "", writeStatus: 3}
}

export function resetEditorInit() {
    return {type: ActionTypes.RESET_EDITOR_INIT}
}

function error(msg) {
    return {type: ActionTypes.EDITOR_ERROR_MSG, errMsg: msg, writeStatus: 3}
}

// 创建文章
export function createArticle({title, content}, history) {
    return dispatch => {
        axios.post(`${host}/article/create`, {
            title: title,
            content: content
        }).then(res => {
            if (!res.data.success) {
                dispatch(error(res.data.message))
            } else {
                history.push(`/editor/draft/${res.data.data.id}`)
                dispatch(createSuccess(Object.assign({writeStatus: 3}, res.data.data)))
            }
        })
    }
}

// 获取草稿
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
                dispatch(error(res.data.message))
            }
        })
    }
}

// 获取草稿箱
export function getDraftList() {
    return dispatch => {
        axios.get(`${host}/draft`)
            .then(res => {
                console.log(res)
            })
    }
}


// 更新文章
export function update(args, history) {
    return dispatch => {
        axios.put(`${host}/article/update`, args)
            .then(res => {
                if (res.data.success) {
                    dispatch(updateSuccess(args))
                    // 如果是发布
                    if (args.type && args.type === 2) {
                        history.push(`/article/${args.articleId}`)
                    }
                } else {
                    dispatch(error(res.data.message))
                }
            })
    }
}

// 搜索标签关键词
export function searchTags(name) {
    return dispatch => {
        axios.get(`${host}/tag/list`, {
            params: {name: name}
        }).then(res => {
            if (res.data.success) {
                dispatch({type: ActionTypes.TAG_LIST, data: res.data.data})
            } else {
                dispatch(error(res.data.message))
            }
        })
    }
}
