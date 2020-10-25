import React from 'react'

import { BrowserRouter as Router, Route } from 'react-router-dom'

import Home from './components/Main/home.jsx'
import Software from './components/Main/software.jsx'
import Picture from './components/Main/picture.jsx'
import About from './components/Main/about.jsx'
import Catalog from './components/Main/catalog.jsx'
import Life from './components/Main/life.jsx'
import View from './components/Main/viewArticle.jsx'

import Nav from './components/Nav/nav.jsx'
import Footer from './components/Footer/footer.jsx'

function router() {
    return (
        <div>
            <Nav />
            <Router>
                <Route exact path="/" component={Home}></Route>
                <Route exact path="/Software" component={Software}></Route>
                <Route exact path="/Picture" component={Picture}></Route>
                <Route exact path="/About" component={About}></Route>
                <Route exact path="/Catalog" component={Catalog}></Route>
                <Route exact path="/Life" component={Life}></Route>
                <Route exact path="/View" component={View}></Route>
            </Router>
            <Footer />
        </div>
    )
}

export default router