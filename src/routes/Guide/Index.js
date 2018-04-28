import React , { Component } from 'react';
import { List } from 'antd-mobile';

import { connect } from 'dva';
import Page from '../../components/Page';


const Item = List.Item;
@connect(state=>({
    Guide:state.guide
}))
class Index extends Component{
    constructor(props){
        super(props);
        this.state = {
            list:[]
        }
        
    }
    getDetail = (url)=>{
        const {  history } = this.props;
        url == null ? '':history.push(url);
    }

    render(){
        const { history , Guide } = this.props;
        const { dataList } = Guide;
        return(
          <Page title="出行指南" history={history}>
                
                
                <List className="my-list">
                  {dataList == null ? '没有数据':dataList.map((item,index)=>{
                     return <Item key={index} arrow="horizontal" onClick={()=>{this.getDetail(item.uri)}}><a style={{display:'block'}} href={item.uri}>{item.title}</a></Item>
                  })}
                    
                </List>
          </Page>
        )
    }
}

export default Index;