import React , { Component } from 'react';
import Header from '../../../components/Other/Header';
import Detail from '../../../components/Other/Detail';

import Page from '../../../components/Page'

class Index extends Component {
    render(){
        const others = {mode:'light'}
        return(
            <div>
                <Page title="关于我们" history={this.props.history} _bool={true} others={others}>
                {/* <div className="custom-nav-sibling-top"> */}
                     <Detail />
                {/* </div> */}
                </Page>
            </div>
        )
    }
}

export default Index;