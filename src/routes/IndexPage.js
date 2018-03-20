import React , {Component} from "react";

import { TabBar } from 'antd-mobile';
import Index from './Index';
import {connect} from 'dva';
import User from './UserLayout/User';
import {Redirect, Route, Switch} from 'dva/router';
import { NavBar, Icon } from 'antd-mobile';


// @connect(state=>({
//   app:state.app
// }))
class TabBarExample extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'blueTab',
      hidden: false,
      fullScreen: false,
      userInfo:''
    };
  }

  renderContent(pageText) {
    return (
      
      <div style={{ backgroundColor: 'white', height: '100%', textAlign: 'center' }}>
        <div style={{ paddingTop: 60 }}>
            {pageText}
        </div>
      </div>
    );
  }

  componentWillMount(){
    const userInfo = localStorage.getItem('UTRAFF');
    if(userInfo){
        //this.setState({userInfo:JSON.parse(userInfo)});
    }
  }

  render() {
    if(!this.state.userInfo){
        //return <Switch><Redirect to="/login"/></Switch>
    }else{
        return <Switch><Redirect to="/"/></Switch>
    }
    return (
      <div style={this.state.fullScreen ? { position: 'fixed', height: '100%', width: '100%', top: 0 } : { position: 'fixed', height: '100%', width: '100%', top: 0 }}>
        <TabBar
          unselectedTintColor="#949494"
          tintColor="#33A3F4"
          barTintColor="white"
          hidden={this.state.hidden}
        >
          <TabBar.Item
            title="首页"
            key="Life"
            icon={<div style={{
              width: '22px',
              height: '22px',
              background: 'url(../src/assets/home.png) center center /  21px 21px no-repeat' }}
            />
            }
            selectedIcon={<div style={{
              width: '22px',
              height: '22px',
              background: 'url(../src/assets/home_light.png) center center /  21px 21px no-repeat' }}
            />
            }
            selected={this.state.selectedTab === 'blueTab'}
            onPress={() => {
              this.setState({
                selectedTab: 'blueTab',
              });
            }}
            data-seed="logId"
          >
            <NavBar
                mode="dark"
                icon={<Icon type="home" />}
                onLeftClick={() => console.log('onLeftClick')}
                rightContent={[
                  <Icon key="0" type="search" style={{ marginRight: '16px' }} />,
                  <Icon key="1" type="ellipsis" />,
                ]}
            >智慧出行-首页</NavBar>
            <Index />
          </TabBar.Item>
          <TabBar.Item
            icon={
              <div style={{
                width: '22px',
                height: '22px',
                background: 'url(https://gw.alipayobjects.com/zos/rmsportal/BTSsmHkPsQSPTktcXyTV.svg) center center /  21px 21px no-repeat' }}
              />
            }
            selectedIcon={
              <div style={{
                width: '22px',
                height: '22px',
                background: 'url(https://gw.alipayobjects.com/zos/rmsportal/ekLecvKBnRazVLXbWOnE.svg) center center /  21px 21px no-repeat' }}
              />
            }
            title="模块1"
            key="Koubei"
            
            selected={this.state.selectedTab === 'redTab'}
            onPress={() => {
              this.setState({
                selectedTab: 'redTab',
              });
            }}
            data-seed="logId1"
          >
          <NavBar
              mode="dark"
              icon={<Icon type="home" />}
              // onLeftClick={() => console.log('onLeftClick')}
              // rightContent={[
              //   <Icon key="0" type="search" style={{ marginRight: '16px' }} />,
              //   <Icon key="1" type="ellipsis" />,
              // ]}
          >模块1</NavBar>
          <Index />
           
          </TabBar.Item>
          <TabBar.Item
            icon={{ uri: 'https://zos.alipayobjects.com/rmsportal/psUFoAMjkCcjqtUCNPxB.svg' }}
            selectedIcon={{ uri: 'https://zos.alipayobjects.com/rmsportal/IIRLrXXrFAhXVdhMWgUI.svg' }}
            title="会员中心"
            key="my"
            selected={this.state.selectedTab === 'yellowTab'}
            onPress={() => {
              this.setState({
                selectedTab: 'yellowTab',
              });
            }}
          >
          <NavBar
              mode="dark"
              icon={<Icon type="home" />}
              onLeftClick={() => console.log('onLeftClick')}
              // rightContent={[
              //   <Icon key="0" type="search" style={{ marginRight: '16px' }} />,
              //   <Icon key="1" type="ellipsis" />,
              // ]}
          >用户中心</NavBar>
            <User />
          </TabBar.Item>
        </TabBar>
      </div>
    );
  }
}

export default TabBarExample;