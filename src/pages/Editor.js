import React, {Component} from 'react';
import "../style/editor.css"

// 写作页面
export default class Editor extends Component {

    render() {
        return (
          <div className="write">
              <header className="header editor-header">
                  <input type="text" placeholder="输入文章标题..."  className="title-input title-input"/>
              </header>
          </div>
        )
    }

}