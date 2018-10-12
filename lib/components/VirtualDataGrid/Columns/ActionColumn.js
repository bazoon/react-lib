import React from 'react';
import PropTypes from 'prop-types';
import Column from './Column';
import cn from 'classnames';


export default class ActionColumn extends Column {
    constructor(config) {
        super(config);
        this.icon = config.icon;
    }

    action(grid, item) {
        
    }
    
    renderHeaderCell({ key, style }) {
        const className = cn("virtual-grid__cell", "virtual-grid__header-cell", {});
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

        const className = cn("virtual-grid__cell", {
            "virtual-grid__cell_last": isLastCellInRow,
        });
        
        
        return (
            <div className={className} key={key} style={cellStyle}>
                <img className="datagrid__action-icon" src={this.icon} onClick={handleClick}/>
            </div>
        );

        function handleClick() {
            column.action(grid, item);
        }
    }


    
}
