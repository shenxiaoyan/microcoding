import axios from "axios";
import {host} from "../config/config";

const initState = {
    errMsg: '',
    draftList: []
}

export function drafts(state = initState, action) {

    switch (action.type) {
        case "GET_DRAFT_LIST":
            return {...state, errMsg: action.errMsg, ...action.data};
        default:
            return state
    }
}

// 获取草稿箱
export function getDraftList() {
    return dispatch => {
        axios.get(`${host}/draft/list`)
            .then(res => {
                console.log(res)
            })
    }
}
