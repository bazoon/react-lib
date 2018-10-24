import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import flatten from '../../../utils/flatten';

export default class extends Component {
    static propTypes = {
        columns: PropTypes.object.isRequired,
        item: PropTypes.object.isRequired,
        isSelected: PropTypes.bool.isRequired,
        grid: PropTypes.object.isRequired,
        isEditing: PropTypes.object.isRequired,
    };
 
    shouldComponentUpdate(nextProps) {
        const props = this.props;
        const itemId = props.item.id;

        if (props.isEditing[itemId] != nextProps.isEditing[itemId] ||
            props.item != nextProps.item ||
            props.isSelected !== nextProps.isSelected ||
            props.columns !== nextProps.columns
        ) {
           return true;
        }

        
        return false;
    }

    render() {
        const isSelected = this.props.isSelected;
        const className = isSelected ? 'datagrid__row_selected' : '';

        // Разворачиваем вложенные, чтобы td шли один за другим
        var cells = flatten(this.props.columns.map(column => {
            return this.renderCell(column, this.props.item, this.props.grid);
        }));

        return (
            <tr key={this.props.item.id} className={className}>
                {
                    cells.map((cell, i) => cell)
                }
            </tr>
        );
    }

    renderCell(column, item, grid) {
        return column.renderCell({
            item,
            itemId: item.id,
            columnId: column.name,
            grid: grid,
            columns: column.columns,
            isSelected: this.props.isSelected,
            isEditing: this.props.isEditing
        });
    }


}