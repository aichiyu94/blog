import React, { Component } from 'react'

//留言排行
class MessageRank extends Component {
    constructor() {
        super()
        this.state = {
            messageRank: [
                { content: '有意思的文章', viewCount: 15 },
                { content: '有意思的文章', viewCount: 8 },
                { content: '有意思的文章', viewCount: 5 },
                { content: '有意思的文章', viewCount: 1 },
            ]
        }
    }
    render() {
        return (
            this.state.messageRank.map((r, idx) => {
                return (
                    <li key={idx}>
                        <span>{idx + 1}</span>
                        <a href="#">{r.content}
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
            commentRank: [{
                articleId: 5,
                articleTitle: 'js前端实现模糊查询',
                articleImg: `${require("../../common/images/6.jpg")}`,
                articleShortBody: 'js前端实现模糊查询对于模糊查询，一般都是传关键字给后端，由后端来做'
            },
            {
                articleId: 5,
                articleTitle: 'js前端实现模糊查询',
                articleImg: `${require("../../common/images/6.jpg")}`,
                articleShortBody: 'js前端实现模糊查询对于模糊查询，一般都是传关键字给后端，由后端来做'
            },
            {
                articleId: 5,
                articleTitle: 'js前端实现模糊查询',
                articleImg: `${require("../../common/images/6.jpg")}`,
                articleShortBody: 'js前端实现模糊查询对于模糊查询，一般都是传关键字给后端，由后端来做'
            }]
        }
    }
    render() {
        return (
            this.state.commentRank.map((comment, idx) => {
                return (
                    <li className="media" key={idx}>
                        <div className="footer-img">
                            <img className="mr-3" src={comment.articleImg} alt="Generic placeholder image" />
                        </div>
                        <div className="media-body art-content footer-content">
                            <h5 className="mt-0 mb-1">{comment.articleTitle}</h5>
                            <p>{comment.articleShortBody}</p>
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
                            <h5>留言排行</h5>
                        </div>
                        <div className="something">
                            <ul className="art-sort">
                                <MessageRank />
                            </ul>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="fooder-title">
                            <h5>文章留言排行</h5>
                        </div>
                        <ul className="list-unstyled footer-list">
                            {/* 文章留言排行 */}
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
                    <span>ICP备xxxx号 </span>
                </div>
            </div>
        </footer>)
}

export default Footer