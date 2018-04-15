import React , {Component} from 'react';
import Header from '../../components/Other/Header';


 // var data = 0;

 //  function sendData(data) {
 //    if (window.originalPostMessage) {
 //      window.postMessage(data);
 //    } else {
 //      throw Error('postMessage接口还未注入');
 //    }
 //  }

//   window.onload = function () {
//     document.addEventListener('message', function (e) {
//       document.getElementById('data').textContent = e.data;
//     });
//     document.getElementById('ss').onclick = function () {
//         alert(1)
//       data += 100;
//       sendData(data);
//     }
//   }
// function postMsg(){
//     window.postMessage('d')
// }
class Index extends Component{
    constructor(props){
        super(props);
        this.state = {
            info:null
        }
   }

    sendMessage = (e)=>{
        //window.postMessage('http://localhost:8000/#/app')
        window.postMessage('mmm')
    }
    componentWillMount(){
        const obj = {canGoBack:true,action:{rightTitle:'分享',onRight:'something'}};
        window.postMessage(JSON.stringify(obj));
        const _this = this;
        document.addEventListener('message', function (e) {
          //document.getElementById('data').textContent = e.data;
          _this.setState({info:e.data})
        });
    }
    render(){
        return(
            <div>
                <Header />
                <h2>
                    this is H5 pageOne
                </h2>

<p>
                  <button id="ss" onClick={this.sendMessage}>发送数据到react native</button>
                  <p>收到react native发送的数据: <span id="data">{this.state.info}</span></p>
<a href='http://localhost:8000/#/app'>哈哈哈哈</a>
                </p>
                <p>{JSON.stringify(this.props)}</p>
            </div>

        )
    }
}

export default Index;