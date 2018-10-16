import React, { Component } from 'react';
import Column from './Column';
import TreeColumnExpander from '../TreeCommon/TreeColumnExpander';
import TreeSpinner from '../TreeCommon/TreeSpinner';

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

    renderCellContent(currentValue, item, grid) {
        const content = super.renderCellContent(currentValue);
        const isLoaded = item.children && item.children.length > 0;

        return (
            <React.Fragment>
                { item.isLoading && <TreeSpinner/> }
                { !item.leaf &&  <TreeColumnExpander isExpanded={item.expanded} toggle={handleExpand}/> }
                { content }
            </React.Fragment>
        );

        function handleExpand() {
            grid.handleExpand(item);
        }

    }


}