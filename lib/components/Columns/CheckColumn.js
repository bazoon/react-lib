import React from 'react';
import PropTypes from 'prop-types';
import Column from './Column';


export default class CheckColumn extends Column {
    constructor(config) {
        super(config);
        this.name = config.name;
        this.width = config.width;
        this.onCheck = config.onCheck;
        this.onCheckAll = config.onCheckAll;
        this.checkField = config.checkField;
        this.isAllChecked = false;
    }
    
    renderCellContent(currentValue, item, grid) {
        const isChecked = item.checked ? true : false;
        
        const cellStyle = Object.assign({}, {
            width: this.width + 'px',
            textAlign: 'center'
        }, this.style);

        

        return (
            <td style={cellStyle}>
                <input type="checkbox" onChange={handleCheck} checked={isChecked} />
            </td>
        );

        function handleCheck() {
            grid.handleItemChecked(item);
        }
    }

    renderFooterCellContent() {
        return null;
    }

    renderHeader(grid) {
        var me = this;
        return (
            <input type="checkbox" onChange={this.handleAllChecked} onClick={handleAllChecked}/>
        );

        function handleAllChecked() {
            me.isAllChecked = !me.isAllChecked;
            grid.handleAllChecked(me.isAllChecked);
        }
    }
    
}
