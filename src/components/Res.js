import React , {Component} from 'react';
import { Result, Icon, WhiteSpace } from 'antd-mobile';

import {Redirect} from 'dva/router';

const myImg = src => <img src={src} className="spe am-icon am-icon-md" alt="" />;

class Index extends Component{
    constructor(){
        super();
        this.state = {
            times:3,
            isT:false

        }
    }
    componentWillMount(){
        this._localtime();
    }
    _localtime(){
        let ntime = 3,_this=this;
        let index = setInterval(function(){
           ntime = ntime-1;
           _this.setState({times:ntime});
           if(ntime==0){
               clearInterval(index);
               _this.setState({isT:true});
           }
        },1000);
    }
    render(){
        if(this.state.isT){
            return <Redirect to="/login" />
        } 
        return (
            <Result
                img={<Icon type="check-circle" className="spe" style={{ fill: '#1F90E6' }} />}
                title="注册成功"
                message={"用户已经注册成功！"+this.state.times+"秒后返回登录"}
            />
        )
    }
}

export default Index;