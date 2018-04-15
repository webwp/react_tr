import React , { Component } from 'react';
import { List } from 'antd-mobile';

import Header from '../../components/Other/Header';

const Item = List.Item;

class Index extends Component{
    constructor(props){
        super(props);
        this.state = {
            list:[]
        }
        
    }

    render(){
        const list = [
            {title:'使用扫码搭乘公交车指南',url:'#/guide/detail/6'},
            {title:'夜游南宁，游船订票攻略',url:''},
            {title:'桂A牌南宁停车场快速停车缴费指南',url:''},
            {title:'快速预约车险',url:''},
        ];
        return(
          <div>
                <Header {...this.props} headerTxt='出行指南' />
                <div className='custom-nav-sibling-top'>
                <List className="my-list">
                  {list.map((item,index)=>{
                     return <Item key={index} arrow="horizontal" onClick={() => {}}><a style={{display:'block'}} href={item.url}>{item.title}</a></Item>
                  })}
                    
                </List>
                </div>
          </div>
        )
    }
}

export default Index;