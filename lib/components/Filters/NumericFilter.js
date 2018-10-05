import TextField from '../Editors/Text';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './numeric.scss';

export default class NumericFilter extends Component {
    
    constructor(props) {
        super(props);
        this.options = [
            {
                id: 'lt',
                text: '<'
            },
            {
                id: 'eq',
                text: '='
            },
            {
                id: 'gt',
                text: '>'
            }
        ];
        this.state = {
            ordering: 'eq'
        };
    } 

    handleFinishEdit = (v) => {
        var me = this;
        
        if (this.props.onFinishEdit) {
            this.props.onFinishEdit({
                value: v,
                ordering: this.state.ordering
            });
        }
    }

    handleChangeOrdering = (e) => {
        this.setState({
            ordering: e.target.value
        });
    }

    render() {
        
        return (
            <div className="numeric-filter">
                <select value={this.state.ordering} onChange={this.handleChangeOrdering}>
                    {
                        this.options.map((o) => <option key={o.id} value={o.id}>{o.text}</option>)
                    }
                </select>
                <TextField onFinishEdit={this.handleFinishEdit}/>
            </div>
        )
    }

}