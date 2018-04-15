import React , { Component } from 'react';
import {List ,Button} from 'antd-mobile'

import Header from '../../../components/Other/Header';
import ListView from '../../../components/Other/ListView'

const Item = List.Item;
const Brief = Item.Brief;
const data = [
    {id:0,name:'张三',phone:'18007803076',Idcard:'452231198903135011',recordTime:'04-12 18:15:36',icon:'https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png'},
    {id:0,name:'李四',phone:'18007803076',Idcard:'452231198903135011',recordTime:'04-12 18:15:36',icon:'https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png'},
    {id:0,name:'王五',phone:'18007803076',Idcard:'452231198903135011',recordTime:'04-12 18:15:36',icon:'https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png'},
    {id:0,name:'程咬金',phone:'18007803076',Idcard:'452231198903135011',recordTime:'04-12 18:15:36',icon:'https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png'},
    {id:0,name:'李元芳',phone:'18007803076',Idcard:'452231198903135011',recordTime:'04-12 18:15:36',icon:'https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png'},
    {id:0,name:'白起',phone:'18007803076',Idcard:'452231198903135011',recordTime:'04-12 18:15:36',icon:'https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png'},
];


class Index extends Component{

    // 隐藏部分身份证号
    plusXing (str,frontLen,endLen) { 
        var len = str.length-frontLen-endLen;
        var xing = '';
        for (var i=0;i<len;i++) {
        xing+='*';
        }
        return str.substring(0,frontLen)+xing+str.substring(str.length-endLen);
   }
    render(){
        return(
            <div>
                <Header {...this.props} headerTxt="常用联系人信息" />
                <div className="custom-nav-sibling-top">
                <List className="my-list">
                    {data.map((item,index)=>(
                        <a href={'#/user/contactinfo/editor/'+item.id} key={index}>
                        <Item
                            arrow="horizontal"
                            multipleLine
                            onClick={() => {}}
                            platform="android"
                        >
                            {item.name}<Brief>手机号码  {item.phone} <br /> {this.plusXing(item.Idcard,4,4)}</Brief>
                        </Item>
                        </a>
                    ))}
                    
                </List>
                <List.Item>
                            <div
                            style={{ width: '100%', color: '#108ee9', textAlign: 'center' }}
                            >
                               <Button onClick={this.onSubmit}>添加常用联系人</Button>
                            </div>
                        </List.Item>
                </div>
            </div>
        )
    }
}

export default Index;