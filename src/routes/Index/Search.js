import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import { Icon, Grid , SearchBar,NavBar,Badge } from 'antd-mobile';

const myImg = src => <img src={`../src/assets/${src}.svg`} className="am-icon am-icon-lg" alt="" width="36" height="36" />;

class Search extends Component {

    constructor(props){
        super(props);
        this.state={
            height:document.documentElement.clientHeight
        }
    }
    // handleSrcoll(e){
    //     console.log(document.documentElement)
    //     console.log('::',document.documentElement.getBoundingClientRect().top)
    // }
    // componentDidMount(){
    //     const _this = this;
    //     const hei = this.state.height - ReactDOM.findDOMNode(this.lv).offsetTop;
    //     window.addEventListener('wheel',_this.handleSrcoll.bind(this))
    //     console.log(hei)
    // }
    
    render(){
        const list = {
            'icon-saoyisao':'扫一扫', 'icon-erweima':'二维码', 'icon-cheliang':'车辆',
            'icon-wodehongbao':'红包/卡券'
        };
        let data = [];
        for(var item in list){
            console.log(item,list[item])
            let classType='iconfont '+item;
            let res = {icon:(<i className={classType}></i>),text:list[item]}
            data.push(res);
        }
        return (
            <div className="searchClass" ref={el => this.lv = el} style={{color:"rgb(11, 114, 188) !important"}}>
                <div className="searchinput">
                    <div className="search-left">
                      <Icon type="search" size="sm" style={{'marginBottom':'-5px'}} />{this.state.height} : {this.state.height}
                    </div>
                    <div className="search-right">
                      <i className='iconfont icon-remind fz-md'><Badge text={'1'} style={{ marginLeft: 12 }} /></i>
                    </div>
                </div>
                <Grid data={data} columnNum={4} onClick={_el => console.log(_el.text)} hasLine={false} activeStyle={false} itemStyle={{background: '#0b72bc','color':'#fff'}} />
            </div>
        )
    }
}

export default Search;