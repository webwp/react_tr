import dva from 'dva';
import './index.css';
import 'antd-mobile/dist/antd-mobile.css';
import history from 'history/createHashHistory'

// 1. Initialize
const app = dva();

// 2. Plugins
// app.use({});

// 3. Model
const models=['User'];
models.forEach((model)=>{
    app.model(require(`./models/${model}`).default);
})


// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');
