import React, { Component } from 'react'
import { connect } from 'react-redux'
import { userVisit } from '../../api/user'

class Navigation extends Component {
    constructor() {
        super()
    }
    componentDidMount() {
        userVisit(r => {
            console.log('Thank you for visiting our blog')
        })
    }
    render() {
        document.title = this.props.userInfo.nickname;
        return (
            <nav className="navbar navbar-expand-lg navbar-light nav-color-nav  navbar-lk text-dark">
                <div className="container" >
                    <a className="navbar-brand xiyuan" href=""><img src={require('../../images/logo-icon.png')} alt="" /></a>
                    {this.props.userInfo.nickname}
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#nabmune" aria-controls="nabmune" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"> </span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-end" id="nabmune">
                        <ul className="navbar-nav nav-color ">
                            <li className="nav-item active ">
                                <a className="nav-link" href="/">首页</a>
                            </li>
                            <li className="nav-item ">
                                <a className="nav-link" href="/Finance">理财</a>
                            </li>

                            <li className="nav-item dropdown ">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    技术
                    </a>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <a className="dropdown-item" href="/Technlogy">前端</a>
                                    <div className="dropdown-divider"></div>
                                    <a className="dropdown-item" href="/Technlogy">后端</a>
                                </div>
                            </li>
                            <li className="nav-item ">
                                <a className="nav-link" href="/Picture">相册</a>
                            </li>
                            <li className="nav-item ">
                                <a className="nav-link" href="/Resource">软件资源</a>
                            </li>
                            <li className="nav-item ">
                                <a className="nav-link" href="/About">关于</a>
                            </li>
                        </ul>
                        {/* 搜索框 */}
                        <form className="form-inline my-2 my-lg-0">
                            <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                        </form>
                    </div>
                </div>
            </nav>)
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

export default connect(mapStateToProps, mapDispatchToProps)(Navigation)