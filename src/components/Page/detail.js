import React , { Component } from 'react'
import { Flex, WhiteSpace } from 'antd-mobile';

import Config from '../../config'

import Header from '../../components/Other/Header'

class Index extends Component{
    render(){
        const data = this.props.data
        return (
                <div className="flex-container"  style={{padding:'15px',position: 'relative',overflow: 'auto',height:'100%',background:'#fff',minHeight:'600px'}}>
                    <h2 className="txt-l fz-weak-sm">{data.title}</h2>
                    <div className='txt-color-assist-sm fz-small-sm txt-l'>{data.publish_time}</div>
                    <div className="txt-color-stage fz-mini-sm box-containt">
                         {data.content}
                    </div>
                </div>
        )
    }
}
export default Index;