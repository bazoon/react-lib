import React, { Component } from 'react';
import Checkbox from '../../Checkbox/Checkbox';

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
                    Checkbox
                    <Checkbox checked={this.state.checked} onChange={this.handleChecked}/>
                    Disabled
                    <Checkbox disabled/>
                    Toggled disabled
                    <Checkbox disabled checked/>
                </div>
                
            </>
        );
    }

}