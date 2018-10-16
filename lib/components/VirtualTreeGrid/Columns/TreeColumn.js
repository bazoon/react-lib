import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Column from '../../VirtualDataGrid/Columns/Column';
import TreeColumnExpander from '../../Columns/TreeColumnExpander';

const levelPadding = 20;

export default class TreeColumn extends Column {


    renderContentWrap(grid, item, content) {
        const style = {
            paddingLeft: item.level * levelPadding + 'px'
        };
        
        const isLoaded = item.children && item.children.length > 0;
        
        return (
            <div style={style}>
                { item.isLoading && <><span className="spinner_one">•</span><span className="spinner_two">•</span><span className="spinner_three">•</span>&nbsp;</> }
                { !item.leaf && !item.isLoading && <TreeColumnExpander isLoaded={isLoaded} isExpanded={item.expanded} toggle={handleExpand}/> }
                {content}
            </div>
            
        );

        function handleExpand() {
            grid.handleExpand(item);
        }
    }

}