import DateField from '../Editors/Date';
import React, { Component } from 'react';
import PropTypes from 'prop-types';


export default class DateFilter extends Component {
    
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
                <DateField value={this.props.value} onChange={this.props.onChange} onFinishEdit={this.handleFinishEdit}/>
            </div>
        )
    }

}