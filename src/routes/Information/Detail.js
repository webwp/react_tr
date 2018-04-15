import React , { Component } from 'react'
import { Flex, WhiteSpace } from 'antd-mobile';

import Header from '../../components/Other/Header'

class Index extends Component{
    render(){
        return (
            <div>
                <Header {...this.props} headerTxt="资讯详情" />
                <div className="flex-container"  style={{padding:'45px 15px',position: 'relative',overflow: 'auto',height:'100%'}}>
                    <h2 className="txt-c mt20">此处着重列出升级中的不兼容变化和推荐改动。所有变动请见 Changelog</h2>
                    <div className='txt-color-assist-sm fz-mini-sm txt-c box-border-bottom'>2018-04-12 </div>
                    <div className="txt-color-stage fz-weak-sm box-containt">
                    3月29日、30日，中央车改办在甘肃省兰州市召开地方公务用车制度改革现场会。发改委网站 图
中央车改即将收官。
据国家发改委10日消息，3月29日、30日，中央车改办在甘肃省兰州市召开地方公务用车制度改革现场会。
久未露面的中央车改办这次发布了大消息：今年6月底前全面完成地方企事业单位车改。
这意味着2014年7月启动的本次公车改革已经进入收官阶段。
公车改革完成时间表
本次公车改革始于2014年7月16日。
当日，中办、国办发布《关于全面推进公务用车制度改革的指导意见》和《中央和国家机关公务用车制度改革方案》，公车改革正式启动。
中央公务用车制度改革领导小组同时成立。
它由国家发改委、国管局、中直管理局牵头，财政部、人社部、审计署等部门参加，主要负责指导、协调全国公务用车制度改革工作，制定改革方案及配套政策并组织实施。
中央和国家机关企业事业单位的方案由该小组牵头制定。省区市的车改方案也经它批准后才能实施。
此轮中央车改，主要任务包括改革公务交通保障方式、合理确定公务交通补贴标准、安置司勤人员和处置公务车。按照前述意见的安排，2014年底前基本完成中央和国家机关公车改革，2015年年底前基本完成地方党政机关公车改革，用2至3年时间全面完成公务用车制度改革。
政知见梳理改革进度发现，虽与计划相比略有延迟，但仍是稳步推进。
                    </div>
                </div>
            </div>
        )
    }
}
export default Index;