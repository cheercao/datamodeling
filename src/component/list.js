import 'antd/dist/antd.css';
import "./list.css"
import React, { useState,useEffect} from "react";
import PubSub from 'pubsub-js';
import axios from 'axios';


import { Tree, Button, Popover } from "antd";
import {
  CloseOutlined,
  CheckOutlined,
  MoreOutlined,
  DownOutlined,
  AlignCenterOutlined,
} from "@ant-design/icons";

import {nanoid} from "nanoid";


const { TreeNode } = Tree;
let treeData = [
];

const expandedKeyArr = ["0"];
const CDM=[
  {
    key: '0',
    name: '数据类型',
    content1: '',
    content2: '',
    content3: '',
    content4: '',
    content5: '',
    content6: '',
    content7: '',
    content8: '',
    content9: '',
  },
  {
    key: '1',
    name: '字段长度',
    content1: '',
    content2: '',
    content3: '',
    content4: '',
    content5: '',
    content6: '',
    content7: '',
    content8: '',
    content9: '',
  },
];
const LDM=[
  {
    key: '0',
    name: '是否逻辑外键',
    content1: '',
    content2: '',
    content3: '',
    content4: '',
    content5: '',
    content6: '',
    content7: '',
    content8: '',
    content9: '',
  },
  {
    key: '1',
    name: '是否逻辑唯一',
    content1: '',
    content2: '',
    content3: '',
    content4: '',
    content5: '',
    content6: '',
    content7: '',
    content8: '',
    content9: '',
  },
  {
    key: '2',
    name: '是否排序字段',
    content1: '',
    content2: '',
    content3: '',
    content4: '',
    content5: '',
    content6: '',
    content7: '',
    content8: '',
    content9: '',
  },
  {
    key: '3',
    name: '是否搜索字段',
    content1: '',
    content2: '',
    content3: '',
    content4: '',
    content5: '',
    content6: '',
    content7: '',
    content8: '',
    content9: '',
  },
  {
    key: '4',
    name: '搜索方式',
    content1: '',
    content2: '',
    content3: '',
    content4: '',
    content5: '',
    content6: '',
    content7: '',
    content8: '',
    content9: '',
  },
];
const PDM=[
  {
    key: '0',
    name: '列名',
    content1: '',
    content2: '',
    content3: '',
    content4: '',
    content5: '',
    content6: '',
    content7: '',
    content8: '',
    content9: '',
  },
  {
    key: '1',
    name: '是否主键',
    content1: '',
    content2: '',
    content3: '',
    content4: '',
    content5: '',
    content6: '',
    content7: '',
    content8: '',
    content9: '',
  },
  {
    key: '2',
    name: '数据类型',
    content1: '',
    content2: '',
    content3: '',
    content4: '',
    content5: '',
    content6: '',
    content7: '',
    content8: '',
    content9: '',
  },
  {
    key: '3',
    name: '数据长度',
    content1: '',
    content2: '',
    content3: '',
    content4: '',
    content5: '',
    content6: '',
    content7: '',
    content8: '',
    content9: '',
  },
  {
    key: '4',
    name: '数据精度',
    content1: '',
    content2: '',
    content3: '',
    content4: '',
    content5: '',
    content6: '',
    content7: '',
    content8: '',
    content9: '',
  },
  {
    key: '5',
    name: '是否物理外键',
    content1: '',
    content2: '',
    content3: '',
    content4: '',
    content5: '',
    content6: '',
    content7: '',
    content8: '',
    content9: '',
  },
  {
    key: '6',
    name: '是否物理唯一',
    content1: '',
    content2: '',
    content3: '',
    content4: '',
    content5: '',
    content6: '',
    content7: '',
    content8: '',
    content9: '',
  },
  {
    key: '7',
    name: '是否非空',
    content1: '',
    content2: '',
    content3: '',
    content4: '',
    content5: '',
    content6: '',
    content7: '',
    content8: '',
    content9: '',
  },
  {
    key: '8',
    name: '默认值',
    content1: '',
    content2: '',
    content3: '',
    content4: '',
    content5: '',
    content6: '',
    content7: '',
    content8: '',
    content9: '',
  },
];
const OOM=[
  {
    key: '0',
    name: '是否新增（必填）',
    content1: '',
    content2: '',
    content3: '',
    content4: '',
    content5: '',
    content6: '',
    content7: '',
    content8: '',
    content9: '',
  },
  {
    key: '1',
    name: '是否更新（必填）',
    content1: '',
    content2: '',
    content3: '',
    content4: '',
    content5: '',
    content6: '',
    content7: '',
    content8: '',
    content9: '',
  },
  {
    key: '2',
    name: '是否删除（必填）',
    content1: '',
    content2: '',
    content3: '',
    content4: '',
    content5: '',
    content6: '',
    content7: '',
    content8: '',
    content9: '',
  },
  {
    key: '3',
    name: '是否查询（必填）',
    content1: '',
    content2: '',
    content3: '',
    content4: '',
    content5: '',
    content6: '',
    content7: '',
    content8: '',
    content9: '',
  },
  {
    key: '4',
    name: '是否枚举',
    content1: '',
    content2: '',
    content3: '',
    content4: '',
    content5: '',
    content6: '',
    content7: '',
    content8: '',
    content9: '',
  },
  {
    key: '5',
    name: '关联进度',
    content1: '',
    content2: '',
    content3: '',
    content4: '',
    content5: '',
    content6: '',
    content7: '',
    content8: '',
    content9: '',
  },
  {
    key: '6',
    name: '是否关联进度变为X',
    content1: '',
    content2: '',
    content3: '',
    content4: '',
    content5: '',
    content6: '',
    content7: '',
    content8: '',
    content9: '',
  },
];
var flag = "true";
var cont = 0;

export default function TreeDemo(props) {
  
  let [data, setData] = useState(treeData);
  let count = 0;
  const [expandedKeys, setExpandedKeys] = useState(expandedKeyArr);
  if(props.length ===0){
    return <p>正在加载</p>
  }
  if(props.notes!=undefined&&count===0){
    count++;
    if(data.length === 0){
      treeData = props.notes
      setData(treeData.slice())
    }
  }

  const onExpand = (expandedKeys) => {
    //记录折叠的key值
    setExpandedKeys(expandedKeys);
  };
  const renderTreeNodes = (data) => {
    let nodeArr = data.map((item) => {
      if (item.isEditable) {
        item.title = (
          <div>
            <input defaultValue={item.value ||'请输入'} onChange={(e) => onChange(e, item.key)} style={{width:"70px"}}/>

            <CloseOutlined
              style={{ marginLeft: 10 }}
              onClick={() => onClose(item.key, item.defaultValue)}
            />

            <CheckOutlined
              style={{ marginLeft: 10 }}
              onClick={() => onSave(item.key)}
            />
          </div>
        );
      } else {
        item.title = (
          <div>
            <span>{item.value}</span>
            <span>
            <Popover
                 content={
                    <span>
                        {item.parentKey === 3 || item.parentKey === 2? null : (
                          <div
                          style={{ marginLeft: 10 ,cursor:"pointer"}}
                          onClick={() => onAdd(item.key)}
                          >
                              增加
                          </div>
                        )}
                        <div
                            style={{ marginLeft: 10,cursor:"pointer" }}
                            onClick={() => onDelete(item.key)}
                            >
                            删除
                        </div>

                        <div
                        style={{ marginLeft: 10 ,cursor:"pointer"}}
                        onClick={() => onEdit(item.key)}
                        >
                            修改
                        </div>
                        {item.parentKey === 1 ? (
                          <div
                          style={{ marginLeft: 10 ,cursor:"pointer"}}
                          onClick={() => exports(item)}
                          >
                              导出
                          </div>
                        ):null}
                    </span>
                  }
                            placement="bottom"
                            title=""
                            trigger="click"
                            >
                            <MoreOutlined style={{height:"24px",width:"24px"}}/>
                        </Popover>
                        </span>
          </div>
        );
      }

      if (item.children) {
        return (
          <TreeNode title={item.title} key={item.key} dataRef={item}>
            {renderTreeNodes(item.children)}
          </TreeNode>
        );
      }

      return <TreeNode title={item.title} key={item.key} />;
    });

    return nodeArr;
  };


  const exports = (item) =>{
    let url = 'http://121.4.32.77:8080/entity/'+item.key+'/ds_docs'
    window.open(url)
  }

  const onAdd = (key) => {
    if (expandedKeys.indexOf(key) === -1) {
      expandedKeyArr.push(key);
    }
    setExpandedKeys(expandedKeyArr.slice());

    addNode(key, treeData);
    //useState里数据务必为immutable （不可赋值的对象），所以必须加上slice()返回一个新的数组对象
    setData(treeData.slice());
  };

  const onEdit = (key) => {
    editNode(key, treeData);
    setData(treeData.slice());
  };

  const AddSys = () =>{
    
    axios.post('http://121.4.32.77:8080/project', {
      projectName: '某某系统',
      remark: '某某系统'
    })
    .then(function (response) {
      treeData.push({
        value: "某某系统",
        defaultValue:"某某系统",
        key: response.data.data.projectId, // 这个 key 应该是唯一的
        parentKey:0,
        style:{backgroundColor:"#e14eca"},
      })
      setData(treeData.slice());
    })
    .catch(function (error) {
      console.log(error);
    });
    
  }

  const editNode = (key, data) =>
    data.forEach((item) => {
      if (item.key === key) {
        item.isEditable = true;
      } else {
        item.isEditable = false;
      }
      item.value = item.defaultValue; // 当某节点处于编辑状态，并改变数据，点击编辑其他节点时，此节点变成不可编辑状态，value 需要回退到 defaultvalue
      if (item.children) {
        editNode(key, item.children);
      }
    });

  const change = (keys,info) =>{
    let message = ""
    var type = ""
    flag = "true"
    if(info.node.dataRef!=undefined&&info.node.dataRef.parentKey === 1){
      axios.get('http://121.4.32.77:8080/entity/'+keys[0]+'/interface_list').then(response => {
        var response = response.data
        PubSub.publish("right",{
          rightdata:response
        })
      }).catch(error => {
        console.log(error)
      });
    }
    if(keys[0]!=undefined &&keys[0].split("-")[0]==="data"&&flag==="true"){
      let url = 'http://121.4.32.77:8080/field/'+keys[0].split("-")[2]+'/attribute?attrOprType='
      switch (keys[0].split("-")[1]) {
        case "CDM":
          message = JSON.parse(JSON.stringify(CDM))
          url += 'CDM'
          type = "概念数据模型"
          break;
        case "PDM":
          message = JSON.parse(JSON.stringify(PDM))
          url += 'PDM'
          type = "物理数据模型"
          break;
        case "LDM":
          message = JSON.parse(JSON.stringify(LDM))
          url += 'LDM'
          type = "逻辑数据模型"
          break;
        case "OOM":
          message = JSON.parse(JSON.stringify(OOM))
          url += 'OOM'
          type = "面向对象模型"
          break;
        default:
          console.log("error"+keys[0].split("-")[1])
          break;
      }
      axios.get(url).then(response => {
        var res = response.data
        setmessage(message,res,type)
        PubSub.publish("TableMsg",{
          msg:message,
          ty:type,
          key:keys[0]
        })
      }).catch(error => {
        console.log(error)
        PubSub.publish("TableMsg",{
          msg:message,
          ty:type,
          key:keys[0]
        })
      });
    }
    
  }
  
  const setmessage = (message,response,type) =>{
    switch (type) {
      case "概念数据模型":
        message[0].content1 = response.data.dataType
        message[1].content1 = response.data.dataLength
        break;
      case "物理数据模型":
        message[0].content1 = response.data.codeName
        message[1].content1 = response.data.primaryKey ? "是" : "否" 
        message[2].content1 = response.data.dataType
        message[3].content1 = response.data.dataLength
        message[4].content1 = response.data.dataPrecision
        message[5].content1 = response.data.isForeignKey ? "是":"否"
        message[6].content1 = response.data.isUnique ? "是" : "否" 
        message[7].content1 = response.data.notNull ? "是" : "否" 
        message[8].content1 = response.data.defaultValue
        break;
      case "逻辑数据模型":
        message[0].content1 = response.data.isForeignKey ? "是":"否"
        message[1].content1 = response.data.isUnique ? "是" : "否" 
        message[2].content1 = response.data.isSorted ? "是" : "否" 
        message[3].content1 = response.data.isSearch ? "是" : "否" 
        message[4].content1 = response.data.searchType
        break;
      case "面向对象模型":
        message[0].content1 = response.data.addReq ? "是" : "否"
        message[1].content1 = response.data.updateReq ? "是" : "否" 
        message[2].content1 = response.data.deleteReq ? "是":"否"
        message[3].content1 = response.data.queryReq ? "是" : "否"
        message[4].content1 = response.data.isEnum ? "是" : "否"
        message[5].content1 = response.data.assoProgress
        message[6].content1 = response.data.progressReq ? "是":"否"
        break;
    
      default:
        break;
    }
  }

  const pushItem = (item) =>{
    if(item.parentKey===1){
      axios.post('http://121.4.32.77:8080/field', {
          fieldName: '某某字段',
          entityId:item.key,
          description:'某某字段',
        })
        .then(function (response) {
          item.children.push({
            value: "某某字段",
            defaultValue:"某某字段",
            key: response.data.data.fieldId, // 这个 key 应该是唯一的
            parentKey:item.parentKey+1,
            parentid:item.key,
            style:{backgroundColor:"#e14eca"},
            children:[{
              defaultValue:"概念模型",
              value: "概念模型",
              key: "data-CDM-"+response.data.data.fieldId, // 这个 key 应该是唯一的
              parentKey:item.parentKey+2,
              parentid:item.key,
              style:{backgroundColor:"#e14eca"},
            },{
              defaultValue:"物理模型",
              value: "物理模型",
              key: "data-PDM-"+response.data.data.fieldId, // 这个 key 应该是唯一的
              parentKey:item.parentKey+2,
              parentid:item.key,
              style:{backgroundColor:"#e14eca"},
            },{
              defaultValue:"逻辑模型",
              value: "逻辑模型",
              key: "data-LDM-"+response.data.data.fieldId, // 这个 key 应该是唯一的
              parentKey:item.parentKey+2,
              parentid:item.key,
              style:{backgroundColor:"#e14eca"},
            },{
              defaultValue:"面向对象模型",
              value: "面向对象模型",
              key: "data-OOM-"+response.data.data.fieldId, // 这个 key 应该是唯一的
              parentKey:item.parentKey+1,
              style:{backgroundColor:"#e14eca"},
            }]
          });
          setData(treeData.slice());
        })
        .catch(function (error) {
          console.log(error);
        });
      
      
    }
    else{
      if(item.parentKey === 0){
        axios.post('http://121.4.32.77:8080/entity', {
          entityName: '某某实体',
          remark: '某某实体',
          projectId:item.key,
          tableName:'某某实体',
        })
        .then(function (response) {
          item.children.push({
            defaultValue:"某某实体",
            value: "某某实体",
            key: response.data.data.entityId, // 这个 key 应该是唯一的
            parentKey:item.parentKey+1,
            parentid:item.key,
            style:{backgroundColor:"#e14eca"},
          });
          setData(treeData.slice());
        })
        .catch(function (error) {
          console.log(error);
        });
      }
      else{
        item.children.push({
          defaultValue:"default",
          value: "default",
          key: nanoid(), // 这个 key 应该是唯一的
          parentKey:item.parentKey+1,
          style:{backgroundColor:"#e14eca"},
        });
      }
    }
  }

  const addNode = (key, data) =>
    data.forEach((item) => {
      if (item.key === key) {
        if(item.value!='default'){
          if (item.children) {
            pushItem(item)
          } else {
            item.children = [];
            pushItem(item)
          }
        }
        else{
          alert("请先为文件命名！！！")
        }
        return;
      }
      if (item.children) {
        addNode(key, item.children);
      }
    });

  const onChange = (e, key) => {
    changeNode(key, e.target.value, treeData);
    setData(treeData.slice());
  };

  const changeNode = (key, value, data) =>
    data.forEach((item) => {
      if (item.key === key) {
        item.value = value;
      }
      if (item.children) {
        changeNode(key, value, item.children);
      }
    });

  const onSave = (key) => {
    saveNode(key, treeData);
    setData(treeData.slice());
  };

  const saveNode = (key, data) =>
    data.forEach((item) => {
      if (item.key === key) {
        item.defaultValue = item.value;
        save_to_server(item)
      }
      if (item.children) {
        saveNode(key, item.children);
      }
      item.isEditable = false;
    });
  
  const save_to_server = (item) =>{
    switch (item.parentKey) {
      case 0:
        axios.put('http://121.4.32.77:8080/project/'+item.key, {
          projectName: item.value,
          remark: item.value
        })
        .then(function (response) {
          // console.log(response)
        })
        .catch(function (error) {
          console.log(error);
        });
        break;
      case 1:
        axios.put('http://121.4.32.77:8080/entity/'+item.key, {
          remark: item.value
        })
        .then(function (response) {
          // console.log(response)
        })
        .catch(function (error) {
          console.log(error);
        });
        break;
      case 2:
        axios.put('http://121.4.32.77:8080/field/'+item.key, {
          fieldName: item.value,
          description: item.value
        })
        .then(function (response) {
          // console.log(response)
        })
        .catch(function (error) {
          console.log(error);
        });
        break;
      case 3:
        
      break;
    
      default:
        break;
    }
  }
  const delete_from_server = (item) =>{
    switch (item.parentKey) {
      case 0:
        axios.delete('http://121.4.32.77:8080/project/'+item.key, {
          
        })
        .then(function (response) {
          // console.log(response)
        })
        .catch(function (error) {
          console.log(error);
        });
        break;
      case 1:
        axios.delete('http://121.4.32.77:8080/entity/'+item.key, {
          
        })
        .then(function (response) {
          // console.log(response)
        })
        .catch(function (error) {
          console.log(error);
        });
        break;
      case 2:
        axios.delete('http://121.4.32.77:8080/field/'+item.key, {
          
        })
        .then(function (response) {
          // console.log(response)
        })
        .catch(function (error) {
          console.log(error);
        });
        break;
      case 3:
        
      break;
    
      default:
        break;
    }
  }

  const onClose = (key, defaultValue) => {
    closeNode(key, defaultValue, treeData);
    setData(treeData);
  };

  const closeNode = (key, defaultValue, data) =>
    data.forEach((item) => {
      item.isEditable = false;
      if (item.key === key) {
        item.value = defaultValue;
      }
      if (item.children) {
        closeNode(key, defaultValue, item.children);
      }
    });

  const onDelete = (key) => {
    deleteNode(key, treeData);
    setData(treeData.slice());
  };

  const deleteNode = (key, data) =>
    data.forEach((item, index) => {
      if (item.key === key) {
        data.splice(index, 1);
        delete_from_server(item)
        return;
      } else {
        if (item.children) {
          deleteNode(key, item.children);
        }
      }
    });

  return (
    <div>
      <div className="logo" >
                  <a  className="simple-text logo-mini" >
                  <AlignCenterOutlined />
                  </a>
                  <a  className="simple-text logo-normal text" onClick={AddSys}>
                    新建系统
                  </a>
                </div>
      <Tree 
      expandedKeys={expandedKeys} 
      onExpand={onExpand}
      onSelect={change}
      style={{backgroundColor:"#e14eca"}}
      showLine
      switcherIcon={<DownOutlined/>}
      >
        {
          renderTreeNodes(data)
        }
      </Tree>
    </div>
  );
}