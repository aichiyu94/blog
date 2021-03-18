import React, { Component } from 'react'

import { fetchHotResourceList, fetchPictureDirectory, fetchPicturesByDir } from '../../api/resource'
import { timeDiffer, timeFormat } from '../../utils/timeUtils'

import Right from './right.jsx'

class PictureDirectory extends Component {
    constructor() {
        super();
        this.state = {
            albums: [],
            directories: [],
            accessDirectory: {
                Password: '',
                Dir: '',
                Width: 200,
                Height: 200,
            }
        }
    }
    componentDidMount() {
        fetchPictureDirectory(r => {
            const { data } = r;
            let directories = data;
            this.setState({
                directories: directories
            })

            let accessDirectory = this.state.accessDirectory;
            accessDirectory.Dir = directories[0].dir;
            fetchPicturesByDir(accessDirectory, r => {
                const { data } = r;
                let albums = [];
                if (data.length > 0) {
                    data.map(d => { albums.push(d) });
                }

                this.setState({
                    albums: albums
                })
            })
        });
    }
    render() {
        return (
            this.state.albums.map((item, idx) => (
                <div className="col-md-4 bgc mb-4 " key={idx}>
                    <div className="card mb-4 box-shadow  mt-4">
                        <div className="showimg">
                            <img className="card-img-top" style={{ width: '100%', display: 'block' }} src={item.base64Context} data-holder-rendered="true" />
                        </div>
                        <div className="card-body">
                            <a href="#">{item.name}</a>
                            <div className="body-cont" >
                                <span>{timeDiffer(new Date(item.uploadTime))}</span>
                            </div>
                        </div>
                    </div>
                </div >
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


class Picture extends Component {
    constructor() {
        super()
    }

    // data:image/jpeg;base64,

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
                                        <span>相册</span>
                                        <small>Photo Album</small>
                                    </div>
                                </div>
                            </div>
                            <div className="row mt-2 ">
                                <div className="container mt-4 wow bounceInDown" data-wow-duration="1s" data-wow-delay="0.5s">
                                    <div className="row">
                                        <PictureDirectory />
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

export default Picture