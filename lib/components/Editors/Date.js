import React, { Component } from 'react';
import PropTypes from 'prop-types';
import dateUtil from '../../../utils/date';


export default class DateEditor extends Component {

    static propTypes = {
        defaultValue: PropTypes.string,
        onChange: PropTypes.func,
        onFinishEdit: PropTypes.func,
    };

    handleKeyDown = (e) => {
        if (e.which === 13 || e.which === 9) {
            this.props.onFinishEdit();
        }
        
    }

    handleChange = (e) => {
        if (this.props.onChange) {
            this.props.onChange(e);
        }
    }

    render() {
        const value = dateUtil.formatDate(this.props.defaultValue, 'y-m-d');
        return (
            <input type="date" defaultValue={value}
                onKeyDown={this.handleKeyDown}
                onChange={this.handleChange}
                style={this.props.style}
            />
        );
    }
}