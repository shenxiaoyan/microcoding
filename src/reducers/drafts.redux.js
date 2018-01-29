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
        default:
            return state
    }
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
