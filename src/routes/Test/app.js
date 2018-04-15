import React , {Component} from 'react';
import Header from '../../components/Other/Header';

class Index extends Component{
    constructor(props){
        super(props);
        this.state = {
            info:null,
            test:'',
        }
   }
    sendUrl = (e)=>{
	    alert(123456)
        //window.postMessage('http://localhost:8000/#/app')
        window.postMessage('xxxx')
    }
    _myss=(value)=>{
        this.setState({test:value});
    }

    componentWillMount(){

    	const obj = {canGoBack:true};
        window.postMessage(JSON.stringify(obj));
        const _this = this;
        document.addEventListener('message', function (e) {
          //document.getElementById('data').textContent = e.data;
          _this.setState({info:e.data})
          switch(e.data){
              case 'get':_this._myss('hello world')
              break;

          }
        });
    }

    render(){
        return(
            <div>
                <Header />
                <h2>
                    <p>这是分享按钮调用的方法：{this.state.test}</p>
                    this is H5 app page
                    收到react native 数据{this.state.info}
                    <button onClick={this.sendUrl}>发送数据到react native</button>
                </h2>



            </div>

        )
    }
}

export default Index;