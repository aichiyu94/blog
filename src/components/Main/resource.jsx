import React, { Component } from 'react'

import { fetchSoftwareResourceList, fetchHotResourceList } from '../../api/resource'
import { timeDiffer, timeFormat } from '../../utils/timeUtils'

import Right from './right.jsx'

class SoftwareList extends Component {
    constructor() {
        super();
        this.state = {
            software: [],
        }
    }
    componentDidMount() {
        fetchSoftwareResourceList(r => {
            const { data } = r;
            let softwares = [];
            for (const s of data) {
                softwares.push({
                    cover: s.mainPicture,
                    name: s.name,
                    description: s.description,
                    modifyTime: timeFormat(new Date(s.updateTime)),
                    timeSpan: timeDiffer(new Date(s.updateTime)),
                })
            }
            this.setState({
                software: softwares
            })
        });
    }
    render() {
        return (
            this.state.software.map((item, idx) => (
                <div className="col-md-4 bgc mb-4 " key={idx}>
                    <div className="card mb-4 box-shadow  mt-4">
                        <div className="showimg">
                            <img className="card-img-top" style={{ width: '100%', display: 'block' }} src={item.cover} data-holder-rendered="true" />
                        </div>
                        <div className="card-body">
                            <a href="#">{item.name}</a>
                            <div className="body-cont">
                                <span>{item.description}</span>
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
            ))
        )
    }
}

class RecommendationSoftware extends Component {
    constructor() {
        super();
        this.state = {
            hot: []
        }
    }
    componentDidMount() {
        fetchHotResourceList(r => {
            const { data } = r;
            let hot = [];
            for (const s of data) {
                hot.push({
                    cover: s.mainPicture,
                    name: s.name,
                    description: s.description,
                    modifyTime: timeFormat(new Date(s.updateTime)),
                    timeSpan: timeDiffer(new Date(s.updateTime)),
                })
            }
            this.setState({
                hot: hot
            })
        });
    }
    render() {
        return (
            this.state.hot.map((item, idx) => (
                <div className="col-md-4 bgc mb-4 " key={idx}>
                    <div className="card mb-4 box-shadow  mt-4">
                        <div className="showimg">
                            <img className="card-img-top" style={{ width: '100%', display: 'block' }} src={item.cover} data-holder-rendered="true" />
                        </div>

                        <div className="card-body">
                            <a href="#">{item.name}</a>
                            <div className="body-cont">
                                <span>{item.description}</span>
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
            ))
        )
    }
}


class Resources extends Component {
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
                                        <span><i className="el-certificate"></i></span>
                                        <span>软件资源</span>
                                        <small>Software resources</small>
                                    </div>
                                </div>
                            </div>
                            <div className="row mt-2 ">
                                <div className="container mt-4 wow bounceInDown" data-wow-duration="1s" data-wow-delay="0.5s">
                                    <div className="row">
                                        <SoftwareList />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12 bgc">
                                    <div className="new">
                                        <span><i className="el-certificate"></i>热门资源</span>
                                        <small>Hot resources</small>
                                    </div>
                                </div>
                                <div className="container mt-4">
                                    <div className="row">
                                        <RecommendationSoftware />
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

export default Resources