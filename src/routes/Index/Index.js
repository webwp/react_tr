import React, { Component } from 'react';
import { connect } from 'dva'

import Search from './Search';
import IndexGrid from './IndexGrid';
import Message from './Message';
import Ad from './Ad';
import Shortcut from './Shortcut'
import Information from './Information'

//var top = document.body.scrollTop || document.documentElement.scrollTop || window.pageYOffset;
@connect((state)=>({
    index : state.index
}))
class Index extends Component {

    componentWillMount(){
        const { dispatch } = this.props;
        //获取资讯内容
        dispatch({
            type:'index/news',
            payload:{page:1,per_page:5}
        })

    }
    
    render(){
        return (
            <div style={{background:"#f6f6f6"}}>
                <Search />
                <Ad />
                <IndexGrid />
                {/* 服务提醒需要登录才能访问 */}
                {/* <Message /> */}
                
                <Shortcut />
                {/* 资讯 */}
                {this.props.index.news==null ? '' : <Information {...this.props.index.news} />}
                
                <div className="line-Division"><span>我是底线君</span></div>
            </div>
        )
    }
}

export default Index;