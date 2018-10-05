import React from 'react';
import PropTypes from 'prop-types';
import ActionColumn from './ActionColumn';
import deleteIcon from './delete.svg';


export default class DeleteColumn extends ActionColumn {
    constructor(config) {
        super(config);
        this.icon = deleteIcon;
    }

    action(grid, item) {
        grid.handleDelete(item);
    }
    
    renderFooterCellContent() {
        return null;
    }

    renderHeader(grid) {
        return null;
    }
    
}
