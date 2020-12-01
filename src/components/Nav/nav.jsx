import React, { Component } from 'react'
import { userVisit } from '../../api/user'

class Navigation extends Component {
    constructor() {
        super()
    }

    componentDidMount() {
        userVisit(r => {
            console.log(r)
        })
    }
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light nav-color-nav  navbar-lk text-dark">
                <div className="container">
                    <a className="navbar-brand xiyuan" href="#"><img src={require('../../common/images/logo-icon.png')} alt="" /></a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#nabmune" aria-controls="nabmune" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-end" id="nabmune">
                        <ul className="navbar-nav nav-color ">
                            <li className="nav-item active ">
                                <a className="nav-link" href="/">首页</a>
                                {/* <Router>
                                <Link className="nav-link" to="/home">首页</Link>
                            </Router> */}
                            </li>
                            <li className="nav-item ">
                                <a className="nav-link" href="/Software">软件</a>
                                {/* <Router>
                                <Link className="nav-link" to="/chat">说说</Link>
                            </Router> */}
                            </li>

                            <li className="nav-item dropdown ">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    分类
                    </a>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <a className="dropdown-item" href="/Catalog">php</a>
                                    <a className="dropdown-item" href="/Catalog">js</a>
                                    <div className="dropdown-divider"></div>
                                    <a className="dropdown-item" href="/Catalog">jq</a>
                                </div>
                            </li>
                            <li className="nav-item ">
                                <a className="nav-link" href="/Picture">相册</a>
                            </li>
                            <li className="nav-item ">
                                <a className="nav-link" href="/Life">理财</a>
                            </li>
                            <li className="nav-item ">
                                <a className="nav-link" href="/About">关于</a>
                            </li>
                        </ul>
                        {/* 搜索框 */}
                        {/* <form className="form-inline my-2 my-lg-0">
                        <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                    </form> */}
                    </div>
                </div>
            </nav>)
    }
}

export default Navigation