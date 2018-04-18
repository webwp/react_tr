import React , { Component } from 'react'
import { Flex, WhiteSpace } from 'antd-mobile';

import Header from '../../components/Other/Header'

class Index extends Component{
    render(){
        const data = this.props.data
        return (
                <div className="flex-container"  style={{padding:'45px 15px',position: 'relative',overflow: 'auto',height:'100%'}}>
                    <h2 className="txt-c mt20">{data.title}</h2>
                    <div className='txt-color-assist-sm fz-mini-sm txt-c box-border-bottom'>{data.publish_time}</div>
                    <div className="txt-color-stage fz-weak-sm box-containt">
                         <p className="txt-c">{data.image ? <img src={data.image} />: ''}</p>
                         {data.content}
                    </div>
                </div>
        )
    }
}
export default Index;