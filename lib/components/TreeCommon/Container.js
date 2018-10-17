import React, { Component } from 'react';
import permissionsUtils from '../../../utils/permissions';
import Button from '../button/Button';



export default (Grid, EditWindow) => class Container extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpened: false,
            editItem: {},
            headerFilters: props.headerFilters,
            canAdd: true,
            canEdit: true,
            canDelete: true,
            columns: this.props.columns
        };
        this.editWindowRef = React.createRef();
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
            const editWindow = this.editWindowRef.current;
            editWindow && editWindow.focusFirstInput();
        });
    

    }

    handleClose = (item) => {
        this.setState({
            isOpened: false
        });
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
            const editWindow = this.editWindowRef.current;
            editWindow && editWindow.focusFirstInput();
        });
    }

    render() {
        return (
            <div className="theme-white" style={{ backgroundColor:'white', width: '900px', margin: '20px'}}>
                <div style={{ marginBottom: '20px' }}>
                    <Button type="primary" size="sm" disabled={!this.state.canAdd} onClick={this.handleAdd}>Add</Button>
                    &nbsp;
                    <Button type="primary" size="sm" onClick={this.props.onSave}>Save</Button>
                    &nbsp;
                    <Button type="primary" size="sm" onClick={this.onClearFilters}>Clear filters</Button>
                </div>
                <Grid {...this.props} canEdit={this.state.canEdit} columns={this.state.columns} onEdit={this.handleEdit} headerFilters={this.state.headerFilters}/>
                {/* <Paging store={this.props.store} interval={3} /> */}
                
                <EditWindow isOpened={this.state.isOpened} 
                        onClose={this.handleClose}
                        onSave={this.handleSave}
                        editItem={this.state.editItem}
                        onChangeField={this.handleChangeField}
                        ref={this.editWindowRef}
                />

                    
            </div>
        );


    }




}