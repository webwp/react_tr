import React,{Component} from 'react';
import { connect } from 'dva';
import { routerRedux,Redirect,Switch } from 'dva/router';
import { Grid } from 'antd-mobile';

class IndexGrid extends Component{
    render(){
        let nums = 0;
        let dataSource = this.props.Applications != null ? this.props.Applications:[];
        let data = [];
        dataSource.map((item,index)=>{
            if(item.category_id ===2 && nums<7){
                let res = {icon:(<a href={item.uri}><img src={item.icon} style={{height:'49px',width:'49px'}}/></a>),text:item.label}
                data.push(res);
                nums++;
            }
        })
        const more = {icon:(<a href=''><img src='image/home/Moreapplications@2x.png' style={{height:'49px',width:'49px'}}/></a>),text:'更多'}
        data.push(more);
        return (
            <Grid className='custom_grid_other' data={data} hasLine={false}  onClick={_el => console.log(_el)} />
        )
    }
}

export default IndexGrid;