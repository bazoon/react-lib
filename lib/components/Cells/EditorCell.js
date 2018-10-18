import React, { PureComponent, Component } from 'react';
import PropTypes from 'prop-types';


export default class extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const me = this
        console.log('Rerender editor');
        return (
            <td
                data-itemid={this.props.columnId+'*'+this.props.itemId}
                style={this.props.style}>
                    <div className="datagrid__cell">
                        { this.props.children }
                    </div>
            </td>
        )
    }
}