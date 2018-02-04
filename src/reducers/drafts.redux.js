import axios from "axios";
import {host} from "../config/config";
import * as ActionTypes from "./actionTypes";

const initState = {
    errMsg: '',
    draftList: []
}

export function drafts(state = initState, action) {

    switch (action.type) {
        case "GET_DRAFT_LIST":
            return {...state, errMsg: action.errMsg, draftList: action.data};
        case "DEL_ARTICLE":
            return {
                ...state,
                errMsg: action.errMsg,
                draftList: state.draftList.filter(draft => action.delId !== draft.articleId)

            }
        default:
            return state
    }
}


function delSuccess(id) {
    return {type: ActionTypes.DEL_ARTICLE, delId: id, errMsg: ""}
}


// 获取草稿箱
export function getDraftList() {
    return dispatch => {
        axios.get(`${host}/draft/list`)
            .then(res => {
                if (res.data.success) {
                    dispatch({type: ActionTypes.GET_DRAFT_LIST, errMsg: '', data: res.data.data})
                }
            })
    }
}

// 删除草稿
export function delDraft(id) {
    return dispatch => {
        axios.delete(`${host}/article`, {
            params: {
                articleId: id
            }
        })
            .then(res => {
                if (res.data.success) {
                    dispatch(delSuccess(id))
                }
            })
    }
}