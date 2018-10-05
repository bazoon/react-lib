import React from 'react';
import PropTypes from 'prop-types';
import Column from './Column';
import editIcon from './edit.svg';


export default class EditColumn extends Column {
    constructor(config) {
        super(config);
        this.icon = editIcon;
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
