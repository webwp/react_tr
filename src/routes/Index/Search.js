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
        // const list = {
        //     'icon-saoyisao':'扫一扫', 'icon-erweima':'二维码', 'icon-cheliang':'车辆',
        //     'icon-wodehongbao':'红包/卡券'
        // }
        const list = {
            'icon-saoyisao':'扫一扫', 'icon-erweima':'二维码',
        };;
        let data = [];
        for(var item in list){
            console.log(item,list[item])
            let classType='iconfont '+item;
            let res = {icon:(<i className={classType}></i>),text:''} //list[item]
            data.push(res);
        }
        return (
            <div className="searchClass" ref={el => this.lv = el} style={{color:"rgb(11, 114, 188) !important"}}>
                <div className="searchinput">
                    <div className="col-30">
                        {/* <Grid 
                            className="custom_grid"
                            data={data} 
                            columnNum={2} 
                            onClick={_el => console.log(_el.text)} 
                            hasLine={false} 
                            activeStyle={false} 
                            itemStyle={{background: '#0b72bc','color':'#fff'}} 
                        /> */}
                        <i className="iconfont icon-saoyisao fz-md" style={{ float:'left'}}></i>
                        <i className="iconfont icon-erweima fz-md" style={{marginLeft:'5px'}}></i>
                    </div>
                    <div className="search-left col-50">
                      <Icon type="search" size="sm" style={{'marginBottom':'-5px'}} />
                    </div>
                    <div className="search-right col-20 custom_icon">
                      <i className='iconfont icon-fenxiang1' style={{ float:'right'}}></i>
                    </div>
                </div>
            </div>
        )
    }
}

export default Search;