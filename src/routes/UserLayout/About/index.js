import React , { Component } from 'react';
import Header from '../../../components/Other/Header';
import Detail from '../../../components/Other/Detail'

class Index extends Component {
    render(){
        return(
            <div>
                <Header {...this.props} headerTxt='关于我们' />
                <div className="custom-nav-sibling-top">
                     <Detail />
                </div>
            </div>
        )
    }
}

export default Index;