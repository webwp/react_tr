import React , { Component } from 'react';
import { List } from 'antd-mobile';
import { connect } from 'dva'

const Item = List.Item;
const Brief = Item.Brief;

@connect(state => ({
    Message:state.message
}))
class Messages extends Component{
    
    render(){
        const { Message } = this.props;
        
        const {message} = Message;
        if(message == null){
            return false;
        }
        return (
            <div className="mt10 contents" style={{paddingTop:'10px'}}>
                 <div className="left">
                     <img src='image/home/msg.png' />
                 </div>
                 <div className="right" style={{"lineHeight":"55px",'color':'#666'}}>
                     <a href="#/message"><i className="iconfont icon-gengduo fz-sm"></i></a>
                 </div>
                 <div className="center padding-left-74">
                     <ul className="ulList">
                     {Message.message!=null ? 
                          Message.message.data.data.map((item,index)=>(
                              <li>{item.message}</li>
                          ))
                          :
                          <li>您当前没有提醒信息</li>
                     }
                     </ul>
                 </div>
            </div>
        )
    }
}

export default Messages;