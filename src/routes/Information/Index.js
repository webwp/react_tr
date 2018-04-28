import React , { Component } from 'react';
import { connect } from 'dva'
import { Link } from 'dva/router';
import { List,Carousel, WingBlank,Grid,Pagination } from 'antd-mobile';

import Config from '../../config'

import Page from "../../components/Page"


const locale = {
  prevText: '上一页',
  nextText: '下一页',
};

@connect((state)=>({
  list : state.index
}))
class Information extends Component{
    changPage = (e) => {
      const { dispatch } = this.props;
        //获取资讯内容
        dispatch({
            type:'index/news',
            payload:{page:e,per_page:10}
        })
    }
    handleImageLoaded() {
      this.setState({ imageStatus: 'loaded' });
    }
    render(){
        const {list} = this.props;
        const {news} = list;
        const someThing = {canGoBack:false}
        
        if(news == null){
          return false;
        }
        const other = {mode:'light'};
        return (
            
              <Page title='资讯列表' history={this.props.history} someThing={someThing} _bool={true} others={other}>  
                <div className="Shortcut contents" style={{height:'100%'}}>
                <ul className="custom_list">
                {news != null ?
                  news.data.data.map((item,key)=>(
                    <li key={key}>
                      <Link to={'information/detail/'+item.id}>
                        <img 
                            src={item.image} width="90" height="70" 
                            onLoad={this.handleImageLoaded.bind(this)}
                            onError={(el) => Config.handleImageErrored(el)}
                        />
                        <div style={{marginLeft:'105px'}}>
                          <h4 className="custom-title-set">{item.title}资讯列表资讯列表资讯列表资讯列表资讯列表资讯列表</h4>
                          <p>{item.publish_time}</p>
                        </div>
                      </Link>
                    </li>
                  
                 )) : ''
                }
                </ul>
                {news==null ?"" : (news.data.last_page==1 ? '':
                    <Pagination  
                        onChange={this.changPage}
                        total={news.data.last_page} 
                        current={news.data.current_page} 
                        locale={locale} 
                    />)
                }
                </div>
              </Page>
        )
    }
}
export default Information;