import React, { Component } from 'react'
import "./App.less"
import Page from './page'
import axios from 'axios'
import { trackPromise } from 'react-promise-tracker'
import PubSub from 'pubsub-js'

export default class App extends Component {

  render() {
    return (
      <div className="App">
        <Page></Page>
      </div>
    )
  }
}
