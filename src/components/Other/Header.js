import React , { Component } from 'react';
import { NavBar , Icon } from 'antd-mobile';

class Header extends Component{
    render(){
        return(
            <NavBar
                className='custom-nav'
                mode="dark"
                leftContent={<Icon type="left" onClick={()=>{this.props.history.goBack()}} />}
                rightContent=''
            >
                {this.props.headerTxt}
            </NavBar>
        )
    }
}

export default Header;