import React from 'react'
import {Route} from 'react-router-dom'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'

// 自定义模板
nprogress.configure({
    template: "<div class='bar' role='bar' style></div>"
})

class FancyRoute extends React.Component {
    componentWillMount() {
        nprogress.start()
    }

    componentDidMount() {
        nprogress.done()
    }

    render() {
        return (
            <Route {...this.props} />
        )
    }
}

export default FancyRoute