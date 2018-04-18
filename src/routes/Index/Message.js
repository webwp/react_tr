import React , { Component } from 'react';
import { List } from 'antd-mobile';
import { connect } from 'dva'

const Item = List.Item;
const Brief = Item.Brief;

@connect(state => ({
    Message:state.index
}))
class Messages extends Component{
    componentWillMount(){
        const {dispatch}=this.props
        dispatch({
            type:'index/messages',
            payload:{page:1,per_page:2}
        })
    }
    render(){
        const { Message } = this.props;
        return (
            <div className="mt10 contents">
                 <div className="left">
                     <img src='https://gw.alipayobjects.com/zos/rmsportal/WXoqXTHrSnRcUwEaQgXJ.png' style={{'width':'48px','height':'48px'}} />
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
                          ''
                     }
                     </ul>
                 </div>
            </div>
        )
    }
}

export default Messages;