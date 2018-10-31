import React, { Component } from 'react';
import Tab from '../../Tab/Tab';

export default class Tabs extends Component {

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
                    <Tab {...this.props} />
                </div>
            </>
        );
    }

}