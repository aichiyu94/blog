import React, { Component } from 'react'
import Right from './Right'
import { fetchArticleList } from '../../api/article'

class Carousel extends Component {
    constructor() {
        super();
        this.state = {
            images: [1, 2, 3]
        }
    }
    render() {
        return (
            this.state.images.map((item, idx) => (
                <div className={idx === 0 ? 'carousel-item active' : 'carousel-item'} key={idx}>
                    <img src={require('../../common/images/' + item + '.png')} className="d-block w-100" alt="..." />
                </div>
            ))
        )
    }
}

class NewArticles extends Component {
    constructor() {
        super()
        this.state = {
            articles: []
        }
    }
    componentDidMount() {
        debugger
        fetchArticleList(r => {
            let articles = [];
            const result = r.message;
            for (const art of result) {
                const a = art.article
                articles.push({
                    bg: `${require("../../common/images/9.jpg")}`,
                    title: a.title,
                    body: a.body,
                    publishTime: a.modifyTime,
                    author: a.authorNickName,
                    thumUp: a.browswerCount,
                    browser: a.browswerCount,
                    catalog: '技术',
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
                            <img className="mr-3" src={article.bg} alt="Generic placeholder image" />
                        </div>
                        <div className="media-body art-content">
                            <h5 className="mt-0 mb-1"><a href="./article.html">{article.title}</a></h5>
                            <p>
                                {/* <div dangerouslySetInnerHTML={ __html: article.body }/> */}
                                <div dangerouslySetInnerHTML={{ __html: '<div>123</div>' }}></div>
                            </p>
                            <ul>
                                <li><a title={article.author + article.publishTime + '发表'}><i className="el-time"></i>{article.publishTime}</a></li>
                                <li className="d-none d-sm-none d-md-none d-lg-block"><a href="/index/about/index.html" title={'作者： ' + article.author}><i className="el-user"></i>{article.author}</a></li>
                                <li><a title={'已有' + article.thumUp + '个赞'}><i className="el-heart"></i>{article.thumUp}</a></li>
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
            articles: [
                {
                    bg: `${require('../../common/images/5.jpg')}`, title: '测试图文',
                    publishTime: '2019-04-03', timeSpan: '9 mins'
                }, {
                    bg: `${require('../../common/images/6.jpg')}`, title: '测试图文',
                    publishTime: '2019-04-03', timeSpan: '8 mins'
                }, {
                    bg: `${require('../../common/images/10.jpg')}`, title: '测试图文',
                    publishTime: '2019-04-03', timeSpan: '3 mins'
                }, {
                    bg: `${require('../../common/images/12.png')}`, title: '测试图文',
                    publishTime: '2019-04-03', timeSpan: '5 mins'
                }
            ]
        }
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
                                <a href="#">{article.title}</a>
                                <div className="d-flex justify-content-between align-items-center">
                                    <div className="btn-group showtitle">
                                        <i className="el-time"></i>{article.publishTime}
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


function Home() {
    return (
        <div className="container mt-3">
            <div className="row">
                <div className="col-md-8">
                    <div className="container">
                        <div className="row wow fadeInDown">
                            <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
                                <ol className="carousel-indicators">
                                    <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                                    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                                    <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                                </ol>
                                <div className="carousel-inner">
                                    <Carousel />
                                </div>
                                <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span className="sr-only">Previous</span>
                                </a>
                                <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span className="sr-only">Next</span>
                                </a>
                            </div>
                        </div>

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
                                {/* 文章数据 */}
                                <NewArticles />
                            </ul>
                        </div>

                        <div className="row ">
                            <div className="col-md-12 bgc">
                                <div className="new">
                                    <span><i className="el-certificate"></i>推荐图文</span>
                                    <small>Hot Article</small>
                                </div>
                            </div>

                            <div className="container mt-4">
                                <div className="row">
                                    {/* 热点图文 */}
                                    <Recommendation />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/** 右边 */}
                <Right />
            </div>
        </div>
    )
}

export default Home