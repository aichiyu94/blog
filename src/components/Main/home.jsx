import React, { Component } from 'react'
import Right from './Right.jsx'
import { fetchArticleList, recommendationArticle } from '../../api/article'
import { timeDiffer, timeFormat } from '../../utils/timeUtils'

// import { BrowserRouter as Router, Link } from 'react-router-dom';

class Carousel extends Component {
    constructor() {
        super();
        this.state = {
            images: [
                'http://img.juimg.com/tuku/yulantu/120421/107064-12042113493828.jpg',
                'https://uploadfile.huiyi8.com/2014/0517/20140517053849606.jpg',
                'http://img.juimg.com/tuku/yulantu/131224/328211-13122411032394.jpg']
        }
    }
    render() {
        return (
            this.state.images.map((item, idx) => (
                <div className={idx === 0 ? 'carousel-item active' : 'carousel-item'} key={idx}>
                    <img src={item} className="d-block w-100" alt="..." />
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
        fetchArticleList(0, 5, r => {
            let articles = [];
            const result = r.message;
            for (const a of result) {
                articles.push({
                    id: a.id,
                    title: a.first_title,
                    cover: a.cover_image || "https://sm.ms/image/3o2sTFWLcrg4pbD",
                    body: a.body,
                    publishTime: new Date(a.publishTime).toString('MM-dd'),
                    author: a.authorNickName,
                    thumbUp: a.thumbUpCount,
                    browser: a.browserCount,
                    catalog: a.tags.indexOf(',') > -1 ? a.tags.split(',')[0] : a.tags || '技术',
                    way: Math.round(Math.random()) === 0 ? 'right' : 'left'
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
                            <h5 className="mt-0 mb-1">
                                <a href={'/View?articleId=' + article.id}>{article.title}</a>
                            </h5>
                            <p>
                                {article.title}
                            </p>
                            <ul>
                                <li><a title={article.author + article.publishTime + '发表'}><i className="el-time"></i>{article.publishTime}</a></li>
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
                    id: art.id,
                    bg: art.cover_image,
                    title: art.second_title,
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
            this.state.recommdations.map((article, idx) => {
                return (
                    <div className="col-md-4 bgc mb-4" key={idx}>
                        <div className="card  box-shadow mt-4">
                            <div className="showimg">
                                <img className="card-img-top" style={{ width: '100%', height:'150px', display: 'block' }} src={article.bg} data-holder-rendered="true" />
                            </div>
                            <div className="card-body">
                                <a href={'/View?articleId=' + article.id}>{article.title}</a>
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
                                <ol className="carousel-indicators" >
                                    <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                                    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                                    <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                                </ol>
                                <div className="carousel-inner" style={{ height :350+'px'}}>
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