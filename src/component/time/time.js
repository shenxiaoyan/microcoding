import React from 'react'
import {Tooltip} from "antd";
import "./time.css"
import moment from "moment";

export default class Time extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            beforeTime: this.timeAgo(this.props.time)
        }
    }

    componentWillMount() {
    }

    componentDidMount() {
    }

    timeAgo = (val) => {
        let nowDate = new Date();
        let replyDate = new Date(val);
        let diffSeconds = (nowDate.getTime() - Number(replyDate.getTime())) / 1000;
        let years = 365 * 24 * 60 * 60;
        let months = 30 * 24 * 60 * 60;
        let days = 24 * 60 * 60;
        let hours = 60 * 60;
        let minutes = 60;
        let seconds = 1;
        if (diffSeconds < seconds) {
            return '1秒以前'
        } else if (seconds <= diffSeconds && diffSeconds < minutes) {
            return Math.floor(diffSeconds / seconds) + ' 秒前'
        } else if (minutes <= diffSeconds && diffSeconds < hours) {
            return Math.floor(diffSeconds / minutes) + ' 分钟前'
        } else if (hours < diffSeconds && diffSeconds < days) {
            return Math.floor(diffSeconds / hours) + ' 小时前'
        } else if (days < diffSeconds && diffSeconds < months) {
            return Math.floor(diffSeconds / days) + ' 天前'
        } else if (months < diffSeconds && diffSeconds < years) {
            return Math.floor(diffSeconds / months) + ' 个月前'
        } else {
            return Math.floor(diffSeconds / years) + ' 年前'
        }
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

