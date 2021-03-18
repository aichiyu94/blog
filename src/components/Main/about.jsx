import React, { Component } from 'react'
import { connect } from 'react-redux'

import Right from './right.jsx'
import { Modal, Button } from "antd";
class About extends Component {
    constructor(props) {
        super(props)
    }
    preViewResume = () => {
        alert('preview')
    }
    render() {
        return (
            <div className="container mt-3" >
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
                                    <p>{this.props.userInfo.description}</p>
                                </div>
                            </div>

                            <Button type="primary" shape="round" onClick={this.preViewResume} size={'large'}>
                                Preview
                            </Button>

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
        userInfo: state.CachedUser
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(About)