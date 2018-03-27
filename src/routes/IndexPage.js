import React , {Component} from "react";

import { TabBar,NavBar, Icon } from 'antd-mobile';
import { Redirect, Route, Switch } from 'dva/router';
import { connect } from 'dva';
import User from './UserLayout/User';
import Index from './Index/Index';
import Ex from './ex';
//import IndexPage from '../models/IndexPage';


/*
*将IndexPage封装为fun
*将封装的oIndexPage关联当前组件
*/
const oIndexPage =(IndexPage)=>{
  return IndexPage
}
//@oIndexPage
@connect(state =>({
  page:state.indexPage
}))
class TabBarExample extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: '',
      hidden: false,
      fullScreen: false,
    };
  }

//   componentDidMount(){
//     window.addEventListener("wheel", this.ScollPostion)
// }
// myFunction = () => {
//     var top = document.body.scrollTop || document.documentElement.scrollTop || window.pageYOffset;
//     console.log(top)
// }
// ScollPostion() {
//     var t, l, w, h;
//     if (document.documentElement && document.documentElement.scrollTop) {
//         t = document.documentElement.scrollTop;
//         l = document.documentElement.scrollLeft;
//         w = document.documentElement.scrollWidth;
//         h = document.documentElement.scrollHeight;

//         console.log(111)
//     } else if (document.body) {
//         t = document.body.scrollTop;
//         l = document.body.scrollLeft;
//         w = document.body.scrollWidth;
//         h = document.body.scrollHeight;
//     }
//     console.log(t);
//     return {
//         top: t,
//         left: l,
//         width: w,
//         height: h
//     };
    
// }

  renderContent(pageText) {
    return (
      <div style={{  }}>
        <div>
            {pageText}
        </div>
      </div>
    );
  }

  render() {
    const { dispatch,page } = this.props;
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
            icon={<i className="iconfont icon-shouye1 fz-md"></i>}
            selectedIcon={<i className="iconfont icon-shouye1 fz-md"></i>}
            selected={this.props.page.selectedTab === 'blueTab'}
            onPress={() => {
              dispatch({
                type:'indexPage/tab',
                payload:{selectedTab:'blueTab'}
              })
            }}
            data-seed="logId"
          >
            {this.renderContent(<Index />)}
          </TabBar.Item>
          <TabBar.Item
            icon={<i className="iconfont icon-saoyisao fz-md"></i>}
            selectedIcon={<i className="iconfont icon-saoyisao fz-md"></i>}
            title="扫码/支付"
            key="Koubei"
            
            selected={this.props.page.selectedTab === 'redTab'}
            onPress={() => {
              dispatch({
                type:'indexPage/tab',
                payload:{selectedTab:'redTab'}
              })
            }}
            data-seed="logId1"
          >
           {this.renderContent(<Ex />)}
          </TabBar.Item>
          <TabBar.Item
            icon={<i className="iconfont icon-account fz-md"></i>}
            selectedIcon={<i className="iconfont icon-account fz-md"></i>}
            title="会员中心"
            key="my"
            selected={this.props.page.selectedTab === 'yellowTab'}
            onPress={() => {
              dispatch({
                type:'indexPage/tab',
                payload:{selectedTab:'yellowTab'}
              })
            }}
          >
          <NavBar
              mode="dark"
              icon={<Icon type="home" />}
              onLeftClick={() => console.log('onLeftClick')}
          >用户中心</NavBar>
            
            {this.renderContent(<User />)}
          </TabBar.Item>
        </TabBar>
      </div>
    );
  }
}

export default TabBarExample;