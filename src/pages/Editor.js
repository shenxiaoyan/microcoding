import React, {Component} from 'react';
import "../style/editor.css"
import {Link} from "react-router-dom";
import marked from "marked";
import CodeMirror from "codemirror/lib/codemirror";
import '../style/codemirror/codemirror.css'    // css，codeMirror必需
import '../style/markdown.css'     // 编辑器主题
import '../style/codemirror/make.css'            // 自定义的编辑器markdown样式
import 'codemirror/mode/markdown/markdown'  // markdown编辑器的语法高亮

// 写作页面
export default class Editor extends Component {

    // 编辑器实例
    editor = null;

    constructor(props) {
        super(props)
        this.state = {
            writeStatus: 1,               // 三种状态1.刚进入初始化 2.正在保存 3.已保存
            editorValue: "",
            scrollTop: 0,
        }
    }

    componentWillMount() {

    }

    componentDidMount() {
        this.initEditor()
        // 滚动监听
        this.scrollListener();
    }

    initEditor() {
        // markdown渲染插件初始化
        const markedRender = new marked.Renderer();   // markdown渲染 marked插件
        marked.setOptions({
            renderer: markedRender,
            gfm: true,
            tables: true,
            breaks: true,  // '>' 换行，回车换成 <br>
            pedantic: false,
            sanitize: true,
            smartLists: true,
            smartypants: false
        });
        // 初始化编辑器
        const textarea = this.refs.editor;
        this.editor = CodeMirror(function (elt) {
            textarea.parentNode.replaceChild(elt, textarea);
        }, {
            value: textarea.value,
            mode: "markdown",
            autoCloseBrackets: true,
            matchBrackets: true,
            showCursorWhenSelecting: true,
            lineWrapping: true,  // 长句子折行
            theme: "material",
            scrollbarStyle: "null",
            extraKeys: {"Enter": "newlineAndIndentContinueMarkdownList"}

        })

        this.setState({
            editorValue: marked(this.editor.getValue())
        })

        this.editor.on("change", () => {
            this.setState({
                editorValue: marked(this.editor.getValue())
            })
        })
    }

    // 编辑器和显示区域同时滚动
    scrollListener = () => {
        let this_ = this
        let over = "";
        let markdown = document.getElementsByClassName("content-preview")[0]
        let edit = document.getElementById("edit")

        edit.addEventListener("mouseover", () => {
            over = "left"
        })
        markdown.addEventListener("mouseover", () => {
            over = "right"
        })
        this.editor.on("scroll", function (e) {
            if (over !== "left") {
                return
            }
            markdown.scrollTop = e.doc.scrollTop
        })
        markdown.addEventListener("scroll", (e) => {
            if (over !== "right") {
                return
            }
            this_.editor.display.scroller.scrollTop = e.target.scrollTop

        })
    }


    render() {

        const init = <span>文章将会自动保存至<Link to={"/editor/drafts"}>草稿</Link></span>
        const saving = <span>保存中</span>
        const saved = <span>已保存至<Link to={"/editor/drafts"}>草稿</Link></span>


        return (
            <div className="write">
                <header className="header editor-header">
                    <input type="text" placeholder="输入文章标题..." className="title-input title-input"/>
                    <div className="right-box with-margin">
                        <div className="homePage"><Link to="/">回首页</Link></div>
                        <div className="status-text with-padding">
                            {this.props.writeStatus === 1 ? init : (this.props.writeStatus === 2 ? saving : saved)}
                        </div>
                        <div className="publish">
                            <button className="Button Button--blue publish-button">发布<i
                                className="icon iconfont icon-xiala"/></button>
                        </div>
                    </div>
                </header>
                <main className="main">
                    <div className="editor editor-box make" id="edit">
                        <textarea name="editor" id="editor" cols="30" rows="10" ref="editor"
                                  style={{"display": "none"}}/>
                    </div>
                    <div className="content-preview">
                        <div className="markdown-body" dangerouslySetInnerHTML={{__html: this.state.editorValue}}/>
                    </div>
                </main>
            </div>
        )
    }

}