import React , { Component } from 'react';
import { List } from 'antd-mobile';

const Item = List.Item;
const Brief = Item.Brief;

class Messages extends Component{
    render(){
        return (
            <div className="mt10 contents">
                 <div className="left">
                     <img src='https://gw.alipayobjects.com/zos/rmsportal/WXoqXTHrSnRcUwEaQgXJ.png' style={{'width':'48px','height':'48px'}} />
                 </div>
                 <div className="right" style={{"lineHeight":"55px",'color':'#666'}}>
                     <i className="iconfont icon-gengduo fz-sm"></i>
                 </div>
                 <div className="center padding-left-74">
                     <ul className="ulList">
                         <li>您有一笔停车费用需要支付您有一笔停车费用需要支付</li>
                         <li>您有一待出游的订单</li>
                     </ul>
                 </div>
            </div>
        )
    }
}

export default Messages;