import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import Cell from '../Cells/Cell';
import EditorCell from '../Cells/EditorCell';
import CellContent from '../Cells/CellContent';
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
        this.style = config.style;
    }

    setWidth(width) {
        this.width = width;
        if (this.columns && this.columns.length > 0) {
            let childWidth = width / this.columns.length;
            this.columns.forEach((column) => column.setWidth(childWidth));
        }
    }

    renderHeaderCell(grid, headerFilters, isNestedCell = false) {
        var me = this;
        const hasColumns = this.columns && this.columns.length > 0;
        
        const headerCellProps = {
            key: this.name,
        };

        if (this.sorted) {
            headerCellProps.onMouseDown = handleColumnSort;
        }

        const cellStyle = Object.assign({}, {
            width: this.width + 'px',
            height: 0,
            minHeight: '100%'
        }, this.style);

        let content;
        
        let Filter = null;
        let props = {};
        
        if (headerFilters && headerFilters[this.name]) {
            Filter = headerFilters[this.name].filter;
            props = headerFilters[this.name].props;
        }
        
        
        if (hasColumns) {
            return this.renderStackedHeader(grid, headerFilters);
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
                <div style={{display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between'}}>
                    <div className="datagrid__header__cell-content" {...headerCellProps}>
                        { content}
                    </div>

                    {
                        Filter && (
                            <div className="datagrid__header__filter"> 
                                {
                                    <Filter {...props} onChange={handleFilterChange} onFinishEdit={handleFilterFinishEdit}/>
                                }
                            </div>
                        )
                    }


                </div>
                {
                    !isNestedCell && <div data-name={this.name} className="datagrid__header__splitter" onMouseDown={handleMouseDown}></div>
                }
                
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
        
        const key = this.name;
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
        const cellStyle = Object.assign({}, this.getCellStyle(item), this.style);
        let isInEditMode = isEditing && isEditing[item.id] && isEditing[item.id][columnId];

        switch(true) {
            case this.columns && this.columns.length > 0:
                return this.renderStackedColumns(this.columns, item, isEditing, grid);
            case isInEditMode && typeof(this.editor) === 'function':
                let editor = this.renderEditor(currentValue, handleOnChange, handleFinishEdit);
                return this.renderEditorCellContent(item, cellStyle, editor);
                break;
            default:
                return this.renderCellContent(currentValue, item, grid, cellStyle);
        }
        
       function handleOnChange(e) {
            currentValue = e.target.value;
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
    
    renderCellContent(currentValue, item, grid, cellStyle) {
        const key = item.id + this.name + item.version;
        return (
            <Cell key={key} value={currentValue} renderer={this.renderer} columnId={this.name} itemId={item.id} style={cellStyle}>
            </Cell>
        )
    }

    renderFooterCellContent(currentValue) {
        return <CellContent value={currentValue} renderer={this.summaryRenderer || this.renderer}/>;
    }

    renderEditorCellContent(item, cellStyle, editor) {
        const key = item.id + this.name + item.version;
        return (
            <EditorCell key={key} columnId={this.name} itemId={item.id} style={cellStyle}>
                { editor }
            </EditorCell>
        );
    }

    renderEditor(currentValue, handleOnChange, handleFinishEdit) {
        const editorStyle = {
            width: '98%',
            height: '100%'
        }

        return this.editor({
            style: editorStyle,
            value: currentValue,
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

    renderStackedHeader(grid, headerFilters) {
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
                    {this.columns.map((column) => column.renderHeaderCell(grid, headerFilters, true))}                
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
