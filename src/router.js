import React from 'react';
import { Router, Route, Switch,routerRedux } from 'dva/router';

import {getRouterData} from './common/router';

import IndexPage from './routes/IndexPage';
import Login from './routes/UserLayout/Login';
import Reg from './routes/UserLayout/Reg';
import User from './routes/UserLayout/User';
import Test from './routes/UserLayout/test';

const {ConnectedRouter} = routerRedux;

function RouterConfig({ history , app }) {
  


  return (
    
    <Router history={history}>
    <ConnectedRouter history={history}>
      <Switch>
        <Route path="/" exact component={IndexPage} />
        <Route path="/login" exact component={Login} />
        <Route path="/reg" exact component={Reg} />
        <Route path="/user" exact component={User} />
        <Route path="/test" exact component={Test} />
      </Switch>
      </ConnectedRouter>
    </Router>
  );
}

export default RouterConfig;
