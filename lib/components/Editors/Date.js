import React, { Component } from 'react';
import PropTypes from 'prop-types';
import dateUtil from '../../../utils/date';
import cn from 'classnames';

export default class DateEditor extends Component {

    static propTypes = {
        defaultValue: PropTypes.string,
        onChange: PropTypes.func,
        onFinishEdit: PropTypes.func,
    };

    constructor(props) {
        super(props);
        this.state = {
            value: dateUtil.formatDate(this.props.defaultValue, 'y-m-d'),
        }
    }

    isValid() {
        if (this.props.required) {
            return this.state.value;
        } else {
            return true;
        }
    }

    handleKeyDown = (e) => {
        if (e.which === 13 || e.which === 9) {
            let value = this.isValid() ? this.state.value : this.props.defaultValue;

            this.props.onFinishEdit(value)
        }
        
    }

    handleChange = (e) => {
        this.setState({
            value: e.target.value,
        });
        
        if (this.props.onChange) {
            this.props.onChange(e);
        }
    }

    componentDidMount() {
        this.input.focus();
    }

    render() {
        const className = cn({
            'textfield_invalid': !this.isValid()
        });

        return (
            <input type="date" value={this.props.value}
                className={className}
                ref={(input) => { this.input = input; }} 
                onKeyDown={this.handleKeyDown}
                onChange={this.handleChange}
                style={this.props.style}
            />
        );
    }
}