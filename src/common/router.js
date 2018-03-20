import {createElement} from 'react';
import dynamic from 'dva/dynamic';

let routerDataCache;
const modelNotExisted = (app, model) => (
    // eslint-disable-next-line
    !app._models.some(({namespace}) => {
      return namespace === model.substring(model.lastIndexOf('/') + 1);
    })
  );
//dynamicWrapper(app, ['pmc'], () => import('../routes/Pmc'))
const dynamicWrapper = (app, models, component) => {
    // () => require('module')
    // transformed by babel-plugin-dynamic-import-node-sync
    if (component.toString().indexOf('.then(') < 0) {
      models.forEach((model) => {
        if (modelNotExisted(app, model)) {
          // eslint-disable-next-line
          app.model(require(`../models/${model}`).default);
        }
      });
      return (props) => {
        if (!routerDataCache) {
          routerDataCache = getRouterData(app);
        }
        return createElement(component().default, {
          ...props,
          routerData: routerDataCache,
        });
      };
    }
    // () => import('module')
    return dynamic({
      app,
      models: () => models.filter(
        model => modelNotExisted(app, model)).map(m => import(`../models/${m}.js`)
      ),
      // add routerData prop
      component: () => {
        if (!routerDataCache) {
          routerDataCache = getRouterData(app);
        }
        return component().then((raw) => {
          const Component = raw.default || raw;
          return props => createElement(Component, {
            ...props,
            routerData: routerDataCache,
          });
        });
      },
    });
  };

export const getRouterData = (app) => {
    // const routerConfig = {
    //   '/': {
    //     component: dynamicWrapper(app, [], () => import('../layouts/BasicLayout')),
    //   },
    //   '/user': {
    //     component: dynamicWrapper(app, [], () => import('../layouts/UserLayout')),
    //   },
    //   '/user/login': {
    //     component: dynamicWrapper(app, ['app'], () => import('../routes/Auth/login')),
    //   },
    //   '/dashboard': {
    //     name: '数据统计',
    //     component: dynamicWrapper(app, [], () => import('../routes/Dashboard')),
    //   },
    // }
}