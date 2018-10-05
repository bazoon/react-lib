import React from 'react';
import PropTypes from 'prop-types';
import ActionColumn from './ActionColumn';
import editIcon from './edit.svg';


export default class EditColumn extends ActionColumn {
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
