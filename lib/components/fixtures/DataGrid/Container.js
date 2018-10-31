import React, { Component } from 'react';
import DataGrid from '../../DataGrid/DataGrid';
import Modal from '../../Modal/Modal';
import Text from '../../Editors/Text';
import faker from 'faker';
import DataStore from '../../Stores/DataStore';
import DropDown from '../../Editors/Dropdown';
import Paging from '../../PagingToolbar/Paging';
import withPermissions from '../../TreeCommon/WithPermissions';
import permissionsUtils from '../../../../utils/permissions';

export default class Grids extends Component {

    constructor(props) {
        super(props);
        this.inputRef = React.createRef();
        this.payload = {};
        this.state = {
            isOpened: false,
            editItem: {},
            headerFilters: props.headerFilters,
            canAdd: true,
            canEdit: true,
            canDelete: true,
            columns: this.props.columns
        };

        this.leaderStore = new DataStore({
            fields: ['id', 'name'], 
            url: 'http://localhost:3000/leaders'
        });
    }

    applyPermissions() {
        const permissions = permissionsUtils.getPermissions(this.props.permissions);
        
        this.state.columns.setEnabled('edit', permissions.edit === true);
        this.state.columns.setEnabled('delete', permissions.delete === true);

        this.setState({
            canAdd: permissions.add,
            canEdit: permissions.edit,
            permissions: this.props.permissions
        });
    }
    

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.permissions && this.props.permissions !== this.state.permissions) {
            this.applyPermissions();
        }
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
        this.setState({
            isOpened: false
        });
        this.props.store.update(this.state.editItem.id, payload);
        
    }

    onClearFilters = () => {
        if (!this.state.headerFilters) return;
        const keys = Object.keys(this.state.headerFilters);
        keys.forEach((key) => this.state.headerFilters[key].props.value = '');
        var me = this;
        this.setState(this.state, () => {
            this.props.store.clearFilters();
            this.props.store.load()
        });
    }

    handleAdd = () => {
        let item = {
            id: -1,
            code: '',
            name: '',
            leader: '',
        }
        
        this.setState({
            isOpened: true,
            editItem: item,
        });
        setTimeout(() => {
            const node = this.inputRef.current;
            node && node.input.focus();
        });
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
                    <button disabled={!this.state.canAdd} onClick={this.handleAdd}>Add</button>
                    <button onClick={this.props.onSave}>Save</button>
                    <button onClick={this.props.onShowChecked}>Show checked</button>
                    <button onClick={this.onClearFilters}>Clear filters</button>
                </div>
                <DataGrid {...this.props} canEdit={this.state.canEdit} columns={this.state.columns} onEdit={this.handleEdit} headerFilters={this.state.headerFilters}/>
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
                            <DropDown onChange={this.handleChangeField.bind(this, "leader")} value={this.state.editItem.leader} idField="name" textField="name" store={this.leaderStore} onBlur={this.handleLastFocus}/>
                        </label>
                    </div>


                
                </Modal>
            </div>
        );
    }

}