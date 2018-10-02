import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DataGrid from '../DataGrid/DataGrid';


export default class TreeGrid extends DataGrid {

    renderRow(item) {
        const isSelected = item.id === this.state.selectedItemId;
        const className = isSelected ? 'datagrid__row_selected' : '';
        
        return (
            <React.Fragment key={item.id}>
                <tr className={className}>
                    { this.props.columns.map(column => this.renderCell(column, item))}
                </tr>
                {
                    item.leaf === true ? null : 
                    item.expanded ? item.children.map(child => this.renderRow(child)) : null
                }
            </React.Fragment>

        );
    }

    handleExpand(item) {
        item.expanded = !item.expanded;
        this.setState(this.state);

    }
    
}