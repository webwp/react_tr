import React , { Component } from 'react';
import { connect } from 'dva'
import { NoticeBar, WhiteSpace, Icon ,List , InputItem , Switch , Stepper , Range , Button , DatePicker,Radio,Flex,Toast,Picker} from 'antd-mobile';
import { createForm } from 'rc-form';

import Page from '../../../components/Page';


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
@connect( state => ({
    editor:state.contactInfo
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
        detail:null,
        checked:null
    }
    validateIdp = (rule, date, callback) => {
        if (isNaN(Date.parse(date))) {
          callback(new Error('Invalid Date'));
        } else {
          const cDate = new Date(date);
          const newDate = new Date(+this.state.dpValue);
          newDate.setFullYear(cDate.getFullYear());
          newDate.setMonth(cDate.getMonth());
          newDate.setDate(cDate.getDate());
          // this.setState({ dpValue: newDate });
          setTimeout(() => this.props.form.setFieldsValue({ dp: newDate }), 10);
          callback();
        }
      }
    componentWillMount(){
        const { dispatch , match } = this.props;
        dispatch({
            type:'contactInfo/getPassengers',
            payload:{method:'GET',id:match.params.id}
        });
        
    }
    onChange = (value) => {
        this.setState({
          value,
        });
    };
    onSubmit = ()=>{
            this.props.form.validateFields((error,value)=>{
                value.type =value.type ? parseInt((value.type)[0]) : null;
                value.gender =value.gender ? ((value.gender)[0]) : null;
                const { dispatch,match } = this.props;
                dispatch({
                    type:'contactInfo/getPassengers',
                    payload:{method:'PATCH',id:match.params.id,...value}
                })
            })
    }
    componentDidMount(){
        
        //this.props.form.setFieldsValue(this.state.detail)
    }
    onHandleRadio = (e)=>{
        //alert(e.target.checked)
    }
    render(){
        const { editor,history } = this.props;
        const { detail } = editor;
        if( detail === null ){
            return false;
        }

        
        let errors;
        const { value } =this.state;
        const { getFieldProps, getFieldError,setFieldsValue } = this.props.form;
        const right = [<span className="txt-color-big" onClick={this.onSubmit}>保存</span>];

        const others = {mode:'light'}
        return (
            <Page title="修改常用联系人" history={history} right={right} _bool={true} others={others}>
                 <div className='custom-form'>
                       
                        <NoticeBar mode="closable" icon={<Icon type="check-circle-o" size="xxs" />}>
                        温馨提示：1.2米以下儿童游客类型请选择【儿童】，无需填写身份证号~
                        </NoticeBar>
                        <WhiteSpace size="lg" />
                        <List>
                        <InputItem
                            {...getFieldProps('realname',{initialValue:detail.data.realname,rules:[{required:true,message:'姓名不能为空'}]})}
                            // {...setFieldsValue({realname:detail.data.realname})}
                            clear
                            placeholder='请输入姓名'
                            error={(errors = getFieldError('realname'))}
                            ref={el => this.autoFocusInst = el}
                        >姓名</InputItem>
                        <InputItem
                            {...getFieldProps('id_no',{initialValue:detail.data.id_no,rules:[{required:true}]})}
                            clear
                            error={errors=getFieldError('id_no')}
                            placeholder='请输入身份证号'
                            ref={el => this.autoFocusInst = el}
                        >身份证号</InputItem>
                        <InputItem
                            {...getFieldProps('phone',{initialValue:detail.data.phone,rules:[{required:true}]})}
                            clear
                            error={errors=getFieldError('phone')}
                            placeholder='请输入手机号'
                            ref={el => this.autoFocusInst = el}
                        >手机号</InputItem>
                        <InputItem
                            placeholder="must be the format of YYYY-MM-DD"
                            error={!!getFieldError('birthday')}
                            {...getFieldProps('birthday', {
                                initialValue: detail.data.birthday,
                                rules: [
                                { validator: this.validateIdp },
                                ],
                            })}
                        >生日</InputItem>
                        <Picker
                            data={seasons}
                            title="选择性别"
                            cascade={false}
                            //extra="选择"
                            value={this.state.sValue}
                            onChange={v => this.setState({ sValue: v })}
                            onOk={v => this.setState({ sValue: v })}
                            {...getFieldProps('gender',{initialValue:[ detail.data.gender || null ]})}
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
                             {...getFieldProps('type',{initialValue:[ String(detail.data.category_id) || null]})}
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
                        <div className="txt-color-stage pad15 mt30">
                            <span style={{color:'red'}}>*</span>  温馨提示：根据旅游局相关规定，购买船票需要实名制，请认真填写您的游客信息
                        </div>
                 </div>
            </Page>
        )
    }
}
const indexWrapper = createForm()(Index);
export default indexWrapper;