import React, { Component } from 'react'
import Right from './Right.jsx'

class Messages extends Component {
    constructor() {
        super();
        this.state = {
            messages: [{
                cover: 'http://img.juimg.com/tuku/yulantu/120421/107064-12042113493828.jpg',
                first_title: '测试图文',
                second_title: '个人博客模板，宽屏响应式个人博客模板，采用冷色系为主...',
                publishTime: '2019-04-03',
                timeSpan: '9 mins'
            },
            {
                cover: 'https://uploadfile.huiyi8.com/2014/0517/20140517053849606.jpg',
                first_title: '测试图文',
                second_title: '个人博客模板，宽屏响应式个人博客模板，采用冷色系为主...',
                publishTime: '2019-04-03',
                timeSpan: '9 mins'
            },
            {
                cover: 'http://img.juimg.com/tuku/yulantu/131224/328211-13122411032394.jpg',
                first_title: '测试图文',
                second_title: '个人博客模板，宽屏响应式个人博客模板，采用冷色系为主...',
                publishTime: '2019-04-03',
                timeSpan: '9 mins'
            },
            {
                cover: 'http://img.juimg.com/tuku/yulantu/120421/107064-12042113493828.jpg',
                first_title: '测试图文',
                second_title: '个人博客模板，宽屏响应式个人博客模板，采用冷色系为主...',
                publishTime: '2019-04-03',
                timeSpan: '9 mins'
            }]
        }
    }
    render() {
        return (
            this.state.messages.map((item, idx) => (
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
            ))
        )
    }
}

function Chat() {
    return (
        <div className="container mt-3">
            <div className="row">
                <div className="col-md-8">
                    <div className="container">
                        <div className="row mt-2">
                            <div className="col-md-12 bgc">
                                <div className="new">
                                    <span><i className="el-certificate"></i></span>
                                    <span>留言</span>
                                    <small>Messages</small>
                                </div>
                            </div>
                        </div>
                        <div className="row mt-2 ">
                            <div className="container mt-4 wow bounceInLeft" data-wow-duration="1s" data-wow-delay="0.5s">
                                <div className="row">
                                    <Messages />
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-12 bgc">
                                <div className="new">
                                    <span><i className="el-certificate"></i>推荐图文</span>
                                    <small>New Article</small>
                                </div>
                            </div>

                            <div className="container mt-4">
                                <div className="row">
                                    <Messages />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* 右边 */}
                <Right />
            </div>
        </div>
    )
}

export default Chat