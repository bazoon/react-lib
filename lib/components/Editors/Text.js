import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import './text.scss';


export default class TextEditor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: props.defaultValue || '',
        }
    }
    

    static propTypes = {
        onChange: PropTypes.func,
        onFinishEdit: PropTypes.func,
        required: PropTypes.bool,
    };

    handleKeyDown = (e) => {
        if (e.which === 13 || e.which === 9) {
            var me = this;
            
            let value = this.isValid() ? this.state.value : this.props.defaultValue;
            if (this.props.onFinishEdit) {
                this.props.onFinishEdit(value)
            }
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

    isValid() {
        if (this.props.required) {
            return this.state.value;
        } else {
            return true;
        }
    }

    render() {
        const className = cn({
            'textfield_invalid': !this.isValid()
        });

        const title = this.isValid() ? '' : 'Это поле обязательно для заполнения';
        
        return (
            <input value={this.state.value}
                className={className}
                title = {title}
                ref={(input) => { this.input = input; }} 
                required={this.props.required}
                onKeyDown={this.handleKeyDown}
                onChange={this.handleChange}
                style={this.props.style}
                onBlur={this.props.onBlur}
                
            />
        );
    }



}