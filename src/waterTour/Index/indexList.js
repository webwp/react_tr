import React , { Component } from 'react';
 
import { routerRedux,Redirect,Switch } from 'dva/router';
import { Grid } from 'antd-mobile';
class IndexList extends Component {
    render(){
        let num=0;
        let iconBackgroudColor = ['#FD6F57',"#2EA1F1","#01D066","#1CC7F2","#01D066","#FFAC23","#01D066","#FF8D3A","#FF8D3A","#FF8D3A"]
        const list = {
            'icon-swticongongjiaoche1':'公交', 'icon-youlun':'邮轮码头', 'icon-tingche':'停车',
            'icon-gongxiangtubiaozhuangtaileicaozuolei24':'共享汽车','icon-mobilepower':'充电桩','icon-yuyue':'预约车险','icon-ditu':'出行指南','icon-manage_fill':'更多'
        };
        let data = [
            {image:'image/01.jpg',uri: "xxxx"},
            {image:'image/03.jpg',uri: "xxxx"},
        ]
        
        return (
            <div className="list-map">
            {data.map((Item,index)=>(
                <div className="list-items" key={index}>
                      <div className="imgList">
                          <img src={Item.image} style={{  height: '200px' }} alt="" />
                          <div className='imgList-text txt-l'>
                               周一至周日  黄金夜航 19：00~22：00
                          </div>
                          <span className="imgList-title">民生码头</span>
                      </div>
                      <h4 className="txt-l">夜游南宁 魅力邕江</h4>
                      <p className="txt-color-default fz-small-sm txt-l">夜游南宁 魅力邕江</p>

                </div>
            ))}
            </div>
            // <Grid 
            //     className='custom_grid_other' 
            //     columnNum={1} 
            //     data={data} 
            //     hasLine={false}  
            //     onClick={_el => console.log(_el)} 
            //     itemStyle={{}}
            //     renderItem={dataItem => (
                    
            //       )}
            // />
        )
    }
}
export default IndexList;