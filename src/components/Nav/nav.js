import React from 'react'
// import { Link } from 'react-router-dom'

function Navigation() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light nav-color-nav  navbar-lk text-dark">
            <div className="container">
                <a className="navbar-brand xiyuan" href="#"><img src="images/logo2.png" alt="" /></a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#nabmune" aria-controls="nabmune" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-end" id="nabmune">
                    <ul className="navbar-nav nav-color ">
                        <li className="nav-item active ">
                            {/* <Link className="nav-link" to={{ path: 'home', state: {} }}></Link> */}
                            <a className="nav-link" href="index.html">首页 <span className="sr-only">(current)</span></a>
                        </li>
                        <li className="nav-item ">
                            {/* <Link className="nav-link" to="/chat">说说</Link> */}
                            <a className="nav-link" href="chat.html">说说</a>
                        </li>

                        <li className="nav-item dropdown ">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                分类
                    </a>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <a className="dropdown-item" href="category.html">php</a>
                                <a className="dropdown-item" href="category.html">js</a>
                                <div className="dropdown-divider"></div>
                                <a className="dropdown-item" href="category.html">jq</a>
                            </div>
                        </li>
                        <li className="nav-item ">
                            <a className="nav-link" href="picture.html">相册</a>
                        </li>
                        <li className="nav-item ">
                            <a className="nav-link" href="life.html">生活</a>
                        </li>
                        <li className="nav-item ">
                            <a className="nav-link" href="chat.html">心得</a>
                        </li>
                        <li className="nav-item ">
                            <a className="nav-link" href="about.html">关于</a>
                        </li>
                    </ul>
                    <form className="form-inline my-2 my-lg-0">
                        <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                    </form>
                </div>
            </div>
        </nav>)
}

export default Navigation