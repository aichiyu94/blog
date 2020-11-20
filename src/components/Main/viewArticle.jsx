import React, { Component } from 'react'
import Right from './Right.jsx'

import { getArticle, recommendationArticle } from '../../api/article'
import { timeFormat, timeDiffer } from '../../utils/timeUtils'

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
            const result = r.message;
            for (const art of result) {
                const timeStr = timeFormat(new Date(art.publishTime));
                recommdations.push({
                    cover: art.cover_image,
                    first_title: art.first_title,
                    second_title: art.second_title,
                    publishTime: timeStr,
                    timeSpan: timeDiffer(new Date(art.publishTime))
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
                                <a href="#">{item.first_title}</a>
                                <div className="body-cont">
                                    <span>{item.second_title}</span>
                                </div>
                                <div className="d-flex justify-content-between align-items-center">
                                    <div className="btn-group showtitle">
                                        <i className="el-time"></i>{item.publishTime}
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
            let a = r.message;
            a.publishTime = timeFormat(a.publishTime);
            this.setState({
                article: a
            })
        });
    }

    render() {
        document.title = this.state.article.first_title
        return (
            <div className="container mt-3">
                <div className="row">
                    <div className="col-md-8">
                        <div className="container">
                            <div className="row mt-2">
                                <div className="col-md-12 bgc">
                                    <div className="new">
                                        <span>{this.state.article.first_title}</span>
                                        {/* <small>New Article</small> */}
                                    </div>
                                </div>
                            </div>

                            <div className="row mt-2">
                                <div className="col-md-12 bgc">
                                    <div className="article-title">
                                        <ul>
                                            <li><a title={this.state.article.authorNickName + this.state.article.publishTime + "发表"}><i className="el-time"></i>{this.state.article.publishTime}</a></li>
                                            <li className="d-none d-sm-none d-md-none d-lg-block"><a href="/index/about/index.html" title={"作者： " + this.state.article.authorNickName}><i className="el-user"></i>{this.state.article.authorNickName}</a></li>
                                            <li><a title={'已有' + this.state.article.thumbUp + '个赞'}><i className="el-heart"></i>{this.state.article.thumbUp}</a></li>
                                            <li><a title={'已有' + this.state.article.browser + '次浏览'}><i className="el-eye-open"></i>{this.state.article.browser}</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div className="row mt-2 bgc">
                                <div className="article-body">
                                    <div dangerouslySetInnerHTML={{ __html: this.state.article.body }}></div>
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