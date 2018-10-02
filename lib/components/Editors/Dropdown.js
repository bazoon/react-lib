import React, { Component } from 'react';
import PropTypes from 'prop-types';


export default class Dropdown extends Component {

    static propTypes = {
        defaultValue: PropTypes.string,
        onChange: PropTypes.func,
        onFinishEdit: PropTypes.func,
        store: PropTypes.object,
    };

    constructor(props) {
        super(props);
        
        const data = props.store.getData();

        if (this.props.hasBlankChoice) {
            data.splice(0, 0, {
                id: -1,
                value: null,
            });
        }


        this.state = {
            options: data.map((item) => {
                return {
                    id: item[this.props.idField],
                    value: item[this.props.textField],
                };
            }),
            value: undefined
        };
        
        
    }

    handleChange = (e) => {
        this.setState({
            value: e.target.value,
        }, () => this.props.onFinishEdit(this.state.value));
    }

    render() {
        return (
            <select defaultValue={this.props.defaultValue}
                onKeyDown={this.handleKeyDown}
                onChange={this.handleChange}
                style={this.props.style}
            >
                {
                    this.state.options.map((o) => <option key={o.id} value={o.id}>{o.value}</option> )
                }
            </select>
        );
    }



}