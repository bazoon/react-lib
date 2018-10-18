import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import Column from './Column';



export default class ActionColumn extends Column {
    constructor(config) {
        super(config);
        this.icon = config.icon;
        this.isDisabled = config.isDisabled;
    }

    action(grid, item) {
        
    }
    
    renderCellContent(currentValue, item, grid, cellStyle) {
        var me = this;
        const iconClassName = cn("datagrid__action-icon", {
            'datagrid__action-icon_disabled': this.isDisabled
        });
        

        return (
            <td
                data-itemid={this.name+'*'+item.id}
                style={cellStyle}>
                    <div className="datagrid__cell">
                        <img className={iconClassName} src={this.icon} onClick={handleClick}/>
                    </div>
            </td>
        );


        
        
        function handleClick() {
            if (!me.isDisabled) {
                me.action(grid, item);
            }
        }
    }

    renderFooterCellContent() {
        return null;
    }

    renderHeader(grid) {
        return null;
    }
    
}
