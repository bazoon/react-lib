import React, { Component } from 'react';
import Column from './Column';
import TreeColumnExpander from '../TreeCommon/TreeColumnExpander';
import TreeSpinner from '../TreeCommon/TreeSpinner';
import TreeCell from '../Cells/TreeCell';

export default class TreeColumn extends Column {

    constructor(props) {
        super(props);
        this.defaultPadding = props.defaultPadding || 6;
    }

    getCellStyle(item) {
        let style = super.getCellStyle(item);
        style.paddingLeft = this.defaultPadding + (item.level * 20) + 'px';
        return style;
    }

    renderCellContent(currentValue, item, grid, cellStyle) {
        const isLoaded = item.children && item.children.length > 0;
        const key = item.id + this.name + item.version;
        
        return (
            <TreeCell onExpand={handleExpand} isLoading={item.isLoading} isLeaf={item.leaf} 
                isExpanded={item.expanded} key={key} value={currentValue} renderer={this.renderer} 
                columnId={this.name} itemId={item.id} style={cellStyle} isLoaded={isLoaded}>
            </TreeCell>
        )

        function handleExpand() {
            grid.handleExpand(item);
        }

    }


}