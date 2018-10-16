import React from 'react';
import PropTypes from 'prop-types';
import Column from './Column';
import cn from 'classnames';


export default class ActionColumn extends Column {
    constructor(config) {
        super(config);
        this.icon = config.icon;
        this.isDisabled = config.isDisabled;
    }

    action(grid, item) {
        
    }
    
    renderHeaderCell({ key, style }) {
        const className = cn("virtual-grid__cell", "virtual-grid__header-action-cell", {});
        return (
            <div key={key} style={style} className={className}>
            </div>
        )
    }

    renderCell({ key, style, item, grid, isInEditMode, isLastCellInRow }) {
        let column = this;

        const cellStyle = {
            ...style,

        }

        const className = cn("virtual-grid__cell", "virtual-grid__action-cell", {
            "virtual-grid__cell_last": isLastCellInRow,
        });
        
        const iconClassName = cn("datagrid__action-icon", {
            'datagrid__action-icon_disabled': this.isDisabled
        });
        
        return (
            <div className={className} key={key} style={cellStyle}>
                <img className={iconClassName} src={this.icon} onClick={handleClick}/>
            </div>
        );

        function handleClick() {
            if (!column.isDisabled) {
                column.action(grid, item);
            }
        }
    }

    renderSummaryCell({ key, style, grid, isLastCellInRow }) {
        return null;
    }


    
}
