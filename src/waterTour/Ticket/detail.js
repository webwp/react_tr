import React , { Component } from 'react';
import { List,WhiteSpace,Tabs } from 'antd-mobile';

import { StickyContainer, Sticky } from 'react-sticky';
import Page from "../../components/Page";

import Banner from "../../components/Banner";

const Item = List.Item;
const Brief = Item.Brief;
function renderTabBar(props) {
    return (<Sticky>
      {({ style }) => <div style={{ ...style, zIndex: 1 }}><Tabs.DefaultTabBar {...props} /></div>}
    </Sticky>);
  }
  const tabs = [
    { title: '购票' },
    { title: '预订须知' },
    { title: '景点介绍' },
  ];
class Detail extends Component {
    render(){
        const { history } = this.props;
        const someThing = {canGoBack:true}
        const others = {mode:'light'};
        return(
            <Page title='预订船票' history={history} someThing={someThing} _bool={true} others={others}>
                 <Banner />
                 <List className="custom-detail-map">
                 <h3 className="detail-title">民生码头</h3>
                 <Item
                    style={{position:'relative'}}
                    arrow='empty'
                    thumb={<i className="iconfont icon-ditu3" style={{fontSize:'10px',color:'#bbb'}}></i>}
                    multipleLine
                >
                    广西南宁市兴宁区江北大道北大桥南宁港 <Brief>（大辉越南螃蟹脚）</Brief>
                    <i className="iconfont icon-phone right" style={{color:"#39bc30",position:'absolute',right:'10px',top:'15px'}}></i>
                </Item>
                </List>
                <WhiteSpace />
                <StickyContainer>
                    <Tabs tabs={tabs}
                        initalPage={'t2'}
                        renderTabBar={renderTabBar} 
                        tabBarUnderlineColor='#39bc30'
                        tabBarUnderlineStyle={{ borderColor:'#39bc30'}}
                        tabBarActiveTextColor='#39bc30' 
                    >
                        <div style={{  backgroundColor: '#fff' }}>
                            <div style={{padding:'15px'}}>
                                <h4>选择出游日期</h4>
                            </div>
                        </div>
                        <div style={{ backgroundColor: '#fff' }}>
                        Content of second tab
                        </div>
                        <div style={{ /*display: 'flex', alignItems: 'center', justifyContent: 'center', height: '250px', */backgroundColor: '#fff' }}>
                        
                            <div style={{padding:'15px'}}>
                                <p>设计要求：</p>

                                <p>1、图片取值于组成该航班的【码头图片】+【游船图片】；</p>

                                <p>2、【电话】预订船票界面的所有电话均为水上旅游的【客服电话】；</p>

                                <p>3、【购票】</p>

                                <p>    1）切换【出游日期】，则航班列表显示该日期有排期的航班信息；</p>
                                <p>
                                    2）航班列表显示字段：【航班名称】+【航程时间】+【成人票价格】+【预订按钮】</p>
                                    <p>
                                    3）点击【预订】按钮，则跳转到订单信息填写页面。</p>
                                    <p>
                                4、【购票】【预订须知】【游船介绍】tab切换；</p>
                                <p>
                                5、【预订须知】和【游船介绍】为公共模块。</p>
                                <p>设计要求：</p>

                                <p>1、图片取值于组成该航班的【码头图片】+【游船图片】；</p>

                                <p>2、【电话】预订船票界面的所有电话均为水上旅游的【客服电话】；</p>

                                <p>3、【购票】</p>

                                <p>    1）切换【出游日期】，则航班列表显示该日期有排期的航班信息；</p>
                                <p>
                                    2）航班列表显示字段：【航班名称】+【航程时间】+【成人票价格】+【预订按钮】</p>
                                    <p>
                                    3）点击【预订】按钮，则跳转到订单信息填写页面。</p>
                                    <p>
                                4、【购票】【预订须知】【游船介绍】tab切换；</p>
                                <p>
                                5、【预订须知】和【游船介绍】为公共模块。</p>
                            </div>

                        </div>
                    </Tabs>
                </StickyContainer>
                <WhiteSpace />
                <div style={{padding:'15px',background:'#fff'}}>
                    <div className="custom-title-ls">
                        <i className='iconfont icon-yooxi' style={{color:'#39bc30'}}></i>预订须知
                    </div>
                </div>
                <WhiteSpace />
                <div style={{padding:'15px',background:'#fff'}}>
                    <div className="custom-title-ls">
                        <i className='iconfont icon-yooxi' style={{color:'#39bc30'}}></i>景点介绍
                    </div>
                </div>
            </Page>
        )
    }
}

export default Detail;