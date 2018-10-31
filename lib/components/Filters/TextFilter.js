import TextField from '../Editors/Text';
import React, { Component } from 'react';
import PropTypes from 'prop-types';


export default class TextFilter extends Component {
    
    constructor(props) {
        super(props);
    } 

    handleFinishEdit = (v) => {
        var me = this;
        
        if (this.props.onFinishEdit) {
            this.props.onFinishEdit({
                value: v,
                ordering: 'eq'
            });
        }
    }

    render() {
        
        return (
            <div className="text-filter">
                <TextField value={this.props.value} onChange={this.props.onChange} onFinishEdit={this.handleFinishEdit}/>
            </div>
        )
    }

}