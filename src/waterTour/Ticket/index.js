import React , { Component } from 'react';
import { Link } from 'dva/router';
import Page from '../../components/Page';

class Index extends Component{
    render(){
        const { history } = this.props;
        const data = [
            {
                "id": 1,
                "name": "南宁港",
                "address": "邕江边100号",
                "phone": "1234567890"
            },
            {
                "id": 1,
                "name": "民生码头",
                "address": "广西南宁市兴宁区江北大道北大桥南宁港（大辉越南螃蟹脚）",
                "phone": "1234567890"
            },
            {
                "id": 1,
                "name": "青山码头",
                "address": "邕江边100号",
                "phone": "1234567890"
            }
        ];
        const someThing = {canGoBack:true}

        const others = {mode:'light'};
        return(
          <Page title="始发码头" history={history} someThing={someThing} _bool={true} others={others}>
              <h4>请选择始发码头</h4>
              {data.map((item,index)=>(
                <Link to={'/water/ticket/'+item.id} style={{padding:'12px'}} key={index}>
                    <h4>{item.name}</h4>
                    <p>地址:{item.address}</p>
                </Link>
              ))}
          </Page>
        )
    }
}
export default Index;