import React, { Component } from 'react'
import Right from './right.jsx'
import { fetchArticleList, recommendationArticle } from '../../api/article'
import { getBanners } from '../../api/user'
import { timeDiffer, timeFormat } from '../../utils/timeUtils'

import { Pagination, Spin, Space } from 'antd';

import { connect } from 'react-redux'

class NewArticles extends Component {
    constructor() {
        super()
        this.state = {
            articles: [],
            pagination: {
                pageIndex: 1,
                pageSize: 10,
                totalPage: 0,
                totalCount: 0,
            }
        }
    }
    nextPage = async () => {
        let { data, pagination } = await (await fetchArticleList(this.state.pagination)).data;
        let articles = [];
        if (data.length <= 0)
            return;
        for (const a of data) {
            if (!a.tags)
                a.tags = '';
            articles.push({
                id: a.id,
                title: a.firstTitle,
                cover: a.coverImage || `${require("../../images/9.jpg")}`,
                body: a.body,
                modifyTime: new Date(a.modifyTime).toString('MM-dd'),
                author: a.authorNickname,
                thumbUp: a.thumbupCount,
                browser: a.browserCount,
                catalog: a.tags.indexOf(',') > -1 ? a.tags.split(',')[0] : a.tags || '技术',
                way: Math.round(Math.random()) === 0 ? 'right' : 'left'
            })
        }
        this.setState({
            articles: articles,
            pagination: pagination
        })
    }

    onChange = (current) => {
        let pagination = this.state.pagination;
        pagination.pageIndex = current;
        this.setState({
            pagination: pagination
        })

        this.nextPage();
    }

    async componentDidMount() {
        await this.nextPage();
    }

    render() {
        const right = "media wow bounceInRight";
        const left = "media wow bounceInLeft";

        if (this.state.articles.length <= 0) {
            return <Space className="MainSpin" size="middle"><Spin size="large" /></Space>
        }
        else {
            return <ul className="list-unstyled art-list">
                {
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
                                        <li><a title={article.author + article.modifyTime + '发表'}><i className="el-time"></i>{article.modifyTime}</a></li>
                                        <li className="d-none d-sm-none d-md-none d-lg-block" ><a href="/index/about/index.html" title={'作者： ' + article.author}><i className="el-user"></i>{article.author}</a></li>
                                        <li><a title={'已有' + article.thumbUp + '个赞'}><i className="el-heart"></i>{article.thumbUp}</a></li>
                                        <li><a title={'已有' + article.browser + '次浏览'}><i className="el-eye-open"></i>{article.browser}</a></li>
                                        <li className="d-none d-sm-none d-md-none d-lg-block"><a href="/index/article/index/id/32.html" title="查看分类">{article.catalog} <i className="el-th-list"></i></a></li>
                                    </ul>
                                </div>
                            </li>
                        )
                    })
                }
                <Pagination onChange={this.onChange}
                    showQuickJumper
                    pageSize={this.state.pagination.pageSize}
                    defaultCurrent={1} total={this.state.pagination.totalCount} />
            </ul>
        }
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
            const { data } = r.data;
            for (const art of data) {
                const timeStr = timeFormat(new Date(art.modifyTime));
                recommdations.push({
                    id: art.id,
                    bg: art.coverImage || `${require('../../images/5.jpg')}`,
                    title: art.firstTitle,
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
            this.state.recommdations.map((article, idx) => {
                return (
                    <div className="col-md-4 bgc mb-4" key={idx}>
                        <div className="card  box-shadow mt-4">
                            <div className="showimg">
                                <img className="card-img-top" style={{ width: '100%', height: '200px', display: 'block' }} src={article.bg} data-holder-rendered="true" />
                            </div>
                            <div className="card-body">
                                <a href={'/View?title=' + article.title}>{article.title}</a>
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


class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            bannerImages: []
        };
    }
    componentDidMount() {
        getBanners(r => {
            const { data } = r;
            this.setState({
                bannerImages: data
            })
        });
    }
    render() {
        return (
            <div className="container mt-3" >
                <div className="row">
                    <div className="col-md-8">
                        <div className="container">
                            <div className="row wow fadeInDown" >
                                <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
                                    <ol className="carousel-indicators">
                                        <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                                        <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                                        <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                                    </ol>
                                    <div className="carousel-inner"  >
                                        {
                                            this.state.bannerImages.length <= 0 ?
                                                <Space className="MainSpin" size="middle"><Spin size="large" /></Space> :
                                                this.state.bannerImages.map((item, idx) => (
                                                    <div className={idx === 0 ? 'carousel-item active' : 'carousel-item'} key={idx} >
                                                        <img src={item.base64Context} onClick={() => { window.open(item.redirectTo) }} className="d-block w-100" alt="..." />
                                                    </div>
                                                ))
                                        }
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
                                {/* 文章数据 */}
                                <NewArticles />
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
            </div >
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
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
