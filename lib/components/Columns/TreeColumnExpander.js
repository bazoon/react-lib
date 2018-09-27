import React, { Component } from 'react';
import minus from '../icons/minus.svg';
import plus from '../icons/plus.svg';

export default class TreeColumnExpander extends Component {
 
    render() {
        const isExpanded = this.props.isExpanded;
        let toggle;

        if (isExpanded) {
            toggle = <img src={minus} className="datagrid__tree__expander-icon" onClick={this.props.toggle} />;
        } else {
            toggle = <img src={plus} className="datagrid__tree__expander-icon" onClick={this.props.toggle} />
        }

        return (
            <span className="datagrid__tree__expander">
                { toggle }
            </span>
        );
    }

}