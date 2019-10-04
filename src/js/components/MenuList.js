import React from 'react';
import {
    List,
    ListItem,
    ListItemText,
} from '@material-ui/core';


const MenuList = (props) => {

    const { listItems, handleSwitchMenuItem } = props;
    
    return (
        <List>
            {listItems.map((text, index) => (
                <ListItem button key={text}>
                    <ListItemText
                    primary={text}
                    onClick={() => handleSwitchMenuItem(text)} />
                </ListItem>
            ))}
        </List>
    );
}

export default MenuList;