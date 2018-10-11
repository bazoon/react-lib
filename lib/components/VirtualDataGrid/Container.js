import React, { Component } from 'react';
import DataGrid from './VirtualDataGrid';

import Modal from '../Modal/Modal';
import Text from '../Editors/Text';
import faker from 'faker';
import DataStore from '../Stores/DataStore';
import DropDown from '../Editors/Dropdown';
import Paging from '../PagingToolbar/Paging';


export default class Container extends Component {

    constructor(props) {
        super(props);
        this.inputRef = React.createRef();
        this.payload = {};
        this.state = {
            isOpened: false,
            editItem: {},
            headerFilters: props.headerFilters
        };

        const leaders = [];
        for (let i = 0; i < 20; i++) {
            leaders.push({
                id: faker.random.number(),
                name: faker.name.firstName(),
            })
        }

        this.leaderStore = new DataStore({
            fields: ['id', 'name'], 
            url: 'http://localhost:3000/leaders'
        });

        
    }

    handleEdit = (item, store) => {
        this.store = store;
        this.item = item;
        
        this.setState({
            isOpened: true,
            editItem: Object.assign({}, item),
        });
        setTimeout(() => {
            const node = this.inputRef.current;
            node && node.input.focus();
        });
    }

    handleClose = (item) => {
        this.setState({
            isOpened: false
        });
    }

    handleLastFocus = () => {
        const node = this.inputRef.current;
        node && node.input.focus();
    }

    handleChangeField = (field, e) => {
        this.state.editItem[field] = e.target.value;
        this.setState(this.state);
    }

    handleSave = () => {
        let payload = this.state.editItem;
        this.store.update(this.item.id, payload);
    }

    onClearFilters = () => {
        if (!this.state.headerFilters) return;
        const keys = Object.keys(this.state.headerFilters);
        let headerFilters = Object.assign({}, this.state.headerFilters);
        keys.forEach((key) => headerFilters[key].props.value = '');
        var me = this;
        this.setState({ headerFilters: headerFilters }, () => {
            this.props.store.clearFilters();
            this.props.store.load()
        });
    }

    onShowChecked = () => {
        console.log(this.props.store.getData().filter((i) => i.checked));
    }

    render() {
        const fieldStyle = {
            width: '100%',
            marginBottom: '10px'
        }
        

        const a = this.state.isOpened;
        
        return (
            <div className="theme-white" style={{ backgroundColor:'white', width: '900px', margin: '20px'}}>
                <div style={{ marginBottom: '20px' }}>
                    <button onClick={this.props.onSave}>Save</button>
                    <button onClick={this.onShowChecked}>Show checked</button>
                    <button onClick={this.onClearFilters}>Clear filters</button>
                </div>
                <DataGrid {...this.props} onEdit={this.handleEdit} headerFilters={this.state.headerFilters}/>
                <Paging store={this.props.store} interval={3} />
                
                <Modal isOpened={this.state.isOpened} 
                        onClose={this.handleClose}
                        onSave={this.handleSave}
                >

                    <div style={fieldStyle}>
                        <label>
                            Код
                            <Text onChange={this.handleChangeField.bind(this, "code")} ref={this.inputRef} value={this.state.editItem.code}></Text>
                        </label>
                    </div>
                    <div style={fieldStyle}>
                        <label>
                            Имя
                            <Text value={this.state.editItem.name} onChange={this.handleChangeField.bind(this, "name")}></Text>
                        </label>
                    </div>
                    <div style={fieldStyle}>
                        <label>
                            Руководитель
                            <DropDown onChange={this.handleChangeField.bind(this, "leader")} defaultValue={this.state.editItem.leader} idField="name" textField="name" store={this.leaderStore} onBlur={this.handleLastFocus}/>
                        </label>
                    </div>


                
                </Modal>
            </div>
        );
    }

}