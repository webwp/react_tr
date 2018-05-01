import React , { Component } from 'react';
import { connect } from 'dva'
import { List,Carousel, WingBlank,Grid } from 'antd-mobile';
import Config from '../../config';

const datas = [
    {title:'坐公交点我',txt:'扫码乘公交',img:'../../src/assets/off.jpg'},
    {title:'夜游南宁',txt:'邮轮订票',img:'https://gw.alipayobjects.com/zos/rmsportal/WXoqXTHrSnRcUwEaQgXJ.png'},
    {title:'预约停车',txt:'提前计划 不费时间',img:'https://gw.alipayobjects.com/zos/rmsportal/WXoqXTHrSnRcUwEaQgXJ.png'},
    {title:'停车交费',txt:'一键支付 节省时间',img:'https://gw.alipayobjects.com/zos/rmsportal/WXoqXTHrSnRcUwEaQgXJ.png'}
];
class Shortcut extends Component{
    render(){
        let nums = 0;
        let dataSource = this.props.Applications != null ? this.props.Applications:[];
        let data = [];
        dataSource.map((item,index)=>{
            if(item.category_id ===3 && nums<4){
                let res = {img:item.icon,title:item.label,txt:'提前计划 不费时间'}
                data.push(res);
                nums++;
            }
        })
        return (
            <div className="mt10 contents Shortcut">
                <div className="sub-title"><span className="icon-other"></span>交通出行</div>
                <Grid data={data}
                    columnNum={2}
                    renderItem={dataItem => (
                        <div style={{'padding':"0 15px 0 25px"}}>
                            <div style={{marginTop: '8px',"float":'left','textAlign':'left' }}>
                                <strong style={{fontWeight:'normal'}}>{dataItem.title}</strong>
                                <p className="font-text-12">{dataItem.txt}</p>
                            </div>
                            <img src={dataItem.img}  style={{ width: '48px', height: '48px',"float":'right' }} alt="" onError={(el)=>Config.handleImageErrored(el)} />
                            
                        </div>
                )}
                />
            </div>
        )
    }
}
export default Shortcut;