// resources/assets/js/components/App.js

import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Header from './layout/Header'
import Footer from './layout/Footer'
import Slider from './layout/Slider'
import MenuLeft from './layout/MenuLeft'

class App extends Component {
  render () {
    return (
      <div>
        <Header />

        <Slider />

        <section>
          <div className="container">
            <div className="row">
              <MenuLeft />
              {this.props.children}
            </div>
          </div>
        </section>

        <Footer />
      </div>
    )
  }
}
export default App