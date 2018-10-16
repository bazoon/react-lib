import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
// import Cell from '../Cells/Cell';
// import Sorter from '../Sorter/Sorter';

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
        this.isAllChecked = false;
    }

    renderHeaderCell({ key, style, grid, isLastCellInRow }) {
        const me = this;
        const className = cn("virtual-grid__cell", "virtual-grid__header-action-cell", {});
        return (
            <div key={key} style={style} className={className}>
                <input type="checkbox" onChange={handleCheckAll} />
            </div>
        )

        function handleCheckAll() {
            me.isAllChecked = !me.isAllChecked;
            grid.handleAllChecked(me.isAllChecked);
        }
    }

    renderCell({ key, style, item, grid, isInEditMode, isLastCellInRow }) {
        
        let column = this;

        const cellStyle = {
            ...style,
        }

        const className = cn("virtual-grid__cell", "virtual-grid__action-cell", {
            "virtual-grid__cell_last": isLastCellInRow,
        });

        
        const isChecked = item.checked ? true : false;

        
        
        return (
            <div className={className} key={key} style={cellStyle}>
                <input type="checkbox" onChange={handleCheck} checked={isChecked} />
            </div>
        );

        function handleCheck() {
            grid.handleItemChecked(item);
        }

    }

    renderEditor({value, editor, handleOnChange, handleFinishEdit, style}) {
        const editorStyle = {
            width: style.width,
            height: style.height,
            boxSizing: 'border-box'
        };

        
        return editor({
            style: editorStyle,
            value,
            onChange: handleOnChange,
            onFinishEdit: handleFinishEdit,
        });
    }

    renderSummaryCell({ key, style, grid, isLastCellInRow }) {
        return null;
    }


}
