import React , { Component } from 'react';
import { connect } from 'dva';
import { Tabs, WhiteSpace ,Card, WingBlank,Badge,Button} from 'antd-mobile';
import Page from '../../../components/Page'
@connect( state =>({
    Coupons:state.coupons
}))
class Index extends Component{
    renderContent = tab =>(
        <div style={{  height: '100%' }}>
        {/* <p>Content of {tab.title}</p> */}
        
        
        {(tab.coupons).length!=0?tab.coupons.map((item,index)=>(
            
            
            <div className='custom-card' key={index}>
                <dl>
                    <dt style={{background:`url(${item.status==0? 'image/coupon/coupon_bg1_notused.png':'image/coupon/coupon_bg1_used.png'}) center center no-repeat`}}>
                        <div>￥<strong className="fz-weak-md">{item.money}</strong></div>
                        <p className='fz-small-sm' style={{lineHeight: 'normal'}}>{item.title}</p>
                    </dt>
                    <dd>
                        <div className="fz-small-sm lineH"><Badge text={item.category} hot /><strong>{item.title}</strong></div>
                        <p>
                            <span className="right">{item.used==0?<Button type="ghost" size="small">立即使用</Button>:item.used==1?'未使用':'已过期'}</span>
                            <span className='fz-small-sm txt-color-default'>有效期：{item.start_time}~{item.end_time}</span>
                        </p>
                    </dd>
                </dl>
            </div>
        ))
        :
        <div className="txt-c mt30">
            <img src='image/coupon/coupon.png' />
            <p className="mt10 txt-color-assist-sm">暂无可用优惠券</p>
        </div>
        }
            
        </div>
    );
    render(){
        const { Coupons , history } = this.props;
        const { readyUsr,donUse,overdue } = Coupons;
        
        const tabs = [
            { title: '未使用' , coupons:[
                {money:50,type:'满减券',status:'0',title:'水上旅游购满200元减50',tip:'满200减50',recordTime:'2018.06.30~2019.01.30'},
                {money:30,type:'直减券',status:'0',title:'首绑银联获赠30元直减券',tip:'',recordTime:'2018.06.30~2019.01.30'},
            ]},
            { title: '已使用' , coupons:[
                {money:50,type:'满减券',status:'1',title:'水上旅游购满200元减50',tip:'',recordTime:'2018.06.30~2019.01.30'},
                {money:30,type:'直减券',status:'1',title:'首绑银联获赠30元直减券',tip:'满200减50',recordTime:'2018.06.30~2019.01.30'},
            ]},
            { title: '已过期' , coupons:[
                {money:50,type:'满减券',status:'2',title:'水上旅游购满200元减50',tip:'满200减50',recordTime:'2018.06.30~2019.01.30'},
                {money:30,type:'直减券',status:'2',title:'首绑银联获赠30元直减券',tip:'',recordTime:'2018.06.30~2019.01.30'},
            ]},
            
          ];
        //   const tabs = [
        //     { title: '未使用' , coupons:donUse==null? []:donUse.data},
        //     { title: '已使用' , coupons:readyUsr==null ? []:readyUsr.data},
        //     { title: '已过期' , coupons:overdue==null ? []:overdue.data},
        //   ];
          const others = {mode:'light'}
        return(
            <Page title="红包/卡券" history={history} _bool={true} others={others} borderBottom={true} >
                <div className="">
                    {/* <WhiteSpace /> */}
                        <Tabs 
                            tabs={tabs} 
                            renderTabBar={props => <Tabs.DefaultTabBar {...props} page={3} />}
                            onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
                            tabBarUnderlineColor='#39bc30'
                            tabBarUnderlineStyle={{ borderColor:'#39bc30'}}
                            tabBarActiveTextColor='#39bc30' 
                        >
                        {this.renderContent}
                        </Tabs>
                    <WhiteSpace />
                </div>
            </Page>
            
        )
    }
}

export default Index;