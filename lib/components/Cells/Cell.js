import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class extends PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <span className="datagrid__cell__text">
                { this.props.renderer ? this.props.renderer(this.props.value) : this.props.value }
            </span>
        )
    }
}