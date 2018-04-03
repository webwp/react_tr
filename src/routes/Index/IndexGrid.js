import React,{Component} from 'react';
import { Grid } from 'antd-mobile';

class IndexGrid extends Component{
    render(){
        let num=0;
        let iconBackgroudColor = ['#FD6F57',"#2EA1F1","#01D066","#1CC7F2","#01D066","#FFAC23","#01D066","#FF8D3A","#FF8D3A","#FF8D3A"]
        const list = {
            'icon-swticongongjiaoche1':'公交', 'icon-youlun':'邮轮码头', 'icon-tingche':'停车',
            'icon-gongxiangtubiaozhuangtaileicaozuolei24':'共享汽车','icon-mobilepower':'充电桩','icon-yuyue':'预约车险','icon-ditu':'出行指南','icon-manage_fill':'更多'
        };
        let data = [];
        for(var item in list){
            
            let classType='iconfont borderRadius '+item;
            let res = {icon:(<i className={classType} style={{'background':iconBackgroudColor[num]}}></i>),text:list[item]}
            data.push(res);
            num++;
        }
        return (
            <Grid className='custom_grid_other' data={data} hasLine={false} />
        )
    }
}

export default IndexGrid;