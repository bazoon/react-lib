import React, { Component } from 'react';
import DataGrid from '../../DataGrid/DataGrid';

export default class Container extends Component {

    render() {
        return (
            <div className="theme-white" style={{ backgroundColor:'white', width: '900px', margin: '20px'}}>
                <div style={{ marginBottom: '20px' }}>
                    <button onClick={this.props.onSave}>Save</button>
                    <button onClick={this.props.onShowChecked}>Show checked</button>
                </div>
                <DataGrid {...this.props}/>
            </div>
        );
    }

}