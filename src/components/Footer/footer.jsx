import React, { Component } from 'react'
import { connect } from 'react-redux'
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
        websiteCommentList({ top: 4 }, r => {
            const { data } = r;
            this.setState({
                messageRank: data
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
                            {r.text}
                            <b>({r.thumbUpCount})</b>
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
        articleCommentRank({ top: 4 }, r => {
            const { data } = r;
            this.setState({
                commentRank: data
            })
        })
    }

    render() {
        return (
            this.state.commentRank.map((comment, idx) => {
                return (
                    <li className="media" key={idx}>
                        <div className="footer-img">
                            <img className="mr-3" src={comment.coverImage || `${require('../../images/default.png')}`} alt="Generic placeholder image" />
                        </div>
                        <div className="media-body art-content footer-content">
                            <h5 className="mt-0 mb-1">{comment.text}</h5>
                            <p>{comment.firstTitle}</p>
                        </div>
                    </li>
                )
            })
        )
    }
}

class Footer extends React.Component {
    render() {
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
                    <div className="copy-right"><span>Copyright © {this.props.userInfo.nickname} 2018 </span></div>
                    <div className="bottom-nav">
                        <span>蜀ICP备2020030978号-1</span>
                    </div>
                </div>
            </footer>)
    }
}

const mapStateToProps = (state) => {
    return {
        userInfo: state.CachedUser,
    }
}


const mapDispatchToProps = (Dispatch) => {
    return {}
}
export default connect(mapStateToProps, mapDispatchToProps)(Footer)