import React, {Component} from 'react';
import {connect} from "react-redux";
import {getDraftList} from "../reducers/drafts.redux";

// 草稿箱页面
@connect(
    store => store.drafts,
    {getDraftList}
)
export default class Drafts extends Component {

    componentDidMount() {
        this.props.getDraftList()
    }

    render() {
        return (
            <div className="write">
                草稿箱
            </div>
        )
    }

}