import React , {Component} from 'react';

import Header from '../../components/Other/Header';
import ListView from '../../components/Other/ListView'


class Index extends Component{
    render(){
        return (
            <div>
                  <Header {...this.props} headerTxt="服务提醒" />
                  <ListView />
            </div>
        )
    }
}
export default Index;