import React , { Component } from 'react';
import Page from '../../components/Page';
import Banner from '../../components/Banner';

import { List } from 'antd-mobile';
const data= [
    {
        "id": 1,
        "title": "特大新闻：南宁出行上线了",
        "brief": "南宁出行上线了",
        "image": "image/list-01.jpg",
        "uri": null,
        "open_type": "1",
        "publish_time": "2018-04-12 10:23:16"
    },
    {
        "id": 1,
        "title": "特大新闻：南宁出行上线了",
        "brief": "南宁出行上线了",
        "image": "image/list-01.jpg",
        "uri": null,
        "open_type": "1",
        "publish_time": "2018-04-12 10:23:16"
    },
    {
        "id": 1,
        "title": "北京网红地下室卖1050万 网友：到北京才知有钱人多",
        "brief": "南宁出行上线了",
        "image": "image/list-01.jpg",
        "uri": null,
        "open_type": "1",
        "publish_time": "2018-04-12 10:23:16"
    },
    {
        "id": 1,
        "title": "撕破脸？土耳其总统炮轰北约：最大安全威胁来自“盟友”",
        "brief": "南宁出行上线了",
        "image": "image/list-01.jpg",
        "uri": null,
        "open_type": "1",
        "publish_time": "2018-04-12 10:23:16"
    }
]
class Index extends Component{
    render(){
        const { history } = this.props;

        const others = {mode:'light'};
        return(
           <Page title="发现" history={history} _bool={true} others={others}>
                {/* banner 广告图 */}
                <Banner />
                <List className="custom-list">
                 {data.map((item,index)=>(
                    <List.Item key={index}>
                        <img src={item.image} className="left" width="80" height='80' />
                        <div className="content-list">
                            <h5>
                                {item.title}
                            </h5>
                            <p className="txt-color-default fz-small-sm">
                            {item.brief}
                            <br />
                            {item.publish_time}
                            </p>
                        </div>
                    </List.Item>
                 ))}
                </List>
           </Page>
        )
    }
}

export default Index;