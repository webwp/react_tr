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
        let dataTest = [
            {bg:'#FD6F57',icon:'icon-swticongongjiaoche1',txt:'预订船票',url:'#/water/ticket'},
            {bg:'#2EA1F1',icon:'icon-youlun',txt:'预订包船',url:'#/water/charter'},
            {bg:'#01D066',icon:'icon-tingche',txt:'旅游指南',url:''},
        ]
        let data = [];
        dataTest.map((item,index)=>{
            let classType='iconfont borderRadius '+item.icon;
            let res = {icon:(<a href={item.url}><i className={classType} style={{'background':item.bg}}></i></a>),text:item.txt}
            data.push(res);
            num++;
        })
        return (
            <Grid className='custom_grid_other' columnNum={3} data={data} hasLine={false}  onClick={_el => console.log(_el)} />
        )
    }
}
export default IndexGrid;