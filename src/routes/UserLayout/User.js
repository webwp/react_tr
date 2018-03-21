import React,{Component} from "react";
import {connect} from 'dva';
import {Redirect} from 'dva/router'
import User from '../../components/User';

@connect(state=>({
    app:state.app
}))
class Index extends Component{
    render(){
        const { userInfo } = this.props.app;
        if(userInfo == null || userInfo == ''){
            return <Redirect to='/login' />;
        }
        return(
           <User {...this.props} /> 
        )
    }
}

export default Index;