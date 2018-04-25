import React , {Component} from "react";

import { TabBar,NavBar, Icon } from 'antd-mobile';
import { Redirect, Route, Switch } from 'dva/router';
import { connect } from 'dva';
import Index from './Index/index';



class IndexPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: '',
      hidden: false,
      fullScreen: false,
    };
  }


  renderContent(pageText) {
    return (
      <div style={{ backgroundColor: 'white', height: '100%' }}>
        <div>
            {pageText}
        </div>
      </div>
    );
  }

  render() {
    return(<div>fuuu</div>)
  }
}

export default IndexPage;