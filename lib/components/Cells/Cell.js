import React, { PureComponent, Component } from 'react';
import PropTypes from 'prop-types';
import CellContent from './CellContent';


export default class extends Component {
    constructor(props) {
        super(props);
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.columnId !== this.props.columnId || 
            nextProps.itemId !== this.props.itemId ||
            nextProps.style.width !== this.props.width) {
            return true;
        } 
        return false;
    }

    render() {
        const me = this
        return (
            <td
                data-itemid={this.props.columnId+'*'+this.props.itemId}
                style={this.props.style}>
                    <div className="datagrid__cell">
                        <CellContent value={this.props.value} renderer={this.props.renderer}></CellContent>
                    </div>
            </td>
        )
    }
}