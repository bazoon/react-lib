import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
// import Cell from '../Cells/Cell';
import Sorter from '../../Sorter/Sorter'

export default class {
    constructor(config) {
        this.name = config.name;
        this.width = config.width;
        this.text = config.text;
        this.renderer = this.renderer || config.renderer;
        this.summaryRenderer = config.summaryRenderer;
        this.editor = config.editor;
        this.sorted = config.sorted;
        this.filter = config.filter;
        this.draggable = config.draggable;
    }

    renderHeaderCell({ key, style, grid, isLastCellInRow }) {
        const column = this;
        const className = cn("virtual-grid__cell", "virtual-grid__header-cell", {
            "virtual-grid__cell_last": isLastCellInRow
        });
        let cellStyle = {
            ...style,
        };
        let text = column.text;

        if (column.group && column.groupPosition === 1) {
            let cols = this.state.columns.filter((c) => c.group === column.group);
            let width = cols.reduce((a, e) => a + e.width, 0);
            
            let subWidth = width / cols.length;
            

            text = cols.map((c) => c.text).join(' ');
            cellStyle.width = width;

            let nestedStyle = {
                ...cellStyle,
            }


            return (
                <div style={nestedStyle}>
                    <div style={{textAlign: 'center'}}>{column.group}</div>
                    <div style={{display: 'flex'}}>
                        {
                            cols.map((c) => <div style={ { width: subWidth, textAlign: 'center' } }>{c.text}</div>)
                        }
                    </div>
                    
                </div>
            
            )
        } else if (column.group) {
            return null;
        }

        return (
            <div draggable={column.draggable} style={cellStyle} key={key} className={className} onClick={handleColumnSort} onDragStart={handleDragStart} onDrop={handleDrop} onDragOver={handleDragOver}>
                <div className="virtual-grid__header-cell-wrapper">
                    <div className="virtual-grid__header-cell-content">
                        {text}
                        &nbsp;
                        { column.sorted ? <Sorter sortDirection={column.sortDirection}/> : null }
                    </div>
                    
                </div>
                <div data-name={this.name} className="datagrid__header__splitter" onMouseDown={handleMouseDown}></div>
            </div>
        );

        function handleColumnSort() {
            grid.handleColumnSort(column);
        }

        function handleMouseDown(e) {
            grid.handleResizeStart(e);
        }

        function handleDragStart(e) {
            var dataTransfer = e.dataTransfer;
            dataTransfer.setData('sourceColumn', column.name);
        }

        function handleDrop(e) {
            var dataTransfer = e.dataTransfer;
            var sourceColumn = dataTransfer.getData('sourceColumn');
            grid.handleColumnMove(sourceColumn, column.name);
        }

        function handleDragOver(e) {
            e.preventDefault();
        }

    }

    renderCell({ key, style, item, grid, isInEditMode, isLastCellInRow, isSelected }) {
        let column = this;

        const cellStyle = {
            ...style,
        }

        const className = cn("virtual-grid__cell", {
            "virtual-grid__cell_last": isLastCellInRow,
            "virtual-grid__cell_editing": isInEditMode,
            "virtual-grid__cell_selected": isSelected
        });

        let currentValue = item[column.name];
        let content = currentValue;
    
        if (typeof column.renderer === 'function') {
            content = column.renderer(content, cellStyle);
        }

        content = this.renderContentWrap(grid, item, content);
        
        if (isInEditMode && typeof column.editor === 'function') {
            content = this.renderEditor({
                value: currentValue,
                style: cellStyle,
                editor: column.editor,
                handleFinishEdit
            });
        } 
        
        return (
            <div className={className} key={key} style={cellStyle} data-itemid={column.name+'*'+item.id}>
                { content }
            </div>
        );

        function handleFinishEdit(value) {
            grid.handleEdit(column.name, item.id, value || currentValue); 
        }

    }

    renderContentWrap(grid, item, content) {
        return content;
    }

    renderEditor({value, editor, handleFinishEdit, style}) {
        const editorStyle = {
            width: style.width,
            height: style.height,
            boxSizing: 'border-box'
        };

        
        return editor({
            style: editorStyle,
            value,
            onFinishEdit: handleFinishEdit,
        });
    }


    renderSummaryCell({ key, style, grid, isLastCellInRow, item }) {
        const column = this;
        const className = cn("virtual-grid__cell", "virtual-grid__summary-cell", {
            "virtual-grid__cell_last": isLastCellInRow
        });
        let cellStyle = {
            ...style,
        };

        let currentValue = item[column.name];

        return (
            <div style={cellStyle} key={key}>
                { currentValue }
            </div>
        )
    }


    setWidth(width) {
        this.width = width;
    }


}
