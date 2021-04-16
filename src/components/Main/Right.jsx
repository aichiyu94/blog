import React, { Component } from 'react'

import { timeDiffer, timeFormat } from '../../utils/timeUtils'
import {
    getTags, recommendationArticle,
} from '../../api/article'
import { visitorRecords, getVisitors, getUserInfo } from '../../api/user'
import WebsiteNotice from './websiteNotice'
import WebsiteComment from './websiteComment'
import ArticleInteract from './articleInteract'
import ArticleBrowserRank from './articleBrowserRank'
import { connect } from 'react-redux'
import { GetUser } from "../../redux/actions/index";

var search = { key: '', history: [] }

//推荐
class Recommendation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            articles: []
        }
    }

    componentDidMount() {
        recommendationArticle({ top: 4 }, r => {
            let recommdations = []
            for (const art of r.data) {
                const timeStr = timeFormat(new Date(art.modifyTime));
                recommdations.push({
                    bg: art.coverImage,
                    timeSpan: timeDiffer(new Date(art.modifyTime)),
                    firstTitle: art.firstTitle,
                    secondTitle: art.secondTitle,
                    modifyTime: timeStr,
                    author: art.authorNickname,
                    thumbUp: art.thumbupCount,
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
                            <img className="mr-3" src={article.bg} style={{ width: '100px' }} alt="Generic placeholder image" />
                        </div>
                        <div className="media-body art-content">
                            <h5 className="mt-0 mb-1">{article.firstTitle}</h5>
                            <p>{article.secondTitle}</p>
                            <ul>
                                <li><a title={article.author + article.modifyTime + '发表'}><i className="el-time"></i>{article.modifyTime}</a></li>
                                <li className="d-none d-sm-none d-md-none d-lg-block"><a href="/index/article/index/id/32.html" title={'已有' + article.browser + '人查看'}><i className="el-fire"></i>{article.browser}</a></li>
                            </ul>
                        </div>
                    </li>
                )
            })
        )
    }
}

/**
 * 最新访客
 */
class LeastVisitors extends Component {
    constructor() {
        super()
        this.state = {
            visitors: []
        }
    }

    componentDidMount() {
        getVisitors(r => {
            const { data } = r;
            this.setState({
                visitors: data
            })
        });
    }

    render() {
        const showThis = (<div className="row bgc">
            <div className="new new-right">
                <span>访客</span>
                <small>Visitors</small>
            </div>
            <div className="col-md-12 ">
                <div className="fxtp">
                    <ul>
                        {
                            this.state.visitors.map((v, idx) => {
                                return <li key={idx}><a href=""></a><span>{v.nickname}</span></li>
                            })
                        }
                    </ul>
                </div>

            </div>
        </div >)

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
            const tagData = r.data;
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
    constructor(props) {
        super(props)

        this.state = {
            viewArticle: false,
            visitInfo: {},
        }
    }
    async componentDidMount() {
        if (!this.props.userInfo.nickname) {
            const { data } = await getUserInfo();
            this.props.getUser(data);
        }
        if (this.props.viewArticle) {
            this.setState({
                viewArticle: this.props.viewArticle
            })
        }

        //获取访问数据
        visitorRecords(r => {
            this.setState({
                visitInfo: r.data
            })
        });
    }
    render() {
        return (
            this.props.userInfo ?
                <div className="col-md-4">
                    <div className="container">
                        <LeastVisitors viewArticle={this.state.viewArticle} />
                        <div className="row bgc mt-5 right-author">
                            <div className="col-md-12 ">
                                <div className="auth-img">
                                    <img src={this.props.userInfo.avatar} alt="" />
                                </div>
                                <div className="auth-name">
                                    <span>{this.props.userInfo.nickname}</span>
                                    <p>{this.props.userInfo.description}</p>
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
                        <div className="row bgc mt-10">
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
                : <p></p>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        userInfo: state.CachedUser
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        /** dispatch parameter is a function which from action's method  */
        getUser: d => { dispatch(GetUser(d)) }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Right)