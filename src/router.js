import React from 'react';
import { Router, Route, Switch,routerRedux } from 'dva/router';
import dynamic from 'dva/dynamic';

import {getRouterData} from './common/router';

// import IndexPage from './routes/IndexPage';
// import Login from './routes/UserLayout/Login';
// import Reg from './routes/UserLayout/Reg';
// import User from './routes/UserLayout/User';
// import Test from './routes/UserLayout/test';

const {ConnectedRouter} = routerRedux;

function RouterConfig({ history , app }) {

  const error = dynamic({
    app,
    component: () => import('./routes/ex'),
  })
  const routes = [
    {
      path: '/',
      //models: () => [require('./models/IndexPage').default],
      models: () => [import('./models/IndexPage')],
      component: () => import('./routes/IndexPage'),
    },
    {
      path: '/user',
      //models: () => [require('./models/User').default],
      //models: () => [import('./models/User')],
      component: () => import('./routes/UserLayout/User'),
    },
    {
      path: '/user/coupons/:id',  //红包卡券
      component: () => import('./routes/UserLayout/Coupons/'),
    },
    {
      path: '/user/bill/:id',  //红包卡券
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
      //models: () => [import('./models/User')],
      component: () => import('./routes/Information/Index'),
    },
    {
      path: '/information/detail/:id',
      //models: () => [import('./models/User')],
      component: () => import('./routes/Information/Detail'),
    },
    {
      path: '/message',
      //models: () => [import('./models/User')],
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
  ]
  console.log('路由器')
  return (

    <Router history={history}>
    <ConnectedRouter history={history}>
      <Switch>
         {
            routes.map(({ path, ...dynamics }, key) => (
              <Route key={key}
                exact
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
