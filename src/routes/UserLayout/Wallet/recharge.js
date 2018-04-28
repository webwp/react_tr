import React , { Component } from 'react';
import { connect } from "dva";
import { createForm } from 'rc-form';
import Page from '../../../components/Page';

import { Button, WhiteSpace, WingBlank , List , InputItem , ActionSheet } from 'antd-mobile';

const Item = List.Item;
const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent);
let wrapProps;
if (isIPhone) {
  wrapProps = {
    onTouchStart: e => e.preventDefault(),
  };
}

class Recharge extends Component{
    
    showActionSheet = () => {
        const BUTTONS = [<div className="txt-l"><span style={{paddingTop:'10px'}}><img src='image/balance/boc.png'/></span>中国银行储蓄卡(1716)<i className="iconfont icon-hook right"></i></div>, 'Operation2', 'Operation2', 'Delete', 'Cancel'];
        ActionSheet.showActionSheetWithOptions({
          options: BUTTONS,
          cancelButtonIndex: BUTTONS.length - 1,
          destructiveButtonIndex: BUTTONS.length - 2,
          //title: '选择付款方式',
          message: '选择付款方式',
          maskClosable: true,
          'data-seed': 'logId',
          wrapProps,
        },
        (buttonIndex) => {
          this.setState({ clicked: BUTTONS[buttonIndex] });
        });
      }
    render(){
        const { history } = this.props;
        const others = {mode:'light'};
        const { getFieldProps } = this.props.form;
        return(
           <Page title="我的二维码" history={history} others={others} _bool={true} >
                <div >
                    <div style={{padding:'0 15px'}}>
                    <List renderHeader={() => '充值金额'} className="custom-form custom-form-input">
                        <InputItem
                            {...getFieldProps('preice',{initialValue:100})}
                            placeholder="0.00"
                            labelNumber={2}
                            style={{fontSize:'24px'}}
                        ><div style={{textAlign:'center'}}>￥</div></InputItem>
                    </List>
                    </div>
                    <WhiteSpace />
                    <WhiteSpace />
                    <WhiteSpace />
                    <WhiteSpace />
                    <WhiteSpace />
                    <WhiteSpace />
                    <List className="my-list">
                        <Item arrow='horizontal' onClick={this.showActionSheet}><img src="image/balance/boc.png" />中国银行储蓄卡(1716)</Item>
                    </List>
                    <WhiteSpace />
                    <div style={{padding:'25px 15px 0 15px'}}>
                        <Button type='primary' className='am-button-green' onClick={this.submit}>充值</Button>
                    </div>
                </div>
           </Page>
        )
    }
}
const RechargeForm = createForm()(Recharge);
export default RechargeForm;