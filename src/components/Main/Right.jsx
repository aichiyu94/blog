import React, { Component } from 'react'

import { timeDiffer, timeFormat } from '../../utils/timeUtils'
import {
    getTags, recommendationArticle, articleBrowserRank,
    articleCommentRank, websiteCommentList
} from '../../api/article'
import { visitorRecords } from '../../api/user'

const userInfo = { name: '爱吃鱼', avater: `${require('../../common/images/1.png')}`, description: '一个全栈开发' }
var search = { key: '', history: [] }

/**
 * 网站通告
 */
class WebsiteNotice extends Component {
    constructor() {
        super();
        this.state = {
            informs: [
                { title: '买卖得心应手的时候，切忌得意忘形' },
                { title: '有子万事足，无股一身轻' }
            ]
        };
    }
    render() {
        return (
            this.state.informs.map((inform, index) => {
                return (
                    <li key={index}><a href="">{inform.title}</a></li>
                )
            })
        )
    }
}

//留言
class WebsiteComment extends Component {
    constructor() {
        super();
        this.state = {
            commentRank: []
        };
    }
    componentDidMount() {
        websiteCommentList(4, r => {
            const data = r.message;
            let comments = [];
            for (const c of data) {
                comments.push({ content: c.comment, viewCount: c.priseCount })
            }
            this.setState({
                commentRank: comments
            })
        })
    }
    render() {
        return (
            this.state.commentRank.map((m, index) => {
                return (
                    <li key={index}>
                        <span>{index + 1}</span>
                        <a href="#">{m.content}
                            <b>({m.viewCount})</b>
                        </a>
                    </li>
                )
            })
        )
    }
}

//文章互动
class ArticleInteract extends Component {
    constructor() {
        super()
        this.state = {
            Interacts: []
        }
    }
    componentDidMount() {
        articleCommentRank(4, r => {
            const data = r.message;
            let interacts = [];
            for (const c of data) {
                const timeStr = timeFormat(new Date(c.publishTime));
                interacts.push({
                    id: c.articleId,
                    articleFirst_title: c.first_title,
                    publishTime: timeStr,
                    articleAuthor: c.authorName,
                    articleCover: c.articleCover || `${require("../../common/images/6.jpg")}`,
                })
            }
            this.setState({
                Interacts: interacts
            })
        })
    }
    render() {
        return (
            this.state.Interacts.map((article, idx) => {
                return (
                    <li key={idx}>
                        <div className="art-hd-list-left">
                            <a href={'/View?articleId=' + article.id}><img src={article.articleCover} alt="" /></a>
                        </div>
                        <div className="art-hd-list-right">
                            <span><i className="el-user"></i>{article.articleAuthor}</span>
                            <time>{article.publishTime}</time>
                            <p>{article.articleFirst_title}</p>
                        </div>
                    </li>
                )
            })
        )
    }
}

//文章浏览排行
class ArticleBrowserRank extends Component {
    constructor() {
        super()
        this.state = {
            browserRank: []
        }
    }
    componentDidMount() {
        articleBrowserRank(5, r => {
            const data = r.message
            let rank = [];
            for (const a of data) {
                rank.push({
                    id: a.id,
                    first_title: a.first_title,
                    browserCount: a.browserCount
                });
            }
            this.setState({
                browserRank: rank
            })
        })
    }

    render() {
        return (
            this.state.browserRank.map((article, idx) => {
                return (
                    <li key={idx}>
                        <span>{idx + 1}</span>
                        <a href={'/View?articleId=' + article.id}>{article.first_title}
                            <b>({article.browserCount})</b>
                        </a>
                    </li>
                )
            })
        )
    }
}

//推荐
class Recommendation extends Component {
    constructor() {
        super();
        this.state = {
            articles: []
        }
    }

    componentDidMount() {
        recommendationArticle(6, r => {
            let recommdations = []
            const result = r.message;
            for (const art of result) {
                const timeStr = timeFormat(new Date(art.publishTime));
                recommdations.push({
                    bg: art.cover_image || `${require('../../common/images/5.jpg')}`,
                    timeSpan: timeDiffer(new Date(art.publishTime)),
                    first_title: art.first_title,
                    second_title: art.second_title,
                    publishTime: timeStr,
                    author: art.authorNickname,
                    thumbUp: art.thumbUpCount,
                    browser: art.browserCount,
                })
            }
            this.setState({
                articles: recommdations
            })
        });
    }

    render() {
        return (
            this.state.articles.map((article, idx) => {
                return (
                    <li className="media" key={idx}>
                        <div className="artimg-img">
                            <img className="mr-3" src={article.bg} alt="Generic placeholder image" />
                        </div>
                        <div className="media-body art-content">
                            <h5 className="mt-0 mb-1">{article.first_title}</h5>
                            <p>{article.second_title}</p>
                            <ul>
                                <li><a title={article.author + article.publishTime + '发表'}><i className="el-time"></i>{article.publishTime}</a></li>
                                <li className="d-none d-sm-none d-md-none d-lg-block"><a href="/index/article/index/id/32.html" title={'已有' + article.browser + '人查看'}><i className="el-fire"></i>{article.browser}</a></li>
                            </ul>
                        </div>
                    </li>
                )
            })
        )
    }
}

class ViewLastArticleOnRight extends Component {
    constructor() {
        super()
        this.state = {
            viewArticle: false
        }
    }

    render() {
        const showThis = (<div className="row bgc">
            <div className="new new-right">
                <span>最新文章</span>
                <small>New Article</small>
            </div>
            <div className="col-md-12 ">
                <div className="fxtp">
                    <ul>
                        <li><a href=""></a><span>微博</span></li>
                        <li><a href=""></a></li>
                        <li><a href=""></a></li>
                        <li><a href=""></a></li>
                    </ul>
                </div>

            </div>
        </div>)

        const hideThis = "";

        return (
            this.props.viewArticle ? showThis : hideThis
        )
    }
}

//标签云
class LabelCloud extends Component {
    constructor() {
        super();
        this.state = {
            hashTags: []
        };
    }

    componentDidMount() {
        getTags(r => {
            let hashTags = [];
            const tagData = r.message;
            for (const tag in tagData) {
                hashTags.push({ name: tag, count: tagData[tag] })
            }
            this.setState({
                hashTags: hashTags
            })
        })
    }

    render() {
        return (
            this.state.hashTags.map((tag, idx) => {
                return (
                    <li key={idx}>
                        <a href="#" title={tag.name}>{tag.name}&nbsp;&nbsp;({tag.count})</a>
                    </li>
                )
            })
        )
    };
}

class Right extends Component {
    constructor() {
        super()
        this.state = {
            viewArticle: false,
            visitInfo: {}
        }
    }
    componentDidMount() {
        this.setState({
            viewArticle: this.props.viewArticle
        })

        //获取访问数据
        visitorRecords(r => {
            this.setState({
                visitInfo: r.message
            })
        });
    }
    render() {
        return (
            <div className="col-md-4">
                <div className="container">
                    <ViewLastArticleOnRight viewArticle={this.state.viewArticle} />
                    <div className="row bgc mt-5 right-author">
                        <div className="col-md-12 ">
                            <div className="auth-img">
                                <img src={userInfo.avater} alt="" />
                            </div>
                            <div className="auth-name">
                                <span>{userInfo.name}</span>
                                <p>{userInfo.description}</p>
                            </div>
                            <div className="auth-info">
                                <ul>
                                    <li><strong>{this.state.visitInfo.today}</strong><span>今日访问量</span></li>
                                    <li><strong>{this.state.visitInfo.week}</strong><span>本周访问量</span></li>
                                    <li><strong>{this.state.visitInfo.month}</strong><span>本月访问量</span></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="row bgc mt-4">
                        <div className="new new-right">
                            <span>网站公告</span>
                            <small>Notice</small>
                        </div>
                        <div className="col-md-12 ">
                            <div className="notice">
                                <ul>
                                    {/* 网站通知 */}
                                    <WebsiteNotice />
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="row bgc mt-3">
                        <div className="search">
                            <input type="text" className="search-input" placeholder="First name" />
                            <input className="search-submit" value={search.key} type="submit" />
                            <i className="el-search"></i>
                        </div>
                    </div>
                    <div className="row bgc mt-3">
                        <div className="new new-right">
                            <span><i className="el-headphones"></i>留言</span>
                            <small>Messages</small>
                        </div>
                        <div className="col-md-12 ">
                            <div className="tab-pane" role="tabpanel" aria-labelledby="nav-profile-tab">
                                <ul className="art-sort">
                                    {/* 留言 */}
                                    <WebsiteComment />
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* 推荐图文 */}
                    <div className="row bgc mt-4">
                        <div className="new new-right">
                            <span><i className="el-asl"></i>推荐图文</span>
                            <small>Recommendation</small>
                        </div>
                        <ul className="list-unstyled artimg-list">
                            <Recommendation />
                        </ul>
                    </div>

                    {/* 文章互动及排行 */}
                    <div className="row bgc mt-5">
                        <div className="nav nav-tabs tab-atr" id="box" role="tablist">
                            <a className="nav-item  active actives" id="nav-home-tab" data-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="true">文章互动</a>
                            <a className="nav-item " id="nav-profile-tab" data-toggle="tab" href="#nav-profile" role="tab" aria-controls="nav-profile" aria-selected="false">文章浏览排行</a>
                        </div>
                        <div className="tab-content" id="nav-tabContent">
                            <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                                <ul className="hd-ul">
                                    {/* 文章互动 */}
                                    <ArticleInteract />
                                </ul>
                            </div>
                            <div className="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
                                <ul className="art-sort">
                                    {/* 文章排行 */}
                                    <ArticleBrowserRank />
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* 标签云 */}
                    <div className="row bgc mt-5">
                        <div className="new new-right">
                            <span><i className="el-tags"></i>标签云</span>
                            <small>Tags</small>
                        </div>
                        <div className="col-md-12 ">
                            <ul className="label">
                                {/* 标签云 */}
                                <LabelCloud />
                            </ul>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default Right