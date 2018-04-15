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