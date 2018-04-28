import React , { Component } from 'react';
import { List,TextareaItem ,Button,WhiteSpace,Toast} from "antd-mobile";
import { createForm } from 'rc-form';

import Page from '../../../components/Page';


class Index extends Component{
    onSubmit =(value) => {
        this.props.form.validateFields((error, value) => {
            if(!error){
                Toast.info('提交成功',2)
            }else{
                const { count } = error;
                Toast.info(count.errors[0].message,2)
            }
        });
    }
    render(){
        const page = {title:'意见反馈',history:this.props.history};
        const { getFieldProps } = this.props.form;
        return(
            <Page {...page}>
                <div className='content'>
                    <List renderHeader={() => '您的反馈是我们前进最大的动力'}>
                    <TextareaItem
                        {...getFieldProps('feelback', {rules:[{required:true,message:'反馈的内容不能为空'}]
                        })}
                        placeholder="请输入反馈的内容"
                        rows={5}
                        count={100}
                    />
                    </List>
                    <WhiteSpace />
                    <List style={{padding:"12.5px"}}>
                        <Button type="primary" onClick={this.onSubmit}>提交</Button>
                    </List>
                </div>
            </Page>
        )
    }
}
const indexForm = createForm()(Index);
export default indexForm;