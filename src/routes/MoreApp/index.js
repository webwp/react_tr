import React,{Component} from 'react';
import { connect } from 'dva';
import { routerRedux,Redirect,Switch } from 'dva/router';
import { Grid } from 'antd-mobile';
import Page from '../../components/Page';
@connect(state=>({
    app:state.applications
}))
class IndexGrid extends Component{
    render(){
        let nums=0;
        const { app } = this.props,{ application } = app;
        let dataSource = application != null ? application:[];
        let data = [];
        dataSource.map((item,index)=>{
            if(item.category_id ===2){
                let res = {icon:(<a href={item.uri}><img src={item.icon} style={{height:'49px',width:'49px'}}/></a>),text:item.label}
                data.push(res);
                nums++;
            }
        })

        
        const { history } = this.props;
        return (
            <Page title="更多应用" history={history} others={{mode:'light'}} _bool={true} borderBottom={true}>
                <Grid className='custom_grid_other' data={data} hasLine={false}  onClick={_el => console.log(_el)} />
            </Page>
        )
    }
}

export default IndexGrid;