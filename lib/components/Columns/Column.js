import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import Cell from '../Cells/Cell';
import Sorter from '../Sorter/Sorter';

export default class {
    constructor(config) {
        this.name = config.name;
        this.width = config.width;
        this.text = config.text;
        this.renderer = this.renderer || config.renderer;
        this.summaryRenderer = config.summaryRenderer;
        this.columns = config.columns;
        this.editor = config.editor;
        this.sorted = config.sorted;
        this.filter = config.filter;
        this.draggable = config.draggable;
    }

    setWidth(width) {
        this.width = width;
        if (this.columns && this.columns.length > 0) {
            let childWidth = width / this.columns.length;
            this.columns.forEach((column) => column.setWidth(childWidth));
        }
    }

    renderHeaderCell(grid, headerFilters) {
        var me = this;
        const hasColumns = this.columns && this.columns.length > 0;
        
        const headerCellProps = {
            key: this.name,
        };

        if (this.sorted) {
            headerCellProps.onMouseDown = handleColumnSort;
        }


        const cellStyle = {
            width: this.width + 'px',
        };

        let content;
        
        let Filter = null;
        let filterValue = null;
        
        if (headerFilters && headerFilters[this.name]) {
            Filter = headerFilters[this.name].filter;
            filterValue = headerFilters[this.name].value;
        }
        
        
        if (hasColumns) {
            return this.renderStackedHeader(grid);
        } else {
            content = this.renderHeader(grid);
        }

        const cls = cn("datagrid__header__cell", {
            "datagrid__header__cell_stacked": hasColumns,
        });
        
        return (
            <th draggable={this.draggable} key={this.name} className={cls} 
                style={cellStyle} onDragStart={handleDragStart} onDrop={handleDrop} onDragOver={handleDragOver}
            >
                <div className="datagrid__header__cell-content" {...headerCellProps}>
                    { content}
                </div>
                <div className="datagrid__header__filter"> 
                    {
                        Filter && <Filter value={filterValue} onChange={handleFilterChange} onFinishEdit={handleFilterFinishEdit}/>
                    }
                </div>
                <div data-name={this.name} className="datagrid__header__splitter" onMouseDown={handleMouseDown}></div>
            </th>
        );

        function handleMouseDown(e) {
            grid.handleResizeStart(e);
        }

        function handleColumnSort() {
            grid.handleColumnSort(me, me.sortDirection);
        }

        function handleDragStart(e) {
            var dataTransfer = e.dataTransfer;
            dataTransfer.setData('sourceColumn', me.name);
        }

        function handleDrop(e) {
            var dataTransfer = e.dataTransfer;
            var sourceColumn = dataTransfer.getData('sourceColumn');
            grid.handleColumnMove(sourceColumn, me.name);
        }

        function handleDragOver(e) {
            e.preventDefault();
        }

        function handleFilterFinishEdit(v) {
            grid.handleFilterFinishEdit({
                field: me.name,
                value: v
            });
        }

        function handleFilterChange(e) {
            grid.handleFilterChange(me.name, e.target.value);
        }

    }

    renderFooterCell(config) {
        const {
            item,
            itemId,
            columnId,
            grid,
            columns
        } = config;
        
        var me = this;
        const hasColumns = this.columns && this.columns.length > 0;
        const key = item.id + this.name;
        let currentValue = item[columnId];
        const cellStyle = {
            width: this.width + 'px',
        };
        
        let content;
        
        switch(true) {
            case this.columns && this.columns.length > 0:
                return this.renderStackedFooterColumns(this.columns, item, grid);
                break;
            default:
                content = this.renderFooterCellContent(currentValue, item, grid);
        }


        return (
            <td
                key={key} 
                style={cellStyle}>
                    <div className="datagrid__cell">
                        { content }
                    </div>
            </td>
        );


        
    }

    toggleSortDirection() {
        this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    }

    renderCell(config) {
        const me = this;
        const {
            item,
            itemId,
            columnId,
            isEditing,
            grid,
            isSelected,
        } = config;


        let currentValue = item[this.name];
        const key = item.id + this.name + item.version;
        const cellStyle = this.getCellStyle(item);
        let isInEditMode = isEditing && isEditing[columnId] && isEditing[columnId][item.id];

        let content;
        
        switch(true) {
            case this.columns && this.columns.length > 0:
                let c = this.renderStackedColumns(this.columns, item, isEditing, grid);
                return c;
                break;
            case isInEditMode && typeof(this.editor) === 'function':
                content = this.renderEditor(currentValue, handleOnChange, handleFinishEdit);
                break;
            default:
                content = this.renderCellContent(currentValue, item, grid);
        }

        return (
            <td
                key={key} 
                data-itemid={columnId+'*'+itemId}
                style={cellStyle}>
                    <div className="datagrid__cell">
                        { content }
                    </div>
            </td>
        );


        function handleOnChange(e) {
            // currentValue = e.target.value;
        }

        function handleFinishEdit(value) {
            grid.handleEdit(columnId, item.id, value || currentValue); 
        }
        
    }

    getCellStyle(item) {
        return {
            width: this.width + 'px',
            maxWidth: this.width + 'px',
            minWidth: this.width + 'px',
        };
    }

    renderCellContent(currentValue) {
        return <Cell value={currentValue} renderer={this.renderer}/>;
    }

    renderFooterCellContent(currentValue) {
        return <Cell value={currentValue} renderer={this.summaryRenderer || this.renderer}/>;
    }


    renderEditor(currentValue, handleOnChange, handleFinishEdit) {
        const editorStyle = {
            width: '98%',
            height: '100%'
        }

        return this.editor({
            style: editorStyle,
            defaultValue: currentValue,
            onChange: handleOnChange,
            onFinishEdit: handleFinishEdit,
        });
    }

    renderHeader() {
        return (
            <React.Fragment>
                { this.text } 
                &nbsp;
                { this.sorted? <Sorter sortDirection={this.sortDirection}/> : null }
            </React.Fragment>
        );
    }

    renderStackedHeader(grid) {
        var me = this;
        var cols = calcColumns(this.columns);
        const cellStyle = {
            width: this.width + 'px',
            textAlign: 'center',
        };
        return (
            <th draggable className="datagrid__header__cell datagrid__cell datagrid__cell_stacked" onDragStart={handleDragStart} onDrop={handleDrop} colSpan={cols} style={cellStyle}>
                <div className="datagrid__header__cell__top">
                    {this.text}
                </div>
                <div className="datagrid__header__cell__bottom">
                    {this.columns.map((column) => column.renderHeaderCell(grid))}                
                </div>
                <div data-name={this.name} className="datagrid__header__splitter" onMouseDown={handleMouseDown}></div>
            </th>
        );

        function handleMouseDown(e) {
            grid.handleResizeStart(e);
        }

        function calcColumns(columns) {
            if (!columns) return 0;
            return columns.reduce(function(acc, column) {
                if (column.columns && columns.length > 0) {
                    acc += calcColumns(column.columns);
                } else {
                    acc += 1;
                }

                return acc;
            }, 0);
        }

        function handleDragStart(e) {
            var dataTransfer = e.dataTransfer;
            dataTransfer.setData('sourceColumn', me.name);
        }

        function handleDrop(e) {
            var dataTransfer = e.dataTransfer;
            var sourceColumn = dataTransfer.getData('sourceColumn');
            grid.handleColumnMove(sourceColumn, me.name);
        }

    }


    renderStackedColumns(columns, item, isEditing, grid) {
        return columns.map((column) => column.renderCell({
            item, 
            itemId: item.id,
            columnId: column.name,
            isEditing,
            grid
        }));
    }

    renderStackedFooterColumns(columns, item, grid) {
        return columns.map((column) => column.renderFooterCell({
            item, 
            itemId: item.id,
            columnId: column.name,
            grid
        }));
    }
   
}
