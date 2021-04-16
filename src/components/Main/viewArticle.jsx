import React, { Component } from 'react'
import Right from './right.jsx'

import { getArticle, recommendationArticle } from '../../api/article'
import { timeFormat, timeDiffer } from '../../utils/timeUtils'
import ReactMarkdown from "react-markdown"

class Recommendation extends Component {
    constructor() {
        super();
        this.state = {
            recommdations: []
        }
    }

    componentDidMount() {
        recommendationArticle(6, r => {
            let recommdations = []
            const { data } = r.data;
            for (const art of data) {
                const timeStr = timeFormat(new Date(art.modifyTime));
                recommdations.push({
                    cover: art.coverImage || `${require('../../images/default.png')}`,
                    firstTitle: art.firstTitle,
                    secondTitle: art.secondTitle,
                    modifyTime: timeStr,
                    timeSpan: timeDiffer(new Date(art.modifyTime))
                })
            }
            this.setState({
                recommdations: recommdations
            })
        });
    }

    render() {
        return (
            this.state.recommdations.map((item, idx) => {
                return (
                    <div className="col-md-4 bgc mb-4 " key={idx}>
                        <div className="card mb-4 box-shadow  mt-4">
                            <div className="showimg">
                                <img className="card-img-top" style={{ width: '100%', display: 'block' }} src={item.cover} data-holder-rendered="true" />
                            </div>

                            <div className="card-body">
                                <a href="#">{item.firstTitle}</a>
                                <div className="body-cont">
                                    <span>{item.secondTitle}</span>
                                </div>
                                <div className="d-flex justify-content-between align-items-center">
                                    <div className="btn-group showtitle">
                                        <i className="el-time"></i>{item.modifyTime}
                                    </div>
                                    <small className="text-muted"><i className="el-fire"></i>{item.timeSpan}</small>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })
        )
    }
}

class View extends Component {
    constructor(props) {
        super()
        this.state = {
            article: {
                id: ""
            }
        }
    }

    componentWillMount() {
        let article = this.state.article;
        article.id = this.props.location.search.split('=')[1]
        this.setState({
            article: article
        })
    }

    componentDidMount() {
        getArticle(this.state.article.id, r => {
            let a = r.data;
            a.modifyTime = timeFormat(a.modifyTime);
            this.setState({
                article: a
            })
        });
    }

    render() {
        document.title = this.state.article.firstTitle;
        let article = this.state.article;
        return (
            <div className="container mt-3">
                <div className="row">
                    <div className="col-md-8">
                        <div className="container">
                            <div className="row mt-2">
                                <div className="col-md-12 bgc">
                                    <div className="new">
                                        <span>{article.firstTitle}</span>
                                        {/* <small>New Article</small> */}
                                    </div>
                                </div>
                            </div>

                            <div className="row mt-2">
                                <div className="col-md-12 bgc">
                                    <div className="article-title">
                                        <ul>
                                            <li><a title={article.authorNickname + article.modifyTime + "发表"}><i className="el-time"></i>{article.modifyTime}</a></li>
                                            <li className="d-none d-sm-none d-md-none d-lg-block"><a href="/index/about/index.html" title={"作者： " + article.authorNickname}><i className="el-user"></i>{article.authorNickname}</a></li>
                                            <li><a title={'已有' + article.thumbupCount + '个赞'}><i className="el-heart"></i>{article.thumbupCount}</a></li>
                                            <li><a title={'已有' + article.browserCount + '次浏览'}><i className="el-eye-open"></i>{article.browserCount}</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div className="row mt-2 bgc">
                                <div className="article-body">
                                    {/* <div dangerouslySetInnerHTML={{ __html: article.body }}></div> */}
                                    <ReactMarkdown className="markdown-body">{article.body}</ReactMarkdown>
                                    <div className="row mt-2">
                                        <div className="col-md-12 bgc">
                                            <div className="new">
                                                <span><i className="el-certificate"></i>推荐图文</span>
                                                <small>New Article</small>
                                            </div>
                                        </div>

                                        <div className="container mt-4">
                                            <div className="row">
                                                <Recommendation />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* 右边 */}
                    <Right viewArticle={true} />
                </div>
            </div >

        )
    }
}
export default View