import React from 'react';
import { Router, Route, Switch,routerRedux } from 'dva/router';
import dynamic from 'dva/dynamic';

const {ConnectedRouter} = routerRedux;
const setTitle = title => () => document.title = title;

function RouterConfig({ history , app }) {

  const error = dynamic({
    app,
    component: () => import('./routes/ex'),
  })
  const routes = [
    {
      path: '/input',
      component: () => import('./input'),
    },
    {
      path: '/',
      //models: () => [require('./models/IndexPage').default],
      models: () => [import('./models/IndexPage'),import('./models/Index'),import('./models/Message'),import('./models/Applications')],
      component: () => import('./routes/IndexPage'),
    },
    {
      path: '/moreapp',
      models: () => [require('./models/Applications').default],
      component: () => import('./routes/MoreApp'),
    },
    {
      path: '/user',
      //models: () => [require('./models/User').default],
      //models: () => [import('./models/User')],
      component: () => import('./routes/UserLayout/User'),
    },
    {
      path: '/user/coupons',  //红包卡券
      models: () => [require('./models/Coupons').default],
      component: () => import('./routes/UserLayout/Coupons/'),
    },
    {
      path: '/user/bill',  //账单
      models: () => [require('./models/Bill').default],
      component: () => import('./routes/UserLayout/Bill/'),
    },
    {
      path: '/user/bill/detail/:id',  //红包卡券
      component: () => import('./routes/UserLayout/Bill/detail'),
    },
    {
      path: '/user/contactinfo/',  //常用联系人
      models: () => [require('./models/ContactInfo').default],
      component: () => import('./routes/UserLayout/ContactInfo/index'),
    },
    {
      path: '/user/Contactinfo/add',  //常用联系人
      models: () => [require('./models/ContactInfo').default],
      component: () => import('./routes/UserLayout/ContactInfo/add'),
    },
    {
      path: '/user/Contactinfo/editor/:id',  //编辑常用联系人
      models: () => [require('./models/ContactInfo').default],
      component: () => import('./routes/UserLayout/ContactInfo/editor'),
    },
    {
      path: '/user/about',  //关于我们
      component: () => import('./routes/UserLayout/About/'),
    },
    {
      path: '/user/certification',  //用户认证
      component: () => import('./routes/UserLayout/Certification/'),
    },
    {
      path: '/user/next',  //用户认证
      component: () => import('./routes/UserLayout/Certification/next'),
    },
    {
      path: '/user/mycode',  //我的二维码
      component: () => import('./routes/UserLayout/MyCode/'),
    },
    {
      path: '/user/wallet',  //钱包
      component: () => import('./routes/UserLayout/Wallet/'),
    },
    {
      path: '/user/wallet/recharge',  //充值
      component: () => import('./routes/UserLayout/Wallet/recharge'),
    },
    {
      path: '/user/set',  //用户信息设置
      models: () => [require('./models/Setting').default],
      component: () => import('./routes/UserLayout/Set/'),
    },
    {
      path: '/user/feelback',  //意见反馈
      component: () => import('./routes/UserLayout/FeelBack/'),
    },
    {
      path: '/user/nickname',  //用户昵称设置
      models: () => [require('./models/Setting').default],
      component: () => import('./routes/UserLayout/Set/nickname'),
    },
    {
      path: '/user/repassword',  //用户信息设置
      models: () => [require('./models/Setting').default],
      component: () => import('./routes/UserLayout/Set/repassword'),
    },
    {
      path: '/reg',
      //models: () => [import('./models/User')],
      component: () => import('./routes/UserLayout/Reg'),
    },
    {
      path: '/login',
      //models: () => [import('./models/User')],
      component: () => import('./routes/UserLayout/Login'),
    },
    {
      path: '/agreement',     //用户协议
      //models: () => [import('./models/User')],
      component: () => import('./routes/Agreement'),
    },
    {
      path: '/test',
      //models: () => [import('./models/User')],
      component: () => import('./routes/Test/Index'),
    },
    {
      path: '/pageone',
      //models: () => [import('./models/User')],
      component: () => import('./routes/Test/pageOne'),
    },
    {
      path: '/app',
      //models: () => [import('./models/User')],
      component: () => import('./routes/Test/app'),
    },
    {
      path: '/information',
      models: () => [import('./models/Index')],
      component: () => import('./routes/Information/Index'),
    },
    {
      path: '/information/detail/:id',
      models: () => [import('./models/Index')],
      component: () => import('./routes/Information/Detail'),
    },
    {
      path: '/message',
      models: () => [import('./models/Message')],
      component: () => import('./routes/Message/Index'),
    },
    {
      path: '/guide',
      models: () => [import('./models/Guide')],
      component: () => import('./routes/Guide/Index'),
    },
    {
      path: '/guide/detail/:id',
      //models: () => [import('./models/User')],
      component: () => import('./routes/Guide/Detail'),
    },

    /*
    * 水上旅游 router
    */
    {
      path: '/water',
      //models: () => [import('./models/User')],
      component: () => import('./waterTour/'),
    },
    {
      path: '/water/ticket',
      //models: () => [import('./models/User')],
      component: () => import('./waterTour/Ticket'),
    },
    {
      path: '/water/ticket/:id',
      //models: () => [import('./models/User')],
      component: () => import('./waterTour/Ticket/detail'),
    },
    {
      // path: '/water/charter',
      // //models: () => [import('./models/User')],
      // component: () => import('./waterTour/Charter'),
    }
  ];
  return (

    <Router history={history}>
    <ConnectedRouter history={history}>
      <Switch>
         {
            routes.map(({ path, ...dynamics }, key) => (
              <Route key={key}
                exact
                onEnter={setTitle('业绩达成')}
                path={path}
                component={dynamic({
                  app,
                  ...dynamics,
                })}
              />
            ))
          }
        {/* <Route path="/" exact component={IndexPage} />
        <Route path="/login" exact component={Login} />
        <Route path="/reg" exact component={Reg} />
        <Route path="/user" exact component={User} />
        <Route path="/test" exact component={Test} /> */}
      </Switch>
      </ConnectedRouter>
    </Router>
  );
}

export default RouterConfig;
