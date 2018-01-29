import React from 'react'
import {Tooltip} from "antd";
import "./time.css"
import moment from "moment";

export default class Time extends React.Component {

    constructor() {
        super()
        this.state = {
            beforeTime: "13天"
        }
    }

    componentWillMount() {
    }

    componentDidMount() {
    }

    render() {
        return (
            <div className="time">
                <Tooltip title={moment(this.props.time).format("YYYY年MM月DD日 dddda HH:mm:ss")} placement="bottom">
                    <span>{this.state.beforeTime}</span>
                </Tooltip>
            </div>
        )
    }
}

