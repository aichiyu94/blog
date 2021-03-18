import React, { Component } from 'react'
import { fetchArticleList, recommendationArticle } from '../../api/article'
import { timeDiffer, timeFormat } from '../../utils/timeUtils'
import Right from './right.jsx'

class NewArticles extends Component {
    constructor() {
        super()
        this.state = {
            articles: []
        }
    }
    componentDidMount() {
        fetchArticleList(1, 5, r => {
            let articles = [];
            const { data }= r;
            for (const a of data) {
                articles.push({
                    id: a.id,
<<<<<<< HEAD:src/components/Main/technlogy.jsx
                    title: a.firstTitle,
                    cover: a.coverImage || `${require("../../images/9.jpg")}`,
=======
                    title: a.first_title,
                    cover: a.cover_image || "https://sm.ms/image/3o2sTFWLcrg4pbD",
>>>>>>> aac1f2b3b340b6fde91fb4b6d48f0f2d3295f085:src/components/Main/catalog.jsx
                    body: a.body,
                    modifyTime: new Date(a.modifyTime).toString('MM-dd'),
                    author: a.authorNickName,
                    thumbUp: a.thumbupCount,
                    browser: a.browswerCount,
                    catalog: a.catalog,
                    way: 'right'
                })
            }
            this.setState({
                articles: articles
            })
        })
    }

    render() {
        const right = "media wow bounceInRight";
        const left = "media wow bounceInLeft";
        return (
            this.state.articles.map((article, index) => {
                return (
                    <li className={article.way === 'right' ? right : left} key={index}>
                        <div className="art-img">
                            <img className="mr-3" src={article.cover} alt="Generic placeholder image" />
                        </div>
                        <div className="media-body art-content">
                            <h5 className="mt-0 mb-1"><a href={'/View?articleId=' + article.id}>{article.title}</a></h5>
                            <p>{article.title}</p>
                            <ul>
                                <li><a title={article.author + article.modifyTime + '发表'}><i className="el-time"></i>{article.modifyTime}</a></li>
                                <li className="d-none d-sm-none d-md-none d-lg-block"><a href="/index/about/index.html" title={'作者： ' + article.author}><i className="el-user"></i>{article.author}</a></li>
                                <li><a title={'已有' + article.thumbUp + '个赞'}><i className="el-heart"></i>{article.thumbUp}</a></li>
                                <li><a title={'已有' + article.browser + '次浏览'}><i className="el-eye-open"></i>{article.browser}</a></li>

                                <li className="d-none d-sm-none d-md-none d-lg-block"><a href="/index/article/index/id/32.html" title="查看分类"><i className="el-th-list"></i>{article.catalog}</a></li>
                            </ul>
                        </div>
                    </li>
                )
            })
        )
    }
}

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
            const { data }= r;
            for (const art of data) {
                const timeStr = timeFormat(new Date(art.modifyTime));
                recommdations.push({
                    id: art.id,
<<<<<<< HEAD:src/components/Main/technlogy.jsx
                    bg: art.coverImage || `${require('../../images/5.jpg')}`,
                    timeSpan: timeDiffer(new Date(art.modifyTime)),
                    firstTitle: art.firstTitle,
                    modifyTime: timeStr
=======
                    bg: art.cover_image,
                    timeSpan: timeDiffer(new Date(art.publishTime)),
                    first_title: art.first_title,
                    publishTime: timeStr
>>>>>>> aac1f2b3b340b6fde91fb4b6d48f0f2d3295f085:src/components/Main/catalog.jsx
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
                    <div className="col-md-4 bgc mb-4" key={idx}>
                        <div className="card  box-shadow mt-4">
                            <div className="showimg">
                                <img className="card-img-top" style={{ width: '100%', display: 'block' }} src={article.bg} data-holder-rendered="true" />
                            </div>
                            <div className="card-body">
                                <a href={'/View?articleId=' + article.id}>{article.title}</a>
                                <div className="d-flex justify-content-between align-items-center">
                                    <div className="btn-group showtitle">
                                        <i className="el-time"></i>{article.modifyTime}
                                    </div>
                                    <small className="text-muted">{article.timeSpan}</small>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })
        )
    }
}

class Catalog extends Component {
    constructor() {
        super()
    }

    render() {
        return (
            <div className="container mt-3">
                <div className="row">
                    <div className="col-md-8">
                        <div className="container">
                            <div className="row mt-2 wow fadeInDown">
                                <div className="col-md-12 bgc">
                                    <div className="new">
                                        <span><i className="el-certificate"></i></span>
                                        <span>最新文章</span>
                                        <small>New Article</small>
                                    </div>
                                </div>
                            </div>
                            <div className="row mt-2 ">
                                <ul className="list-unstyled art-list">
                                    {/* 图文 */}
                                    <NewArticles />
                                </ul>
                            </div>
                            <div className="row ">
                                <div className="col-md-12 bgc">
                                    <div className="new">
                                        <span><i className="el-certificate"></i>推荐图文</span>
                                        <small>New Article</small>
                                    </div>
                                </div>
                                <div className="container mt-4">
                                    <div className="row">
                                        {/* 推荐图文 */}
                                        <Recommendation />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* 右边的组件 */}
                    <Right />
                </div>
            </div>
        )
    }
}

export default Catalog