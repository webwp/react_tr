import React , { Component } from 'react';
import { NavBar , Icon } from 'antd-mobile';

class Header extends Component{
    render(){
        return(
            <NavBar
                mode="dark"
                leftContent={<Icon type="left" onClick={()=>{this.props.history.goBack()}} />}
                rightContent=''
            >
                NavBar
            </NavBar>
        )
    }
}

export default Header;