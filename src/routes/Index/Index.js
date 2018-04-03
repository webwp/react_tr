import React, { Component } from 'react';

import Search from './Search';
import IndexGrid from './IndexGrid';
import Message from './Message';
import Ad from './Ad';
import Shortcut from './Shortcut'
import Information from './Information'

//var top = document.body.scrollTop || document.documentElement.scrollTop || window.pageYOffset;

class Index extends Component {


    
    render(){
        return (
            <div style={{background:"#f6f6f6"}}>
                <Search />
                <Ad />
                <IndexGrid />
                <Message />
                
                <Shortcut />
                <Information />
                <div className="line-Division"><span>我是底线君</span></div>
            </div>
        )
    }
}

export default Index;