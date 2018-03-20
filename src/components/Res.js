import React , {Component} from 'react';
import { Result, Icon, WhiteSpace } from 'antd-mobile';

const myImg = src => <img src={src} className="spe am-icon am-icon-md" alt="" />;

class Index extends Component{
    render(){
        return (
            <Result
                img={<Icon type="check-circle" className="spe" style={{ fill: '#1F90E6' }} />}
                title="注册成功"
                message="新用户已经注册成功！感谢您的使用"
            />
        )
    }
}

export default Index;