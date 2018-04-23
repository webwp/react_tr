import React , { Component } from 'react';
import {List ,Button,Modal} from 'antd-mobile'
import { connect } from 'dva';
import Page from '../../../components/Page'

const Item = List.Item;
const Brief = Item.Brief;
const alert = Modal.alert;
alert(0);

@connect( state => ({
    ContactInfo: state.contactInfo
}))
class Index extends Component{
    state = {
        status:'none',
    }
    // 隐藏部分身份证号
    plusXing (str,frontLen,endLen) { 
        var len = str.length-frontLen-endLen;
        var xing = '';
        for (var i=0;i<len;i++) {
        xing+='*';
        }
        return str.substring(0,frontLen)+xing+str.substring(str.length-endLen);
   }
   
   //点击navBar 的编辑按钮
   onEditor=()=>{
       this.setState({
           status: this.state.status === 'none' ? 'inline-block' : 'none'
       })
   }
   //确认删除事件
   _onHandleDelete = (id) => {
       const { dispatch } = this.props;
       dispatch({
           type:'contactInfo/del',
           payload:{id:id}
       })
   }
   //点击删除事件
   onHandleDelete = (id,e)=>{
        e.preventDefault() || e.stopPropagation();
        alert('删除', '确定删除常用联系人?', [
            { text: '取消', onPress: () => console.log('cancel') },
            { text: '确定', onPress: () => this._onHandleDelete(id) },
        ])
   }
   //页面跳转
   onJump = (url)=>{
       const { history } = this.props;
       history.push(url);
   }
   
    render(){
        let arr = [];
        const { ContactInfo , history } = this.props;
        const { dataList } = ContactInfo;
        if(dataList == null){
            return false;
        }else{
            arr = dataList.data;
        }

        const right = [<i onClick={this.onEditor}>{this.state.status == 'none' ? '编辑':'完成'}</i>];
        return(
            <Page title="常用联系人信息" history={history} right={right}  key='pages'>
                <div>
                <List className="my-list">
                    {(arr.length) == 0 ? <p className="txt-c txt-color-assist" style={{lineHeight:'120px'}}>没有相关联系人</p> :arr.map((item,index)=>(
                        <Item
                            key={index}
                            arrow="horizontal"
                            multipleLine
                            onClick={() => this.onJump('/user/contactinfo/editor/'+item.id)}
                            // platform="android"
                        >
                        <i className='iconfont icon-shanchu left' onClick={(e) => this.onHandleDelete(item.id,e)} style={{display:this.state.status}}></i>
                            {item.realname}<Brief>手机号码  {item.phone} <br /> {this.plusXing(item.id_no,4,4)}</Brief>
                        </Item>
                    ))}
                </List>
                <List.Item key={true}>
                            <div
                            style={{ width: '100%', color: '#108ee9', textAlign: 'center' }}
                            >
                               <Button onClick={()=>{this.onJump('/user/contactinfo/add')}}>添加常用联系人</Button>
                            </div>
                        </List.Item>
                </div>
            </Page>
        )
    }
}

export default Index;