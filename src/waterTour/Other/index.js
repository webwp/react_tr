import React , { Component } from 'react';
import {Flex, WhiteSpace,Card,WingBlank} from 'antd-mobile';
import {Link} from 'dva/router';

import Page from '../../components/Page';
import Banner from '../../components/Banner';

import { List } from 'antd-mobile';
const data= [
    {
        "id": 1,
        "title": "民生码头 （19：00~20：00）",
        "order_no": "2018041107554114828881",
        "uri": null,
        "status": 1,
        'info':'航班号 ABC123',
        'pay':740,
        "paid_time": "2018-04-12 10:23:16"
    },
    {
        "id": 1,
        "title": "民生码头 （19：00~20：00）",
        "order_no": "2018041107554114828881",
        "uri": null,
        "status": 1,
        'info':'航班号 ABC123',
        'pay':740,
        "paid_time": "2018-04-12 10:23:16"
    },
    {
        "id": 1,
        "title": "民生码头 （19：00~20：00）",
        "order_no": "2018041107554114828881",
        "uri": null,
        "status": 1,
        'info':'航班号 ABC123',
        'pay':740,
        "paid_time": "2018-04-12 10:23:16"
    },
    {
        "id": 1,
        "title": "民生码头 （19：00~20：00）",
        "order_no": "2018041107554114828881",
        "uri": null,
        "status": 1,
        'info':'航班号 ABC123',
        'pay':740,
        "paid_time": "2018-04-12 10:23:16"
    }
];
const PlaceHolder = ({ className = '', ...restProps }) => (
    <div className={`${className} placeholder`} {...restProps} style={{textAlign:'center'}}><Link to={restProps.url}>{restProps.text}</Link></div>
  );
class Index extends Component{
    render(){
        const { history } = this.props;
        const others = {mode:'light'};
        return(
           <Page title="我的订单" history={history} _bool={true} others={others}>
                <div  className="flex-container" style={{padding:'15px'}}>
                    <Flex>
                        <Flex.Item><PlaceHolder text={'我的船票订单'} url="http://" /></Flex.Item>
                        <Flex.Item><PlaceHolder text={'预约包船记录'} url="http://" /></Flex.Item>
                    </Flex>
                </div>
                <div className="custom-card">
                <List className="custom-list" renderHeader = '有效的船票订单'>
                {data.map((item,index)=>(
                <WingBlank size="md">
                    <WhiteSpace size="md" />
                    <Card>
                    <Card.Header
                        title={item.order_no}
                        extra={item.status==0?<span>去付款</span>:<span>已付款</span>}
                        thumbStyle={{fontSize:'12px'}}
                    />
                    <Card.Body>
                        <div>
                            <div className="left">
                                {item.title}
                                <p className="fz-small-md">{item.paid_time}</p>
                                <p className='txt-color-assist-sm'>{item.info}</p>
                            </div>
                            <span className='right' style={{lineHeight:'70px',color:'red'}}>￥{item.pay}</span>
                        </div>
                    </Card.Body>
                    
                    </Card>
                    <WhiteSpace size="lg" />
                </WingBlank>
                ))}
                </List>
                </div>
                {/* <List className="custom-list">
                 {data.map((item,index)=>(
                    <List.Item key={index}>
                        <img src={item.image} className="left" width="80" height='80' />
                        <div className="content-list">
                            <h5>
                                {item.title}
                            </h5>
                            <p className="txt-color-default fz-small-sm">
                            {item.brief}
                            <br />
                            {item.publish_time}
                            </p>
                        </div>
                    </List.Item>
                 ))}
                </List> */}
           </Page>
        )
    }
}

export default Index;