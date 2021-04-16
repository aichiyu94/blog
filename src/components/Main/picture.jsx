import React, { Component } from 'react'
import { connect } from 'react-redux'

import { fetchHotResourceList, fetchPictureDirectory, fetchPicturesByDir } from '../../api/resource'
import { timeDiffer, timeFormat } from '../../utils/timeUtils'
import { Image, Pagination, Space, Spin, Tabs, Modal, Input, Empty } from 'antd'
import { encrypt } from '../../utils/cryptoJS'
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Player } from "video-react";
import "video-react/dist/video-react.css";

import Right from './right.jsx'

class PictureDirectory extends Component {
    constructor() {
        super();
        this.state = {
            albums: [],
            dialogEnterPwd: false,
            enteredPwd: "",
            directories: [],
            albumsLoading: false,
            accessDirectory: {
                Password: '',
                Dir: '',
                Height: 600,
                Width: 800,
                Pagination: {
                    pageIndex: 1,
                    pageSize: 9
                }
            }
        }
    }
    async componentDidMount() {
        fetchPictureDirectory(async r => {
            const { data } = r;
            let directories = data;
            this.setState({
                directories: directories
            })

            let albums = [];
            this.setState({
                albums: albums,
                accessDirectory: this.state.accessDirectory
            })

            let accessDirectory = this.state.accessDirectory;
            accessDirectory.Dir = directories[0].dir;
            accessDirectory.Password = directories[0].password;
            if (accessDirectory.Password) {
                this.setState({
                    dialogEnterPwd: true
                })
                return;
            }
            const result = (await fetchPicturesByDir(accessDirectory));
            if (!result.data) {
                alert(result.message);
                return;
            }
            if (result.data.length > 0) {
                result.data.map(d => { albums.push(d) });
            }
            let Dir = this.state.accessDirectory;
            Dir.Pagination = result.pagination;
            this.setState({
                albums: albums,
                accessDirectory: Dir
            })
        });
    }


    nextPage = async () => {
        let accessDirectory = this.state.accessDirectory;
        const result = await fetchPicturesByDir(accessDirectory);
        if (!result.data) {
            alert(result.message);
            this.setState({
                albumsLoading: false
            })
            return;
        }
        const { data, pagination } = result.data;
        let albums = [];
        if (data.length > 0) {
            data.map(d => { albums.push(d) });
        }
        let Dir = this.state.accessDirectory;
        Dir.Pagination = pagination;
        this.setState({
            albums: albums,
            accessDirectory: Dir,
            albumsLoading: false
        })
    }

    onPageIndexChange = async (current) => {
        let dir = this.state.accessDirectory;
        dir.Pagination.pageIndex = current;
        this.setState({
            accessDirectory: dir,
            albumsLoading: true
        });

        await this.nextPage();
    }

    onShowSizeChange = (current, size) => {
        let dir = this.state.accessDirectory;
        dir.Pagination.pageSize = size;
        this.setState({
            accessDirectory: dir
        })

        this.nextPage();
    }

    tabChange = async (idx) => {
        const selectedDir = this.state.directories[idx];
        let dir = this.state.accessDirectory;
        dir.Dir = selectedDir.dir;
        if (selectedDir.password)
            this.setState({
                dialogEnterPwd: true,
                accessDirectory: dir
            })
        else
            await this.nextPage();
    }

    confirmedPwd = async () => {
        if (!this.state.enteredPwd)
            return;
        this.setState({
            dialogEnterPwd: false,
            albumsLoading: true
        })

        let dir = this.state.accessDirectory;
        dir.Password = encrypt(this.state.enteredPwd);
        this.setState({
            accessDirectory: dir
        })

        await this.nextPage();
    }

    render() {
        const { TabPane } = Tabs;
        const pwdVisible = false;
        return (
            <Space>
                <Modal title="相册需要输入密码" visible={this.state.dialogEnterPwd} onOk={() => { this.confirmedPwd() }} onCancel={() => {
                    this.setState({
                        dialogEnterPwd: false
                    })
                }}>
                    <Input.Password
                        placeholder="input password"
                        onChange={(e) => { this.setState({ enteredPwd: e.target.value }) }}
                        iconRender={pwdVisible => (pwdVisible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                    />
                </Modal>
                <Tabs defaultActiveKey={0} onChange={this.tabChange} style={{ alignContent: 'center' }}>
                    {
                        this.state.directories.map((folder, idx) => {
                            return <TabPane tab={folder.dir} key={idx}>
                                <Image.PreviewGroup style={{ width: '900px' }}>
                                    {
                                        this.state.albumsLoading ?
                                            <Space className="MainSpin" size="middle"><Spin size="large" /></Space> :
                                            this.state.albums.length === 0 ? <Empty /> :
                                                this.state.albums.map((item, idx) => (
                                                    <div style={{ textAlign: 'center', margin: '15px', display: 'inline-block' }} key={idx}>
                                                        {
                                                            item.name.indexOf(".mov") > -1 ?
                                                                <Player width={200} fluid={false}>
                                                                    <source src={item.base64Context} />
                                                                </Player> :
                                                                <Image key={idx}
                                                                    width={200}
                                                                    src={item.base64Context}
                                                                />
                                                        }
                                                        <center>{item.name}</center>
                                                    </div>
                                                ))
                                    }
                                    <br />
                                    {
                                        this.state.albums.length === 0 ? <span /> :
                                            <Pagination onShowSizeChange={this.onShowSizeChange} onChange={this.onPageIndexChange}
                                                showQuickJumper size="small"
                                                showTotal={() => { return 'total: ' + this.state.accessDirectory.Pagination.totalCount }}
                                                pageSize={this.state.accessDirectory.Pagination.pageSize}
                                                defaultCurrent={1} total={this.state.accessDirectory.Pagination.totalCount} />
                                    }
                                </Image.PreviewGroup>
                            </TabPane>
                        })
                    }
                </Tabs>
            </Space >
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

const mapStateToProps = (state) => {
    return {
        dialogEnterPwd: state.dialogEnterPwd,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Picture)