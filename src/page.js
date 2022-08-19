import React, { Component, Fragment } from 'react'
import Co from './component/contents'
import SI from './component/sidebar'
import NA from './component/navbar'
import RI from './component/right'

export default class page extends Component {
  render() {
    return (
      <Fragment>
          <div className="wrapper">
            <SI></SI>
            <div className="main-panel">
              <NA></NA>
              <div className="content">
                <Co></Co>
              </div>
            </div>
          </div>
      </Fragment>
    )
  }
}
