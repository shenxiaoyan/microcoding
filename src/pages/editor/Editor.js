import React, {Component} from 'react';
import "./editor.css"
import {Link} from "react-router-dom";
import marked from "marked";
import CodeMirror from "codemirror/lib/codemirror";
import '../../style/codemirror/codemirror.css'    // css，codeMirror必需
import '../../style/markdown.css'     // 编辑器主题
import '../../style/codemirror/make.css'            // 自定义的编辑器markdown样式
import 'codemirror/mode/markdown/markdown'       // markdown编辑器的语法高亮
import {Observable} from "rxjs";
import {connect} from "react-redux";
import * as _ from "lodash"
import {createArticle, getDraft, searchTags, update, updateSuccess} from "../../reducers/editor.redux";
import CommonUtils from "../../utils/commonUtils";


// 写作页面
@connect(
    store => store.editor,
    {createArticle, getDraft, update, searchTags, updateSuccess}
)
export default class Editor extends Component {

    // 编辑器实例
    editor = null;

    constructor(props) {
        super(props)
        this.state = {
            writeStatus: 1,               // 三种状态1.刚进入初始化 2.正在保存 3.已保存
            title: "",
            content: "",
            scrollTop: 0,
            showPublish: false,
            articleTags: []
        }
    }

    componentWillReceiveProps(nextProps) {

        // 第一次才初始化更新codeMirror
        if (!this.props.isInit) {
            this.editor.setValue(nextProps.content)
        }

        // props变化 更新state的状态
        this.setState({
            title: nextProps.title,
            content: nextProps.content,
            writeStatus: nextProps.writeStatus,
            articleTags: nextProps.tags === "" ? [] : nextProps.tags.split(",")
        });
    }

    componentWillMount() {

    }

    componentWillUnmount() {
        document.removeEventListener("click", this.globalListen)
    }

    componentDidMount() {
        document.addEventListener("click", this.globalListen)

        this.initEditor()
        // 滚动监听
        this.scrollListener();
        // 编辑监听
        this.listenEdit()

        this.initContent()
    }

    handlerChange(key, val) {
        this.setState({
            [key]: val
        })
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
        this.editor = CodeMirror.fromTextArea(textarea, {
            // todo 后面redux管理
            mode: "markdown",
            autoCloseBrackets: true,
            matchBrackets: true,
            showCursorWhenSelecting: true,
            lineWrapping: true,  // 长句子折行
            theme: "material",
            scrollbarStyle: "null",
            extraKeys: {"Enter": "newlineAndIndentContinueMarkdownList"}

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

    // 监听标题、内容变化
    listenEdit = () => {

        const {pathname} = this.props.history.location
        const id = this.props.match.params.id
        let isNew = pathname === "/editor/draft/new"
        let title = this.refs.title

        // 标题栏的监听事件
        let tiltleInput$ = Observable.fromEvent(title, 'input')
            .pluck("target", "value")       // 拿到input的value

        // codemirror的change事件 转化为observable
        let contentInput$ = Observable.fromEvent(this.editor, "change")
        // 合并两个事件
        Observable.merge(tiltleInput$, contentInput$)
            .filter(ev => this.props.isInit || isNew)
            .debounceTime(800)
            .subscribe(v => {
                // 更新编辑器状态
                this.setState({
                    writeStatus: 2
                })
                // 创建页
                if (pathname === "/editor/draft/new") {
                    if (v instanceof CodeMirror) {
                        this.setState({
                            content: v.getValue()
                        })
                    } else {
                        this.setState({
                            title: v
                        })
                    }
                    if (this.state.title !== "" || this.state.content !== "") {
                        this.props.createArticle(this.state, this.props.history)
                    }
                } else {
                    //编辑页
                    let newValue = this.editor.getValue()
                    if (v instanceof CodeMirror) {
                        this.props.update({content: newValue, articleId: id, title: this.state.title})
                    } else {
                        this.setState({
                            content: newValue
                        })
                        this.props.update({title: v, articleId: id, content: newValue})
                    }
                }

            })

        // 监听标签变化
        let tag = this.refs.tag
        let tagInput$ = Observable.fromEvent(tag, "input")
        tagInput$
            .debounceTime(200)
            .pluck("target", "value")
            .subscribe(v => {
                if (v === "") {
                    this.props.updateSuccess({tagList: []})
                } else {
                    this.props.searchTags(v)
                }
            })
    }

    // 如果是编辑文章页,初始化文章内容
    initContent() {
        const {pathname} = this.props.location
        const id = this.props.match.params.id
        if (pathname !== "/editor/draft/new") {
            this.props.getDraft(id)
        }
    }

    // 全局监听
    globalListen = () => {
        this.setState({
            showPublish: false
        })
    }

    // 打开发布框
    openPublish = (e) => {
        CommonUtils.stopBubble(e)
        this.setState({
            showPublish: true
        })
    }

    // 发布文章
    publish() {
        const id = this.props.match.params.id
        this.props.update({articleId: id, type: 2})
        this.setState({
            showPublish: false
        })
    }

    // 选择标签
    selectTag = (tag, type) => {

        const id = this.props.match.params.id
        if (type === 1) {
            this.state.articleTags.push(tag)
        } else {
            _.remove(this.state.articleTags, function (item) {
                return item === tag
            })
        }
        const str = this.state.articleTags.join(",");
        this.props.update({articleId: id, tags: str})
        this.props.updateSuccess({tagList: []})
        // 重置输入框
        let tagInput = this.refs.tag
        tagInput.value = ""
    }


    render() {

        const init = <span>文章将会自动保存至<Link to={"/editor/drafts"}>草稿</Link></span>
        const saving = <span>保存中</span>
        const saved = <span>已保存至<Link to={"/editor/drafts"}>草稿</Link></span>

        return (
            <div className="write">
                <header className="header editor-header">
                    <input ref="title" type="text" placeholder="输入文章标题..." className="title-input title-input"
                           value={this.state.title} onChange={(v) => this.handlerChange("title", v.target.value)}/>
                    <div className="right-box with-margin">
                        <div className="homePage"><Link to="/">回首页</Link></div>
                        <div className="status-text with-padding">
                            {this.state.writeStatus === 1 ? init : (this.state.writeStatus === 2 ? saving : saved)}
                        </div>
                        <div className="publish">
                            <button className="Button Button--blue publish-button" onClick={(e) => this.openPublish(e)} disabled={this.props.location.pathname==="/editor/draft/new"}>
                                发布<i
                                className="icon iconfont icon-xiala"/></button>
                        </div>
                    </div>
                    <div className={`select-tags ${this.state.showPublish ? "show" : "hide"}`}
                         onClick={e => CommonUtils.stopBubble(e)}>
                        <div className="title">发表文章</div>
                        <div className="tag-box">
                            <div className="sub-title">标签</div>
                            <div
                                className={`${this.state.articleTags.length > 0 ? "show" : "hide"} category-list `}>
                                {

                                    this.state.articleTags.map((name, index) => {
                                        return <div className="item" key={index}
                                                    onClick={() => this.selectTag(name, 2)}>{name}</div>
                                    })
                                }
                            </div>
                            <div className="tag-input tag-input">
                                <input type="text" ref="tag" placeholder="搜索标签（可选填）" className="input"/>
                                {
                                    this.props.tagList.length > 0 ?
                                        <ul className="suggested-tag-list">
                                            {
                                                this.props.tagList.map(tag => {
                                                    return <li className="tag" key={tag.id}
                                                               onClick={() => this.selectTag(tag.name, 1)}>{tag.name}</li>
                                                })
                                            }
                                        </ul> : ""
                                }

                            </div>
                        </div>
                        <button className="publish-btn">确定并发布</button>
                    </div>

                </header>
                <main className="main">
                    <div className="editor editor-box make" id="edit">
                        <textarea name="editor" id="editor" cols="30" rows="10" ref="editor"
                                  value={this.state.content}/>
                    </div>
                    <div className="content-preview">
                        {this.state.title === "" ? "" :
                            <div className="markdown-body"><h1>{this.state.title}</h1></div>}
                        <div className="markdown-body"
                             dangerouslySetInnerHTML={{__html: marked(this.state.content)}}/>
                    </div>
                </main>
            </div>
        )
    }
}