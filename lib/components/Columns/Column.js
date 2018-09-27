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
        this.columns = config.columns;
        this.editor = config.editor;
        this.sorted = config.sorted;
    }

    renderHeaderCell(grid) {
        var me = this;
        const hasColumns = this.columns && this.columns.length > 0;
        
        const headerCellProps = {
            key: this.name,
        };

        if (this.sorted) {
            headerCellProps.onClick = handleColumnSort;
        }




        const cellStyle = {
            width: this.width + 'px',
        };

        let content;

        if (hasColumns) {
            content = this.renderStackedHeader(grid);
        } else {
            content = this.renderHeader(grid);
        }

        const cls = cn("datagrid__header__cell", {
            "datagrid__header__cell_stacked": hasColumns,
        });
        
        return (
            <td key={this.name} className={cls} style={cellStyle} {...headerCellProps}>
                <div className="datagrid__header__cell-content">
                    { content}
                </div>
            </td>
        );

        

        function handleColumnSort() {
            grid.handleColumnSort(me, me.sortDirection);
        }
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
            isInEditMode,
            grid,
            isSelected,
        } = config;

        let currentValue = item[this.name];
        const key = item.id + this.name + item.version;
        const cellStyle = this.getCellStyle(item);
        
        let content;
        
        switch(true) {
            case this.columns && this.columns.length > 0:
                content = this.renderStackedColumns(this.columns, item);
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
            currentValue = e.target.value;
        }

        function handleFinishEdit() {
            grid.handleEdit(columnId, item.id, currentValue); 
        }
        
    }

    getCellStyle(item) {
        return {
            width: this.width + 'px',
        };
    }

    renderCellContent(currentValue) {
        return <Cell value={currentValue} renderer={this.renderer}/>;
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
        return (
            <table>
                <thead>
                    <tr>
                        <td colSpan={this.columns.length} style={{textAlign: 'center'}}>
                            {this.text}
                        </td>
                    </tr>
                    <tr>
                        {
                            this.columns.map((column) => column.renderHeaderCell(grid))
                        }
                    </tr>
                </thead>
            </table>
        );
    }

    renderStackedColumns(columns, item) {
        return (
            <div className="datagrid__cell datagrid__cell_stacked">
                <table>
                    <tbody>
                        <tr>
                            {
                                columns.map((column) => column.renderCell({
                                    item, 
                                    itemId: item.id,
                                    columnId: column.name
                                }))
                            }

                        </tr>

                    </tbody>
                </table>
            </div>
        );
    }
    




   
}
