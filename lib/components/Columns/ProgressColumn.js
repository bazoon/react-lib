import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import Column from './Column';
import Progress from '../ProgressBar/ProgressBar';

export default class ActionColumn extends Column {
    
    renderCellContent(currentValue, item, grid, cellStyle) {
        var me = this;
        const progress = Math.round(item.progress);
        return (
            <td
                data-itemid={this.name+'*'+item.id}
                style={cellStyle}>
                    <div className="datagrid__cell">
                        <Progress overdue={item.overdue} width={this.width - 20} height={15} progress={item.progress}/>
                   </div>
            </td>
        );
        
    }

    renderFooterCellContent() {
        return null;
    }

    
    
}
