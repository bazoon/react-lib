import React, { PureComponent, Component } from 'react';
import PropTypes from 'prop-types';
import CellContent from './CellContent';
import TreeSpinner from '../TreeCommon/TreeSpinner';
import TreeColumnExpander from '../TreeCommon/TreeColumnExpander';


export default class extends PureComponent {
    constructor(props) {
        super(props);
    }

    // shouldComponentUpdate(nextProps, nextState) {
    //     if (nextProps.columnId !== this.props.columnId || 
    //         nextProps.itemId !== this.props.itemId) {
    //         console.log(nextProps.columnId, this.props.columnId, nextProps.itemId, this.props.itemId)
    //         return true;
    //     } 
    //     return false;
    // }

    render() {
        const me = this
        
        
        return (
            <td
                data-itemid={this.props.columnId+'*'+this.props.itemId}
                style={this.props.style}>
                    <div className="datagrid__cell">
                        { this.props.isLoading && <TreeSpinner/> }
                        { !(this.props.isLeaf !== false)  &&  <TreeColumnExpander isLoaded={this.props.isLoaded} isExpanded={this.props.isExpanded} toggle={this.props.onExpand}/> }
                        <CellContent item={this.props.item} value={this.props.value} renderer={this.props.renderer}></CellContent>
                    </div>
            </td>
        )
    }
}