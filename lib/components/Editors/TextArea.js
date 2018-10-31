import React, { Component } from 'react';
import PropTypes from 'prop-types';


export default class TextareaEditor extends Component {

    static propTypes = {
        defaultValue: PropTypes.string,
        onChange: PropTypes.func,
        onFinishEdit: PropTypes.func,
    };

    handleKeyDown = (e) => {
        if (e.which === 13 || e.which === 9) {
            this.props.onFinishEdit()
        }
        
    }

    handleChange = (e) => {
        if (this.props.onChange) {
            this.props.onChange(e);
        }
    }

    componentDidMount() {
        this.input.focus();
    }

    render() {
        return (
            <textarea 
                rows="5"
                ref={(input) => { this.input = input; }} 
                onKeyDown={this.handleKeyDown}
                onChange={this.handleChange}
                style={this.props.style}
            >{this.props.defaultValue}</textarea>
        );
    }

}