import React, { Component } from 'react'

const userInfo = { name: '爱吃鱼', avater: `${require('../../common/images/1.png')}`, description: '一个全栈开发' }
const visitInfo = { today: 2, week: 5, month: 10 }
var search = { key: '', history: [] }

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
class Messages extends Component {
    constructor() {
        super();
        this.state = {
            messages: [
                { message: '我们会做得很好', viewCount: 2565 },
                { message: '婪与恐惧，投资之大忌', viewCount: 2484 },
                { message: '心态第一，策略第二', viewCount: 2428 },
                { message: '能量朝高走前面', viewCount: 2384 }
            ]
        };
    }
    render() {
        return (
            this.state.messages.map((m, index) => {
                return (
                    <li key={index}>
                        <span>{index + 1}</span>
                        <a href="#">{m.message}
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
            articles: [
                {
                    bg: `${require("../../common/images/9.jpg")}`, title: 'js前端实现模糊查询',
                    body: 'js前端实现模糊查询对于模糊查询，一般都是传关键字给后端，由后端来做。但是有时候一些轻量级的列表前端来做可以减少ajax请求，在一定程度上提高用户体验。废话不多...',
                    publishTime: '2019-04-03',
                    author: '惜缘',
                    thumUp: 2,
                    browser: 2,
                    catalog: '生活',
                },
                {
                    bg: `${require("../../common/images/6.jpg")}`, title: 'js前端实现模糊查询',
                    body: 'js前端实现模糊查询对于模糊查询，一般都是传关键字给后端，由后端来做。但是有时候一些轻量级的列表前端来做可以减少ajax请求，在一定程度上提高用户体验。废话不多...',
                    publishTime: '2019-04-03',
                    author: 'Luke',
                    thumUp: 2,
                    browser: 8,
                    catalog: '生活'
                },
                {
                    bg: `${require("../../common/images/7.jpg")}`, title: 'js前端实现模糊查询',
                    body: 'js前端实现模糊查询对于模糊查询，一般都是传关键字给后端，由后端来做。但是有时候一些轻量级的列表前端来做可以减少ajax请求，在一定程度上提高用户体验。废话不多...',
                    publishTime: '2019-04-03',
                    author: '惜缘',
                    thumUp: 2,
                    browser: 2,
                    catalog: '生活',
                },
                {
                    bg: `${require("../../common/images/6.jpg")}`, title: 'js前端实现模糊查询',
                    body: 'js前端实现模糊查询对于模糊查询，一般都是传关键字给后端，由后端来做。但是有时候一些轻量级的列表前端来做可以减少ajax请求，在一定程度上提高用户体验。废话不多...',
                    publishTime: '2019-04-03',
                    author: 'abc',
                    thumUp: 2,
                    browser: 2,
                    catalog: '生活',
                }]
        }
    }
    render() {
        return (
            this.state.articles.map((article, idx) => {
                return (
                    <li key={idx}>
                        <div className="art-hd-list-left">
                            <a href="#"><img src={article.bg} alt="" /></a>
                        </div>
                        <div className="art-hd-list-right">
                            <span><i className="el-user"></i>{article.author}</span>
                            <time>{article.publishTime}</time>
                            <p>{article.title}</p>
                        </div>
                    </li>
                )
            })
        )
    }
}

//文章排行
class ArticleRank extends Component {
    constructor() {
        super()
        this.state = {
            messages: [
                { message: '我们会做得很好', viewCount: 2565 },
                { message: '婪与恐惧，投资之大忌', viewCount: 2484 },
                { message: '心态第一，策略第二', viewCount: 2428 },
                { message: '能量朝高走前面', viewCount: 2384 }
            ]
        }
    }
    render() {
        return (
            this.state.messages.map((m, idx) => {
                return (
                    <li key={idx}>
                        <span>{idx + 1}</span>
                        <a href="#">{m.message}
                            <b>({m.viewCount})</b>
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
            articles: [
                {
                    bg: `${require("../../common/images/9.jpg")}`, title: 'js前端实现模糊查询',
                    body: 'js前端实现模糊查询对于模糊查询，一般都是传关键字给后端，由后端来做。但是有时候一些轻量级的列表前端来做可以减少ajax请求，在一定程度上提高用户体验。废话不多...',
                    shortBody: 'js前端实现模糊查询对于模糊查询，一般都是传关键字给后端，由后端来做',
                    publishTime: '2019-04-03',
                    author: '惜缘',
                    thumUp: 2,
                    browser: 2,
                    catalog: '生活',
                },
                {
                    bg: `${require("../../common/images/6.jpg")}`, title: 'js前端实现模糊查询',
                    body: 'js前端实现模糊查询对于模糊查询，一般都是传关键字给后端，由后端来做。但是有时候一些轻量级的列表前端来做可以减少ajax请求，在一定程度上提高用户体验。废话不多...',
                    shortBody: 'js前端实现模糊查询对于模糊查询，一般都是传关键字给后端，由后端来做',
                    publishTime: '2019-04-03',
                    author: 'Luke',
                    thumUp: 2,
                    browser: 8,
                    catalog: '生活'
                },
                {
                    bg: `${require("../../common/images/7.jpg")}`, title: 'js前端实现模糊查询',
                    body: 'js前端实现模糊查询对于模糊查询，一般都是传关键字给后端，由后端来做。但是有时候一些轻量级的列表前端来做可以减少ajax请求，在一定程度上提高用户体验。废话不多...',
                    shortBody: 'js前端实现模糊查询对于模糊查询，一般都是传关键字给后端，由后端来做',
                    publishTime: '2019-04-03',
                    author: '惜缘',
                    thumUp: 2,
                    browser: 2,
                    catalog: '生活',
                },
                {
                    bg: `${require("../../common/images/6.jpg")}`, title: 'js前端实现模糊查询',
                    body: 'js前端实现模糊查询对于模糊查询，一般都是传关键字给后端，由后端来做。但是有时候一些轻量级的列表前端来做可以减少ajax请求，在一定程度上提高用户体验。废话不多...',
                    shortBody: 'js前端实现模糊查询对于模糊查询，一般都是传关键字给后端，由后端来做',
                    publishTime: '2019-04-03',
                    author: 'abc',
                    thumUp: 2,
                    browser: 2,
                    catalog: '生活',
                }]
        }
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
                            <h5 className="mt-0 mb-1">{article.title}</h5>
                            <p>{article.shortBody}</p>
                            <ul>
                                <li><a title={article.author + article.publishTime + '发表'}><i className="el-time"></i>{article.publishTime}</a></li>
                                <li className="d-none d-sm-none d-md-none d-lg-block"><a href="/index/article/index/id/32.html" title="查看分类"><i className="el-fire"></i>{article.catalog}</a></li>
                            </ul>
                        </div>
                    </li>
                )
            })
        )
    }
}

//标签云
class LabelCloud extends Component {
    constructor() {
        super();
        this.state = {
            hashTags: [
                {
                    name: '生活', count: 52
                },
                {
                    name: '模糊查询', count: 45
                },
                {
                    name: '遍历二维数组', count: 52
                },
                {
                    name: '一周每天的数据', count: 2
                },
            ]
        };
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

function Right() {
    return (
        <div className="col-md-4">
            <div className="container">
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
                                <li><strong>{visitInfo.today}</strong><span>今日访问量</span></li>
                                <li><strong>{visitInfo.week}</strong><span>本周访问量</span></li>
                                <li><strong>{visitInfo.month}</strong><span>本月访问量</span></li>
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
                                <Messages />
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
                        <a className="nav-item " id="nav-profile-tab" data-toggle="tab" href="#nav-profile" role="tab" aria-controls="nav-profile" aria-selected="false">文章排行</a>
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
                                <ArticleRank />
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
    );
}

export default Right