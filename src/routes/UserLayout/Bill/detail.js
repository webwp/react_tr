import React , { Component } from 'react';
import { List , WhiteSpace } from 'antd-mobile'

import Page from '../../../components/Page';
import ListView from '../../../components/Other/ListView'

const Item = List.Item;
const Brief = Item.Brief;
// const data = [
//     {id:0,title:'停车缴费',business:'停车',money:'-10',recordTime:'04-12 18:15:36',icon:'https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png'},
//     {id:0,title:'水上旅游购票订单支付',business:'水上旅游',money:'-10',recordTime:'04-12 18:15:36',icon:'https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png'},
//     {id:0,title:'扫码乘公交',business:'公交',money:'-10',recordTime:'04-12 18:15:36',icon:'https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png'},
//     {id:0,title:'共享汽车租车费用',business:'共享汽车',money:'-10',recordTime:'04-12 18:15:36',icon:'https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png'},
//     {id:0,title:'充电桩租用费用',business:'充电桩',money:'-10',recordTime:'04-12 18:15:36',icon:'https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png'},
//     {id:0,title:'余额充值',business:'充值',money:'-10',recordTime:'04-12 18:15:36',icon:'https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png'},
// ]
const data = {id:0,title:'停车缴费',business:'停车',money:'-10.00',payment:'微信支付',orderSer:'20180128235625123212132',trading:'20215625463245666555',recordTime:'2018-01-28 20:00:00',icon:'https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png'}

class Index extends Component{
    render(){
        const { history } = this.props;
        const others = {mode:'light'};
        return(
            <Page title="账单详情" _bool={true} history={history} others={others}>
                <div style={{ background:'white',height:'100%'}} >
                    <div className="txt-c custom-box">
                        <strong className="fz-mini-sm">{data.title}</strong>
                        <p className="fz-important-dd mt10 txt-color-warn"><strong>{data.money}元</strong></p>
                    </div>
                    <WhiteSpace style={{background:'#f5f5f5'}} />
                    <List className="my-list">
                        <Item extra={data.title}>支付说明</Item>
                        <Item extra={data.payment}>支付方式</Item>
                    </List>
                    <WhiteSpace style={{background:'#f5f5f5'}} />
                    <List className="my-list custom-my-list">
                        <Item extra={data.orderSer}>订单编号</Item>
                        <Item extra={data.recordTime}>交易时间</Item>
                        {data.trading?<Item extra={data.trading}>交易单号</Item>:''}
                    </List>
                    <WhiteSpace style={{background:'#f5f5f5'}} />
                </div>
            </Page>
        )
    }
}

export default Index;