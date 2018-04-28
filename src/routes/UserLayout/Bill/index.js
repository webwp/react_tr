import React , { Component } from 'react';
import {  connect } from 'dva'
import {  Link } from 'dva/router'
import {List} from 'antd-mobile'

import Page from '../../../components/Page';
import ListView from '../../../components/Other/ListView'

const Item = List.Item;
const Brief = Item.Brief;
const data = [
    {id:0,title:'停车缴费',business:'停车',money:'-10',recordTime:'04-12 18:15:36',icon:'image/home/Liner@2x.png'},
    {id:0,title:'水上旅游购票订单支付',business:'水上旅游',money:'-10',recordTime:'04-12 18:15:36',icon:'image/home/Parking@2x.png'},
    {id:0,title:'扫码乘公交',business:'公交',money:'-10',recordTime:'04-12 18:15:36',icon:'image/home/Chargingpile@2x.png'},
    {id:0,title:'共享汽车租车费用',business:'共享汽车',money:'-10',recordTime:'04-12 18:15:36',icon:'image/home/Reservedcarinspection@2x.png'},
    {id:0,title:'充电桩租用费用',business:'充电桩',money:'-10',recordTime:'04-12 18:15:36',icon:'image/home/Sharedca@2x.png'},
    {id:0,title:'余额充值',business:'充值',money:'-10',recordTime:'04-12 18:15:36',icon:'image/home/transit@2x.png'},
]
@connect(state=>({
    bill:state.bill
}))
class Index extends Component{
    render(){
        const { bill , history } = this.props;
        const { data } = !bill.data ? bill : [];
        const others = {mode:'light'}
        return(
            <Page title='我的账单' others={others} history={history} _bool={true}>
                
                {data ? (
                <List renderHeader={() => '本月'} className="my-list custom-bill">
                    {  data.map((item,index)=>(
                            <Item 
                                extra={<strong style={{color:'#333'}}>{item.money}</strong>} 
                                align="top" 
                                thumb={<img src={item.icon} width='80' height='80' />} 
                                multipleLine
                            >
                            {item.title} <Brief>{item.business}</Brief><Brief>{item.recordTime}</Brief>
                            </Item>
                    ))}
                    
                </List>
                ) : <p className='txt-c txt-color-assist no-data'>无相关数据</p>}
            </Page>
        )
    }
}

export default Index;