import React,{Component} from 'react';
import { routerRedux,Redirect,Switch } from 'dva/router';
import { Grid } from 'antd-mobile';

class IndexGrid extends Component{
    render(){
        let num=0;
        let iconBackgroudColor = ['#FD6F57',"#2EA1F1","#01D066","#1CC7F2","#01D066","#FFAC23","#01D066","#FF8D3A","#FF8D3A","#FF8D3A"]
        const list = {
            'icon-swticongongjiaoche1':'公交', 'icon-youlun':'邮轮码头', 'icon-tingche':'停车',
            'icon-gongxiangtubiaozhuangtaileicaozuolei24':'共享汽车','icon-mobilepower':'充电桩','icon-yuyue':'预约车险','icon-ditu':'出行指南','icon-manage_fill':'更多'
        };
        let dataTest = [
            {bg:'#FD6F57',icon:'icon-swticongongjiaoche1',txt:'公交',url:''},
            {bg:'#2EA1F1',icon:'icon-youlun',txt:'邮轮码头',url:''},
            {bg:'#01D066',icon:'icon-tingche',txt:'停车',url:''},
            {bg:'#1CC7F2',icon:'icon-gongxiangtubiaozhuangtaileicaozuolei24',txt:'共享汽车',url:''},
            {bg:'#FFAC23',icon:'icon-mobilepower',txt:'充电桩',url:''},
            {bg:'#01D066',icon:'icon-yuyue',txt:'预约车险',url:''},
            {bg:'#FF8D3A',icon:'icon-ditu',txt:'出行指南',url:'#/guide'},
            {bg:'#FF8D3A',icon:'icon-manage_fill',txt:'更多',url:''},
        ]
        let data = [];
        //for(var item in dataTest){
        dataTest.map((item,index)=>{
            let classType='iconfont borderRadius '+item.icon;
            let res = {icon:(<a href={item.url}><i className={classType} style={{'background':item.bg}}></i></a>),text:item.txt}
            data.push(res);
            num++;
        })
            
        //}
        console.log('data',data);
        return (
            <Grid className='custom_grid_other' data={data} hasLine={false}  onClick={_el => console.log(_el)} />
        )
    }
}

export default IndexGrid;