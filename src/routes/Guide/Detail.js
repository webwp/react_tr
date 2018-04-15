import React , { Component } from 'react'
import { Flex, WhiteSpace } from 'antd-mobile';

import Header from '../../components/Other/Header';
import Detail from '../../components/Other/Detail';

class Index extends Component{
    render(){
        return (
            <div>
                <Header {...this.props} headerTxt="指南详情" />
                <Detail />
            </div>
        )
    }
}
export default Index;