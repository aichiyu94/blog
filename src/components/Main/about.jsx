import React, { Component } from 'react'

import Right from '../Main/Right.jsx'
class About extends Component {
    constructor() {
        super()
    }

    render() {
        return (
            <div className="container mt-3">
                <div className="row">
                    <div className="col-md-8">
                        <div className="container">
                            <div className="row mt-2">
                                <div className="col-md-12 bgc">
                                    <div className="new">
                                        <span><i className="el el-info-circle"></i>关于本博客</span>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="about">
                                        <p>1.0版全新上线，付出总会有收获......</p>
                                    </div>
                                </div>
                            </div>
                            <div className="row mt-2">
                                <div className="col-md-12 bgc">
                                    <div className="new">
                                        <span><i className="el el-list-alt"></i>内心独白</span>
                                    </div>
                                </div>
                                <div className="about-content bgc">
                                    <p>个人简介：精通PHP技术开发，目前擅长ECOS、thinkPHP、Laravel、VMC等框架的开发，熟练Mootools、jQuery、Bootstrap、AJAX、javascript、Zepto、Html、CSS等前端页面技术和SEO网站优化技术，掌握Unix、Lunix等系统基本命令操作。.</p>
                                </div>
                            </div>
                            <div className="row mt-2">
                                <div className="col-md-12 bgc">
                                    <div className="new">
                                        <span><i className="el-certificate"></i>推荐图文</span>
                                        <small>New Article</small>
                                    </div>
                                </div>
                                <div className="container mt-4">
                                    <div className="row">
                                        <div className="col-md-4 bgc mb-4 ">
                                            <div className="card mb-4 box-shadow  mt-4">
                                                <div className="showimg">
                                                    <img className="card-img-top" style={{ width: '100%', display: 'block' }} src="images/7.jpg" data-holder-rendered="true" />
                                                </div>
                                                <div className="card-body">
                                                    <a href="#">测试图文</a>
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <div className="btn-group showtitle">
                                                            <i className="el-time"></i>2019-04-03
                                            </div>
                                                        <small className="text-muted"><i className="el-fire"></i>9 mins</small>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-4 bgc mb-4">
                                            <div className="card mb-4 box-shadow mt-4">
                                                <div className="showimg showtitle">
                                                    <img className="card-img-top" style={{ width: '100%', display: 'block' }} src="images/7.jpg" data-holder-rendered="true" />
                                                </div>
                                                <div className="card-body">
                                                    <a href="#">测试图文</a>
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <div className="btn-group showtitle">
                                                            <i className="el-time"></i>2019-04-03
                                            </div>
                                                        <small className="text-muted">9 mins</small>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-4 bgc mb-4">
                                            <div className="card  box-shadow mt-4">
                                                <div className="showimg">
                                                    <img className="card-img-top" style={{ width: '100%', display: 'block' }} src="https://sm.ms/image/3o2sTFWLcrg4pbD" data-holder-rendered="true" />
                                                </div>
                                                <div className="card-body">
                                                    <a href="#">测试图文</a>
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <div className="btn-group showtitle">
                                                            <i className="el-time"></i>2019-04-03
                                            </div>
                                                        <small className="text-muted">9 mins</small>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
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

export default About