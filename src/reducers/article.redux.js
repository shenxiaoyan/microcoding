import axios from "axios";
import {host} from "../config/config";
import * as ActionTypes from "./actionTypes";

const initState = {
    errMsg: '',
    mineArticleList: []
}

export function articles(state = initState, action) {

    switch (action.type) {
        case "GET_MINE_ARTICLE_LIST":
            return {...state, errMsg: action.errMsg, mineArticleList: action.data};
        default:
            return state
    }
}

export function getMineArticleList() {
    return dispatch => {
        axios.get(`${host}/article/mine`)
            .then(res => {
                if (res.data.success) {
                    console.log(res.data)
                    dispatch({type:ActionTypes.GET_MINE_ARTICLE_LIST,data:res.data.data.list})
                }
            })
    }
}
