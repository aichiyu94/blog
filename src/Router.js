import React from 'react'

import { BrowserRouter as Router, Route } from 'react-router-dom'

import Home from './components/Main/home.jsx'
import Finance from './components/Main/finance.jsx'
import Picture from './components/Main/picture.jsx'
import About from './components/Main/about.jsx'
import Technlogy from './components/Main/technlogy.jsx'
import Resource from './components/Main/resource.jsx'
import View from './components/Main/viewArticle.jsx'

import Nav from './components/Nav/nav.jsx'
import Footer from './components/Footer/footer.jsx'

class AppRouter extends React.Component {
    render() {
        return (
            <div>
                <Nav />
                <Router>
                    <div style={{ paddingTop: '5rem' }}>
                        <Route exact path="/" component={Home}></Route>
                        <Route exact path="/Finance" component={Finance}></Route>
                        <Route exact path="/Picture" component={Picture}></Route>
                        <Route exact path="/About" component={About}></Route>
                        <Route exact path="/Technlogy" component={Technlogy}></Route>
                        <Route exact path="/Resource" component={Resource}></Route>
                        <Route exact path="/View" component={View}></Route>
                    </div>
                </Router>
                <Footer />
            </div >
        )
    }
}

export default AppRouter