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
      path: '/',
      //models: () => [require('./models/IndexPage').default],
      models: () => [import('./models/IndexPage'),import('./models/Index')],
      component: () => import('./routes/IndexPage'),
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
      path: '/user/bill/:id',  //账单
      models: () => [require('./models/Bill').default],
      component: () => import('./routes/UserLayout/Bill/'),
    },
    {
      path: '/user/bill/detail/:id',  //红包卡券
      component: () => import('./routes/UserLayout/Bill/detail'),
    },
    {
      path: '/user/Contactinfo/:id',  //常用联系人
      component: () => import('./routes/UserLayout/ContactInfo/'),
    },
    {
      path: '/user/Contactinfo/editor/:id',  //编辑常用联系人
      component: () => import('./routes/UserLayout/ContactInfo/editor'),
    },
    {
      path: '/user/about',  //关于我们
      component: () => import('./routes/UserLayout/About/'),
    },
    {
      path: '/user/set',  //用户信息设置
      component: () => import('./routes/UserLayout/Set/'),
    },
    {
      path: '/user/nickname',  //用户昵称设置
      component: () => import('./routes/UserLayout/Set/nickname'),
    },
    {
      path: '/user/repass',  //用户信息设置
      component: () => import('./routes/UserLayout/Set/repass'),
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
      models: () => [import('./models/Index')],
      component: () => import('./routes/Message/Index'),
    },
    {
      path: '/guide',
      //models: () => [import('./models/User')],
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
