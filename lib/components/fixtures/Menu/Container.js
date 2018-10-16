import React, { Component } from 'react';
import Menu from '../../Menu/Menu';

export default class Menus extends Component {

    constructor(props) {
        super(props);
        
    }

    render() {

        const style = {
            width: 700,
            height: 700,
            background: '#fff'
        };

        return (
            <div className="theme-white" style={style}>
                <Menu {...this.props}/>
            </div>
        );
    }

}