import React , { Component } from 'react';
import { Link } from 'dva/router';
import { List,Carousel, WingBlank,Grid } from 'antd-mobile';

import Config from '../../config'



class Information extends Component{
    render(){
        const { data } = this.props;
        const resData = data.data;
        return (
            <div className="mt10 contents Shortcut">
                <div className="sub-title"><Link to="/information" className='right' style={{color:'#999',fontSize:'12px'}}>更多<i className="iconfont icon-gengduo fz-sm"></i></Link><span className="icon-other"></span>资讯</div>
                <ul className="custom_list">
                {
                  resData.map((item,key)=>(
                    <li key={key}>
                      <Link  to={'information/detail/'+item.id}>
                        <img src={item.image} width="90" height="70" onError={(el)=>Config.handleImageErrored(el)} />
                        <div style={{marginLeft:"105px"}}>
                          <h4 className='custom-title-set'>{item.title}</h4>
                          <p>{item.publish_time}</p>
                        </div>
                      </Link>
                    </li>
                  
                ))
                }
                </ul>
            </div>
        )
    }
}
export default Information;