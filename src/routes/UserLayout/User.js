import React,{Component} from "react";
import {connect} from 'dva';
import {Redirect} from 'dva/router'
import User from '../../components/User';

@connect(state=>({
    user:state.user
}))
class Index extends Component{
    render(){
        console.log("ssfsf",this.props)
        return(
           <User {...this.props} /> 
        )
    }
}

export default Index;