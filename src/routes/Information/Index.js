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
        const someThing = {canGoBack:false,_bool:false}
        
        if(news == null){
          return false;
        }
        console.log(news)
        return (
            
              <Page title='资讯列表' history={this.props.history} someThing={someThing}>  
                <div className="Shortcut contents">
                <ul className="custom_list">
                {news != null ?
                  news.data.data.map((item,key)=>(
                    <li key={key}>
                      <Link to={'information/detail/'+item.id}>
                        <img 
                            src={item.image} width="64" height="64" 
                            onLoad={this.handleImageLoaded.bind(this)}
                            onError={(el) => Config.handleImageErrored(el)}
                        />
                        <div style={{marginLeft:'80px'}}>
                          <h4>{item.title}</h4>
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