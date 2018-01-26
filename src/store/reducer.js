import {combineReducers} from 'redux'
import {user} from "../reducers/user.redux";
import {editor} from "../reducers/editor.redux";
import {drafts} from "../reducers/drafts.redux";

export default combineReducers({user,editor,drafts})