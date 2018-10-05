import React from 'react';
import PropTypes from 'prop-types';
import Column from './Column';


export default class ActionColumn extends Column {
    constructor(config) {
        super(config);
        this.icon = config.icon;
    }

    action(grid, item) {
        
    }
    
    renderCellContent(currentValue, item, grid) {
        var me = this;
        return <img className="datagrid__action-icon" src={this.icon} onClick={handleClick}/>
        
        function handleClick() {
            me.action(grid, item);
        }
    }

    renderFooterCellContent() {
        return null;
    }

    renderHeader(grid) {
        return null;
    }
    
}
