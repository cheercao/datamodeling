import React, { Fragment,useState,useEffect} from 'react'

import LI from './list'
import './right.css'
import axios from 'axios'

const Sidebar=()=> {
  

    const [notes,getNotes] = useState()
    let count = 0
    let testdata = []
  
    useEffect(() => {
     if(count === 0){
      count++;
      getAllNotes();
     }
    }, []);

    const putdata = (data,item,parentKey,value) =>{
      if(parentKey === 2){
        data.push({
          value: value,
          defaultValue:value,
          key: item.id, // 这个 key 应该是唯一的
          parentKey: parentKey,
          parentid:data.key,
          style:{backgroundColor:"#e14eca"},
          children:[{
            defaultValue:"概念模型",
            value: "概念模型",
            key: "data-CDM-"+item.id, // 这个 key 应该是唯一的
            parentKey:item.parentKey+1,
            style:{backgroundColor:"#e14eca"},
          },{
            defaultValue:"物理模型",
            value: "物理模型",
            key: "data-PDM-"+item.id, // 这个 key 应该是唯一的
            parentKey:item.parentKey+1,
            style:{backgroundColor:"#e14eca"},
          },{
            defaultValue:"逻辑模型",
            value: "逻辑模型",
            key: "data-LDM-"+item.id, // 这个 key 应该是唯一的
            parentKey:item.parentKey+1,
            style:{backgroundColor:"#e14eca"},
          },{
            defaultValue:"面向对象模型",
            value: "面向对象模型",
            key: "data-OOM-"+item.id, // 这个 key 应该是唯一的
            parentKey:item.parentKey+1,
            style:{backgroundColor:"#e14eca"},
          }]
        })
      }
      else{
        data.push({
          value: value,
          key: item.id, // 这个 key 应该是唯一的
          parentKey:parentKey,
          isEditable: false,
          defaultValue:value,
          parentid:data.key,
          style:{backgroundColor:"#e14eca"},
          children:[]
        })
      }
    }

    const getAllNotes = () =>{
      axios.get('http://121.4.32.77:8080/project').then(response => {
        var response = response.data
        response.data.forEach(i=>{
          putdata(testdata,i,0,i.projectName)
        })
        testdata.forEach(item => {
          getentity(item,item.children);
        })
      }).catch(error => {
        console.log(error)
      });
    }
    const getentity = (parent,x) =>{
      axios.get('http://121.4.32.77:8080/entity?projectId='+parent.key).then(response => {
        var response = response.data
        response.data.forEach(i=>{
          putdata(x,i,1,i.entityName)
        })
        x.forEach(item => {
          getfield(item,item.children);
        })
      }).catch(error => {
        console.log(error)
      });
    }
    const getfield = (parent,x) =>{
      axios.get('http://121.4.32.77:8080/field?entityId='+parent.key).then(response => {
        var response = response.data
        response.data.forEach(i=>{
          putdata(x,i,2,i.fieldName)
        })
        getNotes(testdata);
      }).catch(error => {
        console.log(error)
      });
    }
    return (
      <Fragment>
          <div className="sidebar">
            <div className="sidebar-wrapper ps">
                <div style={{ backgroundColor:'#e14eca',}}>
                  <LI notes = {notes} count = {count}></LI>
                </div>
              </div>
            </div>
      </Fragment>
    )
}
export default Sidebar;