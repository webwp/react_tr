import React , { Component } from 'react';
import { NoticeBar, WhiteSpace, Icon ,List , InputItem , Switch , Stepper , Range , Button , DatePicker,Radio,Flex,Toast} from 'antd-mobile';
import { createForm } from 'rc-form';

import Header from '../../../components/Other/Header';


const Item = List.Item;
const nowTimeStamp = Date.now();
const now = new Date(nowTimeStamp);
// GMT is not currently observed in the UK. So use UTC now.
const utcNow = new Date(now.getTime() + (now.getTimezoneOffset() * 60000));

class Index extends Component{
    state = {
        hasError: false,
        date: now,
        time: now,
        utcDate: utcNow,
        dpValue: null,
        customChildValue: null,
        visible: false,
    }
    onChange = (value) => {
        console.log('checkbox');
        this.setState({
          value,
        });
    };
    onSubmit = ()=>{
            this.props.form.validateFields((error,value)=>{
                console.log(value,error)
                
            })
    }
    render(){
        const data = [
            {value:0,label:'男'},
            {value:1,label:'女'},
        ]
        let errors;
        const { value } =this.state;
        const { getFieldProps, getFieldError } = this.props.form;
        console.log('输出时间：',this.state.date)
        return (
            <div>
                 <Header {...this.props} headerTxt="修改游客信息" />
                 <div className='custom-nav-sibling-top custom-form'>
                       
                        <NoticeBar mode="closable" icon={<Icon type="check-circle-o" size="xxs" />}>
                        温馨提示：1.2米以下儿童游客类型请选择【儿童】，无需填写身份证号~
                        </NoticeBar>
                        <WhiteSpace size="lg" />
                        <List>
                        <InputItem
                            {...getFieldProps('name',{rules:[{required:true,message:'姓名不能为空'},{min: 13, message: '11位手机号码'}]})}
                            clear
                            placeholder='请输入姓名'
                            error={(errors = getFieldError('name'))}
                            ref={el => this.autoFocusInst = el}
                        >姓名</InputItem>
                        <Item
                            extra={
                            <div className="opt">
                                <input className="magic-radio" {...getFieldProps('sex')} type="radio" name="radio" value="0" id='r1' /><label htmlFor="r1">男</label>
                                <input className="magic-radio" {...getFieldProps('sex')} type="radio" name="radio" value="1" id='r2' /><label htmlFor="r2">女</label>
                            </div>
                            }
                        >
                        性别
                        </Item>
                        <DatePicker

                            {...getFieldProps('date')} 
                            mode="date"
                            title="Select Date"
                            extra="Optional"
                            value={this.state.date}
                            onChange={date => this.setState({ date })}
                        >
                        <List.Item arrow="horizontal">生日</List.Item>
                        </DatePicker>
                        <Item
                            extra={
                            <select {...getFieldProps('class')} defaultValue="">
                                <option value="">选择类型</option>
                                <option value="1">儿童</option>
                                <option value="2">成年人</option>
                                <option value="3">老人</option>
                            </select>
                        }
                        >
                        游客类型
                        </Item>
                        <InputItem
                            {...getFieldProps('Idcard',{rules:[{required:true}]})}
                            clear
                            error={errors=getFieldError('Idcard')}
                            placeholder='请输入身份证号'
                            ref={el => this.autoFocusInst = el}
                        >身份证号</InputItem>
                        <InputItem
                            {...getFieldProps('phone',{rules:[{required:true}]})}
                            clear
                            error={errors=getFieldError('phone')}
                            placeholder='请输入手机号'
                            ref={el => this.autoFocusInst = el}
                        >手机号</InputItem>
                        <List.Item>
                            <div
                            style={{ width: '100%', color: '#108ee9', textAlign: 'center' }}
                            >
                               <Button onClick={this.onSubmit}>保存</Button>
                            </div>
                        </List.Item>
                        </List>
                 </div>
            </div>
        )
    }
}
const indexWrapper = createForm()(Index);
export default indexWrapper;