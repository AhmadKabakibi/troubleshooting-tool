import React, { Component } from 'react'
import './MainPage.css'
import logo from './logo.svg'

class MainPage extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {}

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
      </div>
    )
  }
}

export default MainPage
