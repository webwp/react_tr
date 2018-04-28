import React , { Component } from 'react';
import { NoticeBar, WhiteSpace, Icon ,List , InputItem , Switch , Stepper , Range , Button , DatePicker,Radio,Flex,Toast,Picker} from 'antd-mobile';
import { createForm } from 'rc-form';
import { connect } from 'dva';
import Page from '../../../components/Page'


const Item = List.Item;
const nowTimeStamp = Date.now();
const now = new Date(nowTimeStamp);
const seasons = [
   
    [
      {
        label: '男',
        value: 'male',
      },
      {
        label: '女',
        value: 'female',
      },
    ],
  ];

  const sType = [
    [
      {
        label: '成年人',
        value: '1',
      },
      {
        label: '儿童(2~12)',
        value: '2',
      },
      {
        label: '幼童(0~2)',
        value: '3',
      },
    ],
  ];
// GMT is not currently observed in the UK. So use UTC now.
const utcNow = new Date(now.getTime() + (now.getTimezoneOffset() * 60000));
@connect(state => ({
    addUser:state.contactInfo
}))
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
        this.setState({
          value,
        });
    };
    onSubmit = ()=>{
            this.props.form.validateFields((error,value)=>{
                
                if(!error){
                    //日期转换
                    let d = new Date(value.birthday);
                    value.birthday = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
                    value.type = parseInt(value.type)
                    value.gender = String(value.gender)
                    const { dispatch } = this.props;
                    dispatch({
                        type:'contactInfo/adds',
                        payload:{...value}
                    })
                }
            })
    }
    render(){
        //身份证正则
        const idCar = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
        const { addUser,history } = this.props;
        let errors;
        const { value } =this.state;
        const { getFieldProps, getFieldError } = this.props.form;
        const right = [<i onClick={this.onSubmit}>保存</i>];
        return (
            <Page title="新增常用游客" history={history} right={right}>
                 <div className=' custom-form'>
                       
                        <NoticeBar mode="closable" icon={<Icon type="check-circle-o" size="xxs" />}>
                        温馨提示：1.2米以下儿童游客类型请选择【儿童】，无需填写身份证号~
                        </NoticeBar>
                        <WhiteSpace size="lg" />
                        <List>
                        <InputItem
                            {...getFieldProps('realname',{rules:[{required:true,message:'姓名不能为空'}]})}
                            clear
                            placeholder='请输入姓名'
                            error={(errors = getFieldError('realname'))}
                            ref={el => this.autoFocusInst = el}
                        >姓名</InputItem>
                        
                        
                        <InputItem
                            {...getFieldProps('id_no',{rules:[{required:true},{pattern:idCar}]})}
                            clear
                            error={errors=getFieldError('id_no')}
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
                        <DatePicker
                            {...getFieldProps('birthday', {
                                initialValue: this.state.value,
                                
                            })}
                            mode="date"
                        >
                            <List.Item arrow="horizontal">生日</List.Item>
                        </DatePicker>
                        <Picker
                            data={seasons}
                            title="选择性别"
                            cascade={false}
                            //extra="选择"
                            value={this.state.sValue}
                            onChange={v => this.setState({ sValue: v })}
                            onOk={v => this.setState({ sValue: v })}
                            {...getFieldProps('gender')}
                        >
                            <List.Item arrow="horizontal">性别</List.Item>
                        </Picker>
                        <Picker
                            data={sType}
                            title="选择类型"
                            cascade={false}
                           // extra={}
                            value={ this.state.sType }
                            onChange={v => this.setState({ sType: v })}
                            onOk={v => this.setState({ sType: v })}
                             {...getFieldProps('type')}
                        >
                            <List.Item arrow="horizontal">游客类型</List.Item>
                        </Picker>
                        {/* <List.Item>
                            <div
                            style={{ width: '100%', color: '#108ee9', textAlign: 'center' }}
                            >
                               <Button onClick={this.onSubmit}>保存</Button>
                            </div>
                        </List.Item> */}
                        </List>
                        <div className="txt-color-stage pad15 mt30" >
                            <span style={{color:'red'}}>*</span>  温馨提示：根据旅游局相关规定，购买船票需要实名制，请认真填写您的游客信息
                        </div>
                 </div>
            </Page>
        )
    }
}
const indexWrapper = createForm()(Index);
export default indexWrapper;