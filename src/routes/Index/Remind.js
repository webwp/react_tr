import React , { Component } from 'react';
import { List } from 'antd-mobile';
import { connect } from 'dva'

const Item = List.Item;
const Brief = Item.Brief;

@connect(state => ({
    Reminds:state.remind
}))
class RemindSerIndex extends Component{
    
    render(){
        const { Reminds } = this.props;
        
        const {reminds} = Reminds;
        if(reminds == null){
            return false;
        }
        return (
            <div className="mt10 contents" style={{paddingTop:'10px'}}>
                 <div className="left" style={{paddingTop:'10px'}}>
                     <img src='image/home/msg@3x.png' style={{width:'41.5px',height:'32px'}}/>
                 </div>
                 <div className="right" style={{"lineHeight":"55px",'color':'#666'}}>
                     <a href="#/message"><i className="iconfont icon-gengduo fz-sm"></i></a>
                 </div>
                 <div className="center padding-left-74">
                     <ul className="ulList">
                     {reminds.data.total!=0 ? 
                          reminds.data.data.map((item,index)=>(
                              <li><span>{item.message}</span></li>
                          ))
                          :
                          <li><span>您当前没有提醒信息 </span></li>
                     }
                     </ul>
                 </div>
            </div>
        )
    }
}

export default RemindSerIndex;