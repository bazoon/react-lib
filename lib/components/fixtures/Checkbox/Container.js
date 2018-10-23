import React, { Component } from 'react';
import Radio from '../../Radio/Radio';

export default class Checkboxes extends Component {

    constructor(props) {
        super(props);
        this.state = {
            checked: true
        };
    }

    handleChecked = (e) => {
        this.setState({
            checked: !this.state.checked
        });
    }

    render() {
        const style = {
            width: 700,
            height: 500,
            background: '#fff',
            padding: '30px',
            boxSizing: 'border-box'
        };

        return (
            <>
                <div className="theme-white" style={style}>
                    Radio
                    <Radio checked={this.state.checked} onChange={this.handleChecked}/>
                    Disabled
                    <Radio disabled/>
                    Toggled disabled
                    <Radio disabled checked/>
                </div>
                
            </>
        );
    }

}