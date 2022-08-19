import React, { Component, Fragment } from 'react'

export default class navbar extends Component {
  render() {
    return (
      <Fragment>
          <nav className="navbar navbar-expand-lg navbar-absolute navbar-transparent">
                <div className="container-fluid">
                  <div className="navbar-wrapper">
                    <div className="navbar-toggle d-inline">
                      <button type="button" className="navbar-toggler">
                        <span className="navbar-toggler-bar bar1"></span>
                        <span className="navbar-toggler-bar bar2"></span>
                        <span className="navbar-toggler-bar bar3"></span>
                      </button>
                    </div>
                    <a className="navbar-brand" href={undefined}>数据建模系统</a>
                  </div>
                  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navigation" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-bar navbar-kebab"></span>
                    <span className="navbar-toggler-bar navbar-kebab"></span>
                    <span className="navbar-toggler-bar navbar-kebab"></span>
                  </button>
                  <div className="collapse navbar-collapse" id="navigation">
                    <ul className="navbar-nav ml-auto">
                      <li className="search-bar input-group">
                        
                      </li>
                      
                      <li className="separator d-lg-none"></li>
                    </ul>
                  </div>
                </div>
              </nav>
      </Fragment>
    )
  }
}
