import React , { Component } from 'react'
import { connect } from 'dva'
import { Flex, WhiteSpace } from 'antd-mobile';

import Page from '../../components/Page'
import Detail from '../../components/Page/detail'
@connect(state=>({
    detail:state.index
}))
class Index extends Component{
    componentWillMount(){
        const { dispatch,match }=this.props;
        dispatch({
            type:'index/detail',
            payload:{...match.params}
        })
    }
    render(){
        const { detail , history } = this.props;
        const { details } = detail;
        const data = details != null ? details.data : {};
        return (
            <Page title="资讯详情" history={this.props.history} >
                <Detail data={data} />
            </Page>
        )
    }
}
export default Index;