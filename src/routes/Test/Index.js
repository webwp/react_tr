import React , {Component} from 'react';

import Header from '../../components/Other/Header';

  var data = 0;

  function sendData(data) {
    if (window.originalPostMessage) {
      window.postMessage(data);
    } else {
      throw Error('postMessage接口还未注入');
    }
  }

  // window.onload = function () {
  //   document.addEventListener('message', function (e) {
  //     //document.getElementById('data').textContent = e.data;
  //   });

  // }
class Index extends Component{
   constructor(props){
        super(props);
        this.state = {
            info:null
        }
   }
   sendUrl = () => {
      // window.postMessage('http://localhost:8000/#/pageone');
      window.postMessage('mm');
   }
   componentWillMount(){
    const obj = {canGoBack:false};
    window.postMessage(JSON.stringify(obj));
    const _this = this;
    var userAgent = navigator.userAgent.toLowerCase();//获取UA信息
var http = require('http'); 
var fs = require('fs'); 
// var server = http.createServer(function (req, res) { 
//     if(req.url !== '/favicon.ico'){ 
//         var out = fs.createWriteStream('./request.log'); 
//         out.write('客户端请求所用的方法为：'+req.method+'\r\n'); 
//         out.write('客户端请求所用的url字符串为：'+req.url+'\r\n'); 
//         out.write('客户端请求头对象为：'+JSON.stringify(req.headers)+'\r\n'); 
//         out.end('客户端请求所用的HTTP版本为：'+req.httpVersion); 
//     } 
//     res.end(); 
// }).listen(3000,'localhost')
// if(userAgent.indexOf("ezhouxing") != -1){//判断ua中是否含有和app端约定好的标识ezhouxing
//         alert(包含);
//     }
    document.addEventListener('message', function (e) {
      //document.getElementById('data').textContent = e.data;
      _this.setState({info:e.data})
    });
   }
   testSendMessages = ()=>{
      window.postMessage('测试点击事件');
   }
    render(){

        return(
            <div>
                <Header {...this.props} />
                <p>{JSON.stringify(this.props)}</p>
                <p>
				  <button id="button">发送数据到react native</button>
                  <button onClick={this.sendUrl}>发送数据到react native</button>
				  <p>收到react native发送的数据: <span id="data">{this.state.info}</span></p>
                  <a href='http://localhost:8000/#/pageone'>哈哈哈哈</a>
                  <a href='javascript:postMes()'>测试点击事件</a>
                  <a onClick={this.testSendMessages}>测试点击事件2</a>
				</p>
                <h3 style={{lineHeight:'50px',textAlign:"center"}}>模块开发中1</h3>
            </div>
        )
    }
}
export default Index;