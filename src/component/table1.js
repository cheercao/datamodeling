import React, { useContext, useEffect, useRef, useState } from 'react';
import 'antd/dist/antd.css';
import './table1.css';
import { Alert, Button, Form, Input, Popconfirm, Table } from 'antd';
import PubSub from 'pubsub-js';
import axios from 'axios';

var key;
const EditableContext = React.createContext(null);

const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const form = useContext(EditableContext);
  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0,
        }}
        name={dataIndex}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{
          paddingRight: 24,
        }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

const App = () => {

  PubSub.subscribe("TableMsg",(_,tablemsg)=>{
    setDataSource(tablemsg.msg)
    key = tablemsg.key
  })

  PubSub.subscribe("save",(_,save)=>{
    saveTable(save)
  })

  const [dataSource, setDataSource] = useState([
    
  ]);
  
  const defaultColumns = [
    {
      dataIndex: 'name',
      width: '11%',
    },
    {
      dataIndex: 'content1',
      editable: true,
      width: '10%',
    },
    {
      dataIndex: 'content2',
      editable: false,
      width: '10%',
    },
    {
      dataIndex: 'content3',
      editable: false,
      width: '10%',
    },
    {
      dataIndex: 'content4',
      editable: false,
      width: '10%',
    },
    {
      dataIndex: 'content5',
      editable: false,
      width: '10%',
    },
    {
      dataIndex: 'content6',
      editable: false,
      width: '10%',
    },
    {
      dataIndex: 'content7',
      editable: false,
      width: '10%',
    },
    {
      dataIndex: 'content8',
      editable: false,
      width: '10%',
    },
    {
      dataIndex: 'content9',
      editable: false,
      width: '10%',
    },
    
  ];
  const dataType = ["TINYINT","SMALLINT","MEDIUMINT","INT","BIGINT","FLOAT","DOUBLE","DECIMAL","BIT","YEAR","TIME","DATE","DATETIME","TIMESTAMP","CHAR","VARCHAR","TINYTEXT","TEXT","MEDIUMTEXT","LONGTEXT","ENUM","ENUM","BINARY","VARBINARY","JSON","GEOMETRY","POINT","GEOMETRYCOLLECTION",]

  function saveTable(save){
    console.log(save)
    if(dataSource!==undefined&&dataSource.length!==0){
      let l = 0;
      switch (key.split("-")[1]) {
        case "CDM":
          l = 2;
          break;
        case "LDM":
          l = 5;
          break;
        case "PDM":
          l = 9;
          break;
        case "OOM":
          l = 7;
          break;
        default:
          break;
      }
      if(l === dataSource.length&&save.save===1){
        save_to_server()
      }
    }
  }
  const save_to_server = ()=>{
    switch (key.split("-")[1]) {
      case "CDM":
        axios.post('http://121.4.32.77:8080/field/'+key.split("-")[2]+'/attribute', {
          attrOprType: 'CDM',
          dataType: dataType.includes(dataSource[0].content1) ? dataSource[0].content1 : "TEXT",
          dataLength:dataSource[1].content1,
        })
        .then(function (response) {
          alert("保存成功")
        })
        .catch(function (error) {
          console.log(error);
        });
        break;
      case "LDM":
        axios.post('http://121.4.32.77:8080/field/'+key.split("-")[2]+'/attribute', {
          attrOprType: 'LDM',
          isForeignKey: dataSource[0].content1 === "是" ? true:false ,
          isSearch: dataSource[3].content1 === "是" ? true:false,
          isSorted: dataSource[2].content1 === "是" ? true:false,
          isUnique: dataSource[1].content1 === "是" ? true:false,
          searchType: dataSource[4].content1 === "TYPE_1" ? "TYPE_1":"TYPE_2",
        })
        .then(function (response) {
          alert("保存成功")
          console.log(response)
        })
        .catch(function (error) {
          console.log(error);
        });
        break;
      case "PDM":
        axios.post('http://121.4.32.77:8080/field/'+key.split("-")[2]+'/attribute', {
          attrOprType: 'PDM',
          codeName: dataSource[0].content1 ,
          primaryKey: dataSource[1].content1 === "是" ? true:false,
          dataType: dataType.includes(dataSource[2].content1) ? dataSource[2].content1 : "TEXT",
          dataLength: dataSource[3].content1,
          dataPrecision: dataSource[4].content1,
          isForeignKey: dataSource[5].content1 === "是" ? true:false,
          isUnique:dataSource[6].content1 === "是" ? true:false,
          notNull:dataSource[7].content1 === "是" ? true:false,
          defaultValue:dataSource[8].content1,
        })
        .then(function (response) {
          alert("保存成功")
        })
        .catch(function (error) {
          console.log(error);
        });
        break;
      case "OOM":
        axios.post('http://121.4.32.77:8080/field/'+key.split("-")[2]+'/attribute', {
          attrOprType: 'OOM',
          addReq: dataSource[0].content1  === "是" ? true:false,
          updateReq: dataSource[1].content1 === "是" ? true:false,
          deleteReq: dataSource[2].content1 === "是" ? true:false,
          queryReq: dataSource[3].content1 === "是" ? true:false,
          isEnum: dataSource[4].content1 === "是" ? true:false,
          assoProgress: dataSource[5].content1,
          progressReq:dataSource[6].content1 === "是" ? true:false,
        })
        .then(function (response) {
          alert("保存成功")
        })
        .catch(function (error) {
          console.log(error);
        });
        break;
      default:
        break;
    }
  }
  const handleSave = (row) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, { ...item, ...row });
    setDataSource(newData);
  };

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };
  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });
  return (
    <div>
      <Table
        components={components}
        rowClassName={() => 'editable-row'}
        bordered={false}
        size='small'
        pagination={false}
        showHeader={false}
        style={{backgroundColor:"#3071b9"}}
        dataSource={dataSource}
        columns={columns}
      />
    </div>
  );
};

export default App;