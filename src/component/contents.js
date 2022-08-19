import React, { Component, Fragment } from 'react'
import RI from './right'
import TA from './table1'
import PubSub from 'pubsub-js'

export default class contents extends Component {

  

  render() {
 
    var type="数据建模";
    const t = 1; 

    function getdata() {
      let s = JSON.parse(JSON.stringify(t))
      PubSub.publish("save",{
        save:s
      })
      s++;
    }

    
    PubSub.subscribe("TableMsg",(_,tablemsg)=>{
      type = tablemsg.ty
      document.getElementById('t').innerHTML=type
      document.getElementById('ty').innerHTML=type+"系统"
    })
  
    
    return (
      <Fragment>
        <div className="row">
          <div className="col-md-12">
            <div className="card card-chart">
              <div className="card-header ">
                <div className="row">
                  <div className="col-sm-6 text-left">
                    <h5 className="card-category" id='t'>{type}</h5>
                    <h2 className="card-title" id='ty'>{type}系统</h2>
                  </div>
                  <div className="col-sm-6">
                    <div className="btn-group btn-group-toggle float-right" data-toggle="">
                      <label className="btn btn-sm btn-primary btn-simple" id="1">
                        <input type="radio" className="d-none d-sm-none" name="options"/>
                        <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block" onClick={getdata}>
                          保存
                        </span>
                        <span className="d-block d-sm-none">
                          <i className="tim-icons icon-gift-2"></i>
                        </span>
                      </label>
                    </div>
                    
                  </div>
                </div>
              </div>
              <div class="card-body">
                <div class="table-responsive ps">
                  <table class="table tablesorter " id="">
                    <TA></TA>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <RI></RI>
        </div>
      </Fragment>
    )
  }
}
