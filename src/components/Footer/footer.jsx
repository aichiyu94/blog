import React, { Component } from 'react'
import { articleCommentRank, websiteCommentList } from '../../api/article'

//网站留言排行
class WebsiteMessageRank extends Component {
    constructor() {
        super()
        this.state = {
            messageRank: []
        }
    }

    componentDidMount() {
        websiteCommentList(4, r => {
            const data = r.message;
            let messages = [];
            for (const c of data) {
                messages.push({ content: c.comment, viewCount: c.priseCount })
            }
            this.setState({
                messageRank: messages
            })
        })
    }

    render() {
        return (
            this.state.messageRank.map((r, idx) => {
                return (
                    <li key={idx}>
                        <span>{idx + 1}</span>
                        <a href="#">
                            {r.content}
                            <b>({r.viewCount})</b>
                        </a>
                    </li>
                )
            })
        )
    }
}

//文章评论排行
class ArticleCommentRank extends Component {
    constructor() {
        super();
        this.state = {
            commentRank: []
        }
    }

    componentDidMount() {
        articleCommentRank(4, r => {
            const data = r.message;
            let messages = [];
            for (const c of data) {
                messages.push({
                    articleId: c.articleId,
                    articleFirst_title: c.first_title,
                    articleCover: c.articleCover,
                    articleSecond_title: c.second_title
                })
            }
            this.setState({
                commentRank: messages
            })
        })
    }

    render() {
        return (
            this.state.commentRank.map((comment, idx) => {
                return (
                    <li className="media" key={idx}>
                        <div className="footer-img">
                            <img className="mr-3" src={comment.articleCover} alt="Generic placeholder image" />
                        </div>
                        <div className="media-body art-content footer-content">
                            <h5 className="mt-0 mb-1">{comment.articleFirst_title}</h5>
                            <p>{comment.articleSecond_title}</p>
                        </div>
                    </li>
                )
            })
        )
    }
}

function Footer() {
    return (
        <footer id="footer">
            <div className="container">
                <div className="row footer-row">
                    <div className="col-md-6">
                        <div className="fooder-title">
                            <h5>网站留言排行</h5>
                        </div>
                        <div className="something">
                            <ul className="art-sort">
                                <WebsiteMessageRank />
                            </ul>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="fooder-title">
                            <h5>文章评论排行</h5>
                        </div>
                        <ul className="list-unstyled footer-list">
                            {/* 文章评论排行 */}
                            <ArticleCommentRank />
                        </ul>
                    </div>
                    {/* <div className="col-md-3">dASDsadASDasdASDas</div>
                    <div className="col-md-3">dASDsadASDasdASDas</div> */}
                </div>
            </div>
            <div className="foot-nav text-center">
                <div className="copy-right"><span>Copyright © xxxxxxxx 2018 </span></div>
                <div className="bottom-nav">
                    <span>蜀ICP备2020030978号-1</span>
                </div>
            </div>
        </footer>)
}

export default Footer