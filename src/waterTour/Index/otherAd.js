import React , { Component } from 'react';

import { routerRedux,Redirect,Switch } from 'dva/router';
import { Grid } from 'antd-mobile';
 
class IndexGrid extends Component {
    render(){
        let num=0;
        let iconBackgroudColor = ['#FD6F57',"#2EA1F1","#01D066","#1CC7F2","#01D066","#FFAC23","#01D066","#FF8D3A","#FF8D3A","#FF8D3A"]
        const list = {
            'icon-swticongongjiaoche1':'公交', 'icon-youlun':'邮轮码头', 'icon-tingche':'停车',
            'icon-gongxiangtubiaozhuangtaileicaozuolei24':'共享汽车','icon-mobilepower':'充电桩','icon-yuyue':'预约车险','icon-ditu':'出行指南','icon-manage_fill':'更多'
        };
        let data = [
            {image:'image/ad01.png',uri: "xxxx"},
            {image:'image/ad02.png',uri: "xxxx"},
        ]
        
        return (
            <Grid 
                className='custom_grid_other' 
                columnNum={2} 
                data={data} 
                //hasLine={false}  
                onClick={_el => console.log(_el)} 
                itemStyle={{height:'100px'}}
                renderItem={dataItem => (
                    <div style={{ padding: '12.5px' }}>
                      <img src={dataItem.image} style={{ height: '60px' }} alt="" />
                    </div>
                  )}
            />
        )
    }
}
export default IndexGrid;