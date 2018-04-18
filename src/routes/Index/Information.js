import React , { Component } from 'react';
import { Link } from 'dva/router';
import { List,Carousel, WingBlank,Grid } from 'antd-mobile';



class Information extends Component{
    render(){
        const { data } = this.props;
        const resData = data.data;
        return (
            <div className="mt10 contents Shortcut">
                <div className="sub-title"><Link to="/information" className='right' style={{color:'#999',fontSize:'12px'}}>更多</Link><span className="icon-other"></span>资讯</div>
                <ul className="custom_list">
                {
                  resData.map((item,key)=>(
                    <li key={key}>
                      <Link  to={'information/detail/'+item.id}>
                        <img src={item.image} width="64" height="64" />
                        <div>
                          <h4>{item.title}</h4>
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