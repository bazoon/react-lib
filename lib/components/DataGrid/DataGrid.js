import React, { Component } from 'react';
import PropTypes from 'prop-types';
import 'normalize.css';
import './datagrid.scss'
// import './themes/dark/dark.scss';

export default class DataGrid extends Component {

    static propTypes = {
        columns: PropTypes.array.isRequired,
        store: PropTypes.object.isRequired,
        height: PropTypes.number,
    };

    static defaultProps = {
        columns: [],
    }

    constructor(props) {
        super(props);
        this.state = {
            columns: props.columns,
            isEditing: {},
        };

    }

    componentDidMount() {
        this.props.store.load().then(() => this.setState(this.state));
    }

    renderHeader() {
        return (
            <thead>
                <tr>
                    {
                        this.props.columns.map(column => this.renderHeaderColumn(column))
                    }
                </tr>
                
            </thead>
        );
    }

    
    renderHeaderColumn(column) {
        return column.renderHeaderCell(this);
    }

    
    renderCell(column, item) {
        const isInEditMode = this.state.isEditing[column.name] && this.state.isEditing[column.name][item.id];

        return column.renderCell({
            item,
            itemId: item.id,
            columnId: column.name,
            grid: this,
            columns: column.columns,
            isInEditMode,
            isSelected: item.id === this.state.selectedItemId,
        });

        
    }


    renderRow(item) {
        const isSelected = item.id === this.state.selectedItemId;
        const className = isSelected ? 'datagrid__row_selected' : '';

        return (
            <tr key={item.id} className={className}>
                { this.props.columns.map(column => this.renderCell(column, item))}
            </tr>
        );
    }

    renderBody() {
        const items = this.props.store.getData();
        return (
            <tbody>
                {
                    items.map(item => this.renderRow(item))
                }        
            </tbody>
        );
    }

    getClickData(e) {
        let elem = e.target;
        while(!elem.dataset.itemid) {
            elem = elem.parentElement;
            if (!elem) return [null, null];
        }
        
        if (elem) {
            const [columnName, itemId] = elem.dataset.itemid.split('*');
            return [columnName, itemId];
        }

        
    }

    setEditMode(columnName, itemId, mode) {
        const state = this.state;
        state.isEditing = {};
        state.isEditing[columnName] = state.isEditing[columnName] || {};
        state.isEditing[columnName][itemId] = mode;
        this.setState(state);
    }

    handleDoubleClick = (e) => {
        e.stopPropagation();
        var [columnName, itemId] = this.getClickData(e);
        // this.bindDocumentEventListener();
        this.setEditMode(columnName, itemId, true);
    }

    handleClick = (e) => {
        var [columnName, itemId] = this.getClickData(e);

        this.setState({
            selectedItemId: itemId,
        });
    }

    bindDocumentEventListener(columnName, itemId) {
        this.documentEventListener = (e) => {
            document.removeEventListener("click", this.documentEventListener);
        }
        document.addEventListener('click', this.documentEventListener);
    }
    
    handleEdit = (columnName, itemId, value) => {
        const state = this.state;
        state.isEditing[columnName] = state.isEditing[columnName] || {};
        state.isEditing[columnName][itemId] = false;
        this.props.store.setValueById(itemId, columnName, value);
        this.setState(state);
    }

    handleColumnSort = (column, sortDirection) => {
        debugger
        if (column.columns && column.columns.length > 0) {
            return;
        }

        if (sortDirection) {
            column.toggleSortDirection();
        } else {
            this.clearColumnSort();
            column.sortDirection = 'asc';
        }

        this.props.store.sort(column.name, sortDirection);
        this.setState(this.state);
    }

    handleItemChecked(item) {
        item.checked = !item.checked;
        this.setState(this.state);
    }

    handleAllChecked(checked) {
        this.props.store.forEach((item) => item.checked = checked);
        this.setState(this.state);
    }

    clearColumnSort(columns) {
        let cols = columns || this.props.columns;

        cols.forEach(column => {
            column.sortDirection = '';
            if (column.columns && column.columns.length > 0) {
                this.clearColumnSort(column.columns);
            }
        });
    }



    render() {
        const tableWidth = this.props.columns.reduce((acc, c) => acc + c.width, 0);
        const tableStyle = {
            width: tableWidth + 'px',
        };

        const className = `datagrid ${this.props.theme}`;
        
        return (
            <div>
                <div className={className} onDoubleClick={this.handleDoubleClick} onClick={this.handleClick}>
                    <div className="datagrid__scrolltable">
                        <div className="datagrid__body">
                            <table style={tableStyle}>
                                { this.renderHeader() }
                                { this.renderBody() }
                            </table>
                        </div>
                    </div>          
                    
                </div>
            </div>
        );
    }


}
