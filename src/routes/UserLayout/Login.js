import React,{Component} from 'react';
import { StickyContainer, Sticky } from 'react-sticky';
import {connect} from 'dva';

import {Redirect} from 'dva/router';
import { List, InputItem, WhiteSpace,Button,Flex,Checkbox,Toast,Tabs } from 'antd-mobile';
import { createForm } from 'rc-form';

import LoginCode from '../../components/User/loginCode';
import LoginPassword from '../../components/User/loginPassword';
import Page from '../../components/Page';


const tabs = [
  { title: '快捷登录' },
  { title: '密码登录' },
];
function renderTabBar(props) {
  return (<Sticky>
    {({ style }) => <div style={{ ...style, zIndex: 1 }}><Tabs.DefaultTabBar {...props} /></div>}
  </Sticky>);
}

@connect(state => ({
  app: state.user
}))



class Index extends Component {
    submit = (value) => {
      if(value){
        value.phone = value.phone.replace(/\s+/g,"");
        let dispatch_typs = value.password ? 'user/login' : 'user/loginCode';
        const { dispatch } = this.props;
        dispatch({
          type: dispatch_typs,
          payload: {
            ...value
          }
        });
      }
    }
    handleMessage(e) {
      this.setState({webViewData: e.nativeEvent.data});
    }
    loadingToast(msg) {
      Toast.loading(msg, 1, (msg) => {
      });
    }
    loadingFaile(msg) {
        Toast.fail(msg, 1);
    }

    render(){
        const { app , history } = this.props;
        if(app.res){
           app.res.code==0 ? this.props.history.goBack():Toast.info(app.res.msg);
        }
        if( app.userInfo ){
          
          return <Redirect to='/' />;
        }
        const others = {mode:'light'}
        return(
          <Page title="用户登录" others={others} history={history} _bool={true}>
          <div className="loginBox custom">
            <StickyContainer className='custom-pad-0-25 mt20' style={{height:'100%'}}>
                <Tabs tabs={tabs}
                  initalPage={'t2'}
                  renderTabBar={renderTabBar}
                  tabBarUnderlineColor='#39bc30'
                  tabBarUnderlineStyle={{ borderColor:'#39bc30'}}
                  tabBarActiveTextColor='#39bc30' 
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center',padding:'15px 0', backgroundColor: '#fff',marginTop:'30px' }}>
                      <LoginCode {...this.props} onSubmit={this.submit.bind(this)} />
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center',padding:'15px 0', backgroundColor: '#fff',marginTop:'30px' }}>
                      <LoginPassword {...this.props} onSubmit={this.submit.bind(this)}/>
                  </div>
                  
                </Tabs>
                
            </StickyContainer>
            </div>
                
          </Page>
        );
    }
}

export default Index;