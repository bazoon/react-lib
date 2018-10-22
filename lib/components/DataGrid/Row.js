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
 
    shouldComponentUpdate2(nextProps) {
        const props = this.props;
        const itemId = props.item.id;

        if (props.isEditing[itemId] != nextProps.isEditing[itemId]) {
           return true;
        }

        if (props.item != nextProps.item) {
            return true;
        }

        if (props.isSelected !== nextProps.isSelected) {
            return true;
        }

        if (props.columns !== nextProps.columns) {
            return true;
        }

        return false;
    }

    render() {
        console.log('Render row ', this.props.item.id);
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