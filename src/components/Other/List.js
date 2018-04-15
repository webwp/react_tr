import React , { Component } from 'react';

import { List } from 'antd-mobile';

const Item = List.Item;
const Brief = Item.Brief;

class Index extends Component{
    render(){
        return(
            <List className="my-list">
                <Item arrow="horizontal" onClick={() => {}}>Title</Item>
            </List>
        )
    }
}

export default Index;