import React , { Component } from 'react';
import { List,Carousel, WingBlank,Grid } from 'antd-mobile';

const data = [
    {title:'广西首款智慧停车app上线 南宁人可一键预约停车',time:'2018-04-03 12:12:12',img:'image/01.jpg'},
    {title:'广西首款智慧停车app上线 南宁人可一键预约停车',time:'2018-04-03 12:12:12',img:'image/01.jpg'},
    {title:'广西首款智慧停车app上线 南宁人可一键预约停车',time:'2018-04-03 12:12:12',img:'image/01.jpg'},
    {title:'广西首款智慧停车app上线 南宁人可一键预约停车',time:'2018-04-03 12:12:12',img:'image/01.jpg'},
    {title:'广西首款智慧停车app上线 南宁人可一键预约停车',time:'2018-04-03 12:12:12',img:'image/01.jpg'},
];

class Information extends Component{
    render(){
        return (
            <div className="mt10 contents Shortcut">
                <div className="sub-title"><a href="" className='right' style={{color:'#999',fontSize:'12px'}}>更多</a><span className="icon-other"></span>资讯</div>
                <ul className="custom_list">
                {
                  data.map((item,key)=>(
                    <li key={key}>
                        <img src={item.img} width="64" height="64" />
                        <div>
                          <h4>{item.title}</h4>
                          <p>{item.time}</p>
                        </div>
                    </li>
                  
                ))
                }
                  
                  
                </ul>
            </div>
        )
    }
}
export default Information;