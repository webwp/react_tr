import React, { Component } from 'react';

import Search from './Search';
import IndexGrid from './IndexGrid';
import Message from './Message';
import Ad from './Ad';
import Shortcut from './Shortcut'

//var top = document.body.scrollTop || document.documentElement.scrollTop || window.pageYOffset;

class Index extends Component {


    
    render(){
        return (
            <div ref="mmm">
                <Search />
                <IndexGrid />
                <Message />
                <Ad />
                <Shortcut />
                <div className="line-Division"><span>我是底线君</span></div>
            </div>
        )
    }
}

export default Index;