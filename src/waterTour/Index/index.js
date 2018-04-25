import React,{Component} from 'react';
import { WhiteSpace } from 'antd-mobile';

import Ad from './ad';
import IndexGrid from './indexGrid';

import OtherAd from './otherAd';
import IndexList from './indexList';
import Page from '../../components/Page/index';
class Index extends Component{
    render(){
        const { history } = this.props;
        const other = {mode:'light'};
        const right = <i className="iconfont icon-xiaoxi"></i>;

        return(
            <Page title={'水上码头'} right={right} others={other} history={history}>
                <Ad />
                <IndexGrid />
                <WhiteSpace />
                <OtherAd />
                <WhiteSpace />
                <IndexList />
            </Page>
        )
    }
}
export default Index;