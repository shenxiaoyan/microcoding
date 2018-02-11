import axios from "axios";
import {host} from "../config/config";
import * as ActionTypes from "./actionTypes";

const initState = {
    errMsg: '',
    mineArticleList: [],
    articleDetail: {}
}

export function articles(state = initState, action) {

    switch (action.type) {
        case "GET_MINE_ARTICLE_LIST":
            return {...state, errMsg: action.errMsg, mineArticleList: action.data};
        case "GET_ARTICLE_DETAIL":
            return {...state, errMsg: action.errMsg, articleDetail: action.data}
        default:
            return state
    }
}

export function getMineArticleList() {
    return dispatch => {
        axios.get(`${host}/article/mine`)
            .then(res => {
                if (res.data.success) {
                    dispatch({type: ActionTypes.GET_MINE_ARTICLE_LIST, errMsg: "", data: res.data.data.list})
                }
            })
    }
}

export function getArticleDetail(articleId) {

    return dispatch => {
        axios.get(`${host}/article`, {
            params: {articleId: articleId}
        }).then(res => {
            if (res.data.success) {
                dispatch({type: ActionTypes.GET_ARTICLE_DETAIL, errMsg: "", data: res.data.data})
            }
        })
    }
}
