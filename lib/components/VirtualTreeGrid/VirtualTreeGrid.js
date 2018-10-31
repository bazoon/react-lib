import React, { Component } from 'react';
import cn from 'classnames';

import { Grid, List, ScrollSync, defaultCellRangeRenderer } from 'react-virtualized'
import 'react-virtualized/styles.css'; 
import VirtualGrid from '../VirtualDataGrid/VirtualDataGrid';
import TextFilter from '../Filters/TextFilter';
import NumericFilter from '../Filters/NumericFilter';
import DropDown from '../Editors/Dropdown';
import DataStore from '../Stores/DataStore';
import TextEditor from '../Editors/Text';
import Sorter from '../Sorter/Sorter';
import { debug } from 'util';
import scrollbarSize from 'dom-helpers/util/scrollbarSize';

export default class extends VirtualGrid {

    cellRenderer = ({columnIndex, key, rowIndex, style}) => {
        
        const me = this;
        
        const column = this.state.columns[columnIndex];
        const tree = this.props.store.getData();
        const item = this.props.store.findByIndex()(tree ,rowIndex);
        
        // if (items.length === 0) {
        //     return null;
        // }

        // const item = items[rowIndex];
        const isSelected = item.id === this.state.selectedItemId;

        return column.renderCell({
            key,
            style,
            item,
            grid: this,
            isLastCellInRow: columnIndex === this.state.columns.length - 1,
            isInEditMode: typeof column.editor === 'function' && this.state.isEditing && this.state.isEditing[column.name] && this.state.isEditing[column.name][item.id],
            isSelected
        });
    }

    getRowCount() {
        const items = this.getItems();
        return this.props.store.countExpanded(items);
    }

    handleExpand(item) {
        if (item.children && item.children.length > 0) {
            item.expanded = !item.expanded;
            this.setState(this.state);
            this.refresh();
        } else {
            item.isLoading = true;
            this.refresh();
            this.props.store.loadChildren(item.id).then(() => {
                item.expanded = !item.expanded;
                item.isLoading = false;
                this.refresh();
            });
        }

    }

}