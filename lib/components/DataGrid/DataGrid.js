import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './datagrid.scss'
import flatten from '../../../utils/flatten';

export default class DataGrid extends Component {

    static propTypes = {
        columns: PropTypes.array.isRequired,
        store: PropTypes.object.isRequired,
        height: PropTypes.number,
        header: PropTypes.string,
    };

    static defaultProps = {
        columns: [],
        summary: [],
    }

    constructor(props) {
        super(props);
        this.state = {
            columns: props.columns,
            isEditing: {},
            scrollLeft: 0,
        };

        this.props.store.on('load', () => {
            var store = this.props.store;
            this.setState(this.state);
        });

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

    renderFooterRow(item) {
        var cells = flatten(this.props.columns.map(column => {
            return this.renderFooterCell(column, item);
        }));

        const className = "";

        return (
            <tr key={item.id} className={className}>
                {
                    cells.map((cell, i) => cell)
                }
            </tr>
        );

    }

    
    renderCell(column, item) {
        return column.renderCell({
            item,
            itemId: item.id,
            columnId: column.name,
            grid: this,
            columns: column.columns,
            isSelected: item.id === this.state.selectedItemId,
            isEditing: this.state.isEditing
        });
    }

    renderFooterCell(column, item) {
        return column.renderFooterCell({
            item,
            itemId: item.id,
            columnId: column.name,
            grid: this,
            columns: column.columns,
        });
    }

    renderRow(item) {
        const isSelected = item.id === this.state.selectedItemId;
        const className = isSelected ? 'datagrid__row_selected' : '';

        // Разворачиваем вложенные, чтобы td шли один за другим
        var cells = flatten(this.props.columns.map(column => {
            return this.renderCell(column, item);
        }));

        return (
            <tr key={item.id} className={className}>
                {
                    cells.map((cell, i) => cell)
                }
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

    renderFooter() {
        const items = this.props.store.getSummaryData();
        return (
            <tfoot>
                {
                    items.map(item => this.renderFooterRow(item))
                }        
            </tfoot>
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
        if (this.isResizing) return;
        
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

    findColumn(name, columns) {
        for (let i = 0; i < columns.length; i ++) {
            let column = columns[i];
            if (column.name === name) {
                return column;
            }

            if (column.columns && column.columns.length > 0) {
                let found = this.findColumn(name, column.columns);
                if (found) return found;
            }
            
        }
    }

    handleResizeStart = (e) => {
        e.stopPropagation();
        e.preventDefault();
        var me = this;
        let target = e.target;
        let th = target.parentElement;
        let startOffset = th.offsetWidth - e.pageX
        const columnName = target.dataset.name;

        this.isResizing = true;

        document.addEventListener('mousemove', onMove);
        document.addEventListener('mouseup', onUp);

        function onMove(e) {
            if (target) {
                let column =  me.findColumn(columnName, me.props.columns);
                if (column) {
                    let newWidth = startOffset + e.pageX;
                    column.setWidth(newWidth);
                    me.setState(me.state);
                }
           } 
        }

        function onUp(e) {
            target = undefined;
            me.setState(me.state);
            me.isResizing = false;
            document.removeEventListener('mousemove', onMove);
            document.removeEventListener('mousedown', onUp);
        }

    }

    handleScroll = (e) => {
        this.setState({
            scrollLeft: e.target.scrollLeft
        });
    }

    handleColumnMove = (sourceColumnName, targetColumnName) => {
        var source = this.props.columns.find((c) => c.name === sourceColumnName);
        var target = this.props.columns.find((c) => c.name === targetColumnName);
        var sourceIndex = this.props.columns.indexOf(source);
        var targetIndex = this.props.columns.indexOf(target);
        var temp = this.props.columns[sourceIndex];
        this.props.columns[sourceIndex] = this.props.columns[targetIndex];
        this.props.columns[targetIndex] = temp;
        this.setState(this.state);
    }


    render() {
        const tableWidth = this.props.columns.reduce((acc, c) => acc + c.width, 0);
        const tableStyle = {
            width: tableWidth + 'px',
        };

        const tableHeaderStyle = {
            width: tableWidth + 'px',
            position: 'relative',
            left: -this.state.scrollLeft +'px'
        };

        const tableFooterStyle = {
            width: tableWidth + 'px',
            position: 'relative',
            left: -this.state.scrollLeft +'px'
        };

        const bodyStyle = {
            maxHeight: this.props.height + 'px',
            overflowY: 'auto',
        };

        const className = `datagrid ${this.props.theme}`;
        

        return (
            <div>
                
                <div className={className} onDoubleClick={this.handleDoubleClick} onClick={this.handleClick}>
                
                        <div className="datagrid__body">
                            <div className="datagrid__title" style={tableStyle}>
                                { this.props.title }
                            </div>

                            <table style={tableHeaderStyle}>
                                { this.renderHeader() }
                            </table>

                            <div style={bodyStyle} onScroll={this.handleScroll}>
                                <table style={tableStyle}>
                                    { this.renderBody() }
                                </table>
                            </div>

                            <table style={tableFooterStyle}>
                                { this.renderFooter() }
                            </table>

                            
                            
                        </div>
                          
                    
                </div>
            </div>
        );
    }


}
