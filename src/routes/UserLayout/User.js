import React,{Component} from "react";
import {connect} from 'dva';
import {Redirect} from 'dva/router'
import User from '../../components/User';
import UserHeader from './UserHeader';

@connect((state)=>({
    user:state.user,
}))
class Index extends Component{
    render(){
        return(
        <div className="result-example custom custom-bg">
           <UserHeader {...this.props} />
           <User {...this.props} /> 
        </div>
        )
    }
}

export default Index;