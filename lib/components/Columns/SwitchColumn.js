import React from 'react';
import PropTypes from 'prop-types';
import ActionColumn from './ActionColumn';
import swapIcon from '../icons/swap.svg';


export default class SwitchColumn extends ActionColumn {
    constructor(config) {
        super(config);
        this.icon = swapIcon;
    }

    action(grid, item) {
        grid.handleFormEdit(item);
    }
    
    renderFooterCellContent() {
        return null;
    }

    renderHeader(grid) {
        return null;
    }
    
}
