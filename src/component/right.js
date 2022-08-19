import React, { useState,useEffect} from 'react';
import 'antd/dist/antd.css';
import './right.css';
import { Tabs,Card } from 'antd';
import PubSub from 'pubsub-js';

function App() {

  let [right,setRight] = useState([{
    interfaceType: 'CREATE', interfaceName: '点击实体名显示接口列表'
  }])

    PubSub.subscribe("right",(_,r)=>{
      if(r.rightdata.data!=undefined){
        setRight(r.rightdata.data)
        console.log(right)
      }
    })

  return (
    <Card
      title="接口列表"
      bordered={false}
      headStyle={{
        color:'white',
      }}
      style={{
        width: 200,
        backgroundColor:"#27293d"
      }}
    >
     
      {
        right.map((cont) => {
          return(
            <p id={cont.interfaceType}>{cont.interfaceName}</p>
          )
        })
      }
    </Card>
  );
}

export default App;