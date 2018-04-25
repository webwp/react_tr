import React,{Component} from 'react';
import { TabBar, WhiteSpace } from 'antd-mobile';

import IndexPage from './Index/index';
import Found from './Found';
import Other from './Other'


class Index extends Component{
    constructor(props) {
        super(props);
        this.state = {
          selectedTab: 'blueTab',
          hidden: false,
          fullScreen: true,
        };
    }
    renderContent(pageText) {
        return (
          <div style={{ height: '100%' }}>
              {pageText}
          </div>
        );
    }
    
    render(){
        return(
            <div style={this.state.fullScreen ? { position: 'fixed', height: '100%', width: '100%', top: 0 } : { height: 400 }}>
        <TabBar
          unselectedTintColor="#949494"
          tintColor="#33A3F4"
          barTintColor="white"
          hidden={this.state.hidden}
        >
          <TabBar.Item
            title="首页"
            key="index"
            icon={<i className="iconfont icon-shouye"></i>}
            selectedIcon={<i className="iconfont icon-shouye"></i>}
            selected={this.state.selectedTab === 'blueTab'}
            // badge={1}
            onPress={() => {
              this.setState({
                selectedTab: 'blueTab',
              });
            }}
            data-seed="logId"
          >
            {this.renderContent(<IndexPage {...this.props} />)}
          </TabBar.Item>
          <TabBar.Item
            icon={<i className="iconfont icon-faxian"></i>}
            selectedIcon={<i className="iconfont icon-faxian"></i>}
            title="发现"
            key="Koubei"
            //badge={'new'}
            selected={this.state.selectedTab === 'redTab'}
            onPress={() => {
              this.setState({
                selectedTab: 'redTab',
              });
            }}
            data-seed="logId1"
          >
            {this.renderContent(<Found  {...this.props}/>)}
          </TabBar.Item>
          <TabBar.Item
            icon={<i className="iconfont icon-dingdan"></i>}
            selectedIcon={<i className="iconfont icon-dingdan"></i>}
            title="订单"
            key="Friend"
            //dot
            selected={this.state.selectedTab === 'greenTab'}
            onPress={() => {
              this.setState({
                selectedTab: 'greenTab',
              });
            }}
          >
            {this.renderContent(<Other  {...this.props}/>)}
          </TabBar.Item>
          <TabBar.Item
            icon={<i className="iconfont icon-kefu"></i>}
            selectedIcon={<i className="iconfont icon-kefu"></i>}
            title="客服"
            key="my"
            selected={this.state.selectedTab === 'yellowTab'}
            onPress={() => {
              this.setState({
                selectedTab: 'yellowTab',
              });
            }}
          >
            {this.renderContent('My')}
          </TabBar.Item>
        </TabBar>
      </div>
        )
    }
}
export default Index;