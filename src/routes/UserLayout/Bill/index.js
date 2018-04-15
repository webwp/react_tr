import React , { Component } from 'react';
import {List} from 'antd-mobile'

import Header from '../../../components/Other/Header';
import ListView from '../../../components/Other/ListView'

const Item = List.Item;
const Brief = Item.Brief;
const data = [
    {id:0,title:'停车缴费',business:'停车',money:'-10',recordTime:'04-12 18:15:36',icon:'https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png'},
    {id:0,title:'水上旅游购票订单支付',business:'水上旅游',money:'-10',recordTime:'04-12 18:15:36',icon:'https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png'},
    {id:0,title:'扫码乘公交',business:'公交',money:'-10',recordTime:'04-12 18:15:36',icon:'https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png'},
    {id:0,title:'共享汽车租车费用',business:'共享汽车',money:'-10',recordTime:'04-12 18:15:36',icon:'https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png'},
    {id:0,title:'充电桩租用费用',business:'充电桩',money:'-10',recordTime:'04-12 18:15:36',icon:'https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png'},
    {id:0,title:'余额充值',business:'充值',money:'-10',recordTime:'04-12 18:15:36',icon:'https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png'},
]

class Index extends Component{
    render(){
        return(
            <div>
                <Header {...this.props} headerTxt="账单" />
                <div className="custom-nav-sibling-top">
                <List renderHeader={() => '本月'} className="my-list">
                    {data.map((item,index)=>(
                        <a href={'#/user/bill/detail/'+item.id}>
                            <Item extra={item.money} align="top" thumb={item.icon} multipleLine>
                            {item.title} <Brief>{item.business}</Brief><Brief>{item.recordTime}</Brief>
                            </Item>
                        </a>
                    ))}
                    
                </List>
                </div>
            </div>
        )
    }
}

export default Index;