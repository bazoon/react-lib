import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './datagrid.scss';
import flatten from '../../../utils/flatten';
import Row from './Row';
import groupBy from 'ramda/src/groupBy';

export default class DataGrid extends Component {
    static propTypes = {
        columns: PropTypes.object.isRequired,
        store: PropTypes.object.isRequired,
        header: PropTypes.string,
        stateful: PropTypes.bool,
    };

    static defaultProps = {
        columns: [],
        summary: [],
        stateful: false,
    }

    constructor(props) {
        super(props);
        this.state = {
            columns: props.columns,
            isEditing: {},
            scrollLeft: 0,
            isLoading: true,
            headerFilters: props.headerFilters,
        };

        this.props.store.on('load', this.refresh);
    }

    componentWillUnmount() {
        this.props.store.un('load', this.refresh);
    }

    refresh = () => {
        this.setState(this.state);
    }

    saveState() {
        if (!this.props.stateId) return;
        const columns = this.state.columns;
        const columnsString = JSON.stringify(columns.items);
        localStorage.setItem(this.props.stateId, columnsString);
    }

    loadState() {
        if (!this.props.stateId) return;
        const columnsString = localStorage.getItem(this.props.stateId);
        if (columnsString) {
            let columns = JSON.parse(columnsString);

            this.state.columns.sort(function (a, b) {
                let aColumn = columns.find((c) => c.name === a.name);
                let bColumn = columns.find((c) => c.name === b.name);

                a.width = aColumn.width;
                b.width = bColumn.width;

                let aColumnIndex = columns.indexOf(aColumn);
                let bColumnIndex = columns.indexOf(bColumn);

                return aColumnIndex - bColumnIndex;
            });

            this.setState(this.state);
        }
    }

    componentDidMount() {
        this.props.store.load().then(() => {
            this.setState({
                ...this.state,
                isLoading: false
            });
        });

        this.loadState();
    }

    renderHeader() {
        return (
            <thead>
                <tr>
                    {
                        this.state.columns.map(column => this.renderHeaderColumn(column))
                    }
                </tr>

            </thead>
        );
    }

    renderHeaderColumn(column) {
        return column.renderHeaderCell(this, this.props.headerFilters);
    }

    renderFooterRow(item) {
        var cells = flatten(this.state.columns.map(column => {
            return this.renderFooterCell(column, item);
        }));

        const key = Math.random();

        return (
            <tr key={key}>
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
        return (<Row
                columns={this.state.columns}
                item={item}
                isSelected={isSelected}
                grid={this}
                isEditing={this.state.isEditing}
            />);
    }

    renderGroup(groupName, items) {
        return (
            <React.Fragment>
                <tr colspan={this.state.columns.length}>
                    <b>{ groupName }</b>
                </tr>
                {
                    items.map(item => this.renderRow(item))
                }
            </React.Fragment>

        )
    }

    renderBody() {
        const items = this.props.store.getData();
        const isGrouped = this.props.groupBy != undefined;


        if (isGrouped) {
            const groups = groupBy(function (item) {
                return item.name;
            })(items)

            const keys = Object.keys(groups);

            return (
                <tbody>
                    {
                        keys.map((groupName) => this.renderGroup(groupName, groups[groupName]))
                    }
                </tbody>
            )
        } else {
            return (
                <tbody>
                    {
                        items.map(item => this.renderRow(item))
                    }        
                </tbody>
            );
        }


        
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

    renderTitle(tableTitleStyle) {
        return (
            <div className="datagrid__title" style={tableTitleStyle}>
                {  this.props.title }
            </div>

        );
    }

    getClickData(e) {
        let elem = e.target;
        while (!elem.dataset.itemid) {
            elem = elem.parentElement;
            if (!elem) return [null, null];
        }

        if (elem) {
            const [columnName, itemId] = elem.dataset.itemid.split('*');
            return [columnName, itemId];
        }
    }

    setEditMode(columnName, itemId, mode) {
        if (!this.props.canEdit) {
            return;
        }
        const state = this.state;
        state.isEditing = {};
        state.isEditing[itemId] = this.state.isEditing[itemId] || {};
        state.isEditing[itemId][columnName] = mode;
        this.setState(state);
    }

    handleDoubleClick = (e) => {
        e.stopPropagation();
        var [columnName, itemId] = this.getClickData(e);
        this.props.onDoubleClick && this.props.onDoubleClick(itemId);
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
        };
        document.addEventListener('click', this.documentEventListener);
    }

    handleEdit = (columnName, itemId, value) => {
        const state = this.state;
        this.setEditMode(columnName, itemId, false);
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

        this.props.store.sort(column.name, column.sortDirection);
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
        let cols = columns || this.state.columns;

        cols.forEach(column => {
            column.sortDirection = '';
            if (column.columns && column.columns.length > 0) {
                this.clearColumnSort(column.columns);
            }
        });
    }


    handleResizeStart = (e) => {
        e.stopPropagation();
        e.preventDefault();
        var me = this;
        let target = e.target;
        let th = target.parentElement;
        let startOffset = th.offsetWidth - e.pageX;
        const columnName = target.dataset.name;

        this.isResizing = true;

        document.addEventListener('mousemove', onMove);
        document.addEventListener('mouseup', onUp);

        function onMove(e) {
            if (target) {
                let column =  me.state.columns.findColumn(columnName);
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
            me.saveState();
        }
    }

    handleScroll = (e) => {
        this.setState({
            scrollLeft: e.target.scrollLeft
        });
    }

    handleColumnMove = (sourceColumnName, targetColumnName) => {
        var source = this.state.columns.find((c) => c.name === sourceColumnName);
        var target = this.state.columns.find((c) => c.name === targetColumnName);
        if (source && target) {
            var sourceIndex = this.state.columns.indexOf(source);
            var targetIndex = this.state.columns.indexOf(target);
            var temp = this.state.columns.get(sourceIndex);
            this.state.columns.set(sourceIndex, this.state.columns.get(targetIndex));
            this.state.columns.set(targetIndex, temp);
            this.setState({
                columns: this.state.columns.copy()
            });
            this.saveState();
        }
    }

    handleDelete(item) {
        this.props.store.remove(item.id);
    }

    handleFormEdit(item) {
        this.props.onEdit(item, this.props.store);
    }

    handleFilterFinishEdit({ field, value }) {
        if (typeof value === 'object') {
            this.props.store.filter({
                field,
                ...value
            });
        } else {
            this.props.store.filter({
                field,
                value
            });
        }
    }

    handleFilterChange(field, value) {
        var me = this;
        this.state.headerFilters[field].props.value = value;
        this.setEditMode(this.state); // TODO ??
    }

    handleEditorChanged() {
        this.setState(this.state);
    }

    render() {
        const tableWidth = this.state.columns.reduce((acc, c) => acc + c.width, 0);
        const tableStyle = {
            width: tableWidth + 'px',
        };

        const tableTitleStyle = {
            width: tableWidth + 'px',
        };

        const tableHeaderStyle = {
            width: tableWidth + 'px',
            position: 'relative',
            left: -this.state.scrollLeft + 'px'
        };

        const tableFooterStyle = {
            width: tableWidth + 'px',
            position: 'relative',
            left: -this.state.scrollLeft + 'px'
        };

        const height = this.props.height;

        const bodyStyle = {
            width: tableWidth + 'px',
            maxHeight: height,
            minHeight: height,
            overflowY: 'auto',
        };


        const contentStyle = {
            width: tableWidth + 'px'
        };

        const className = `datagrid ${this.props.theme}`;

        return (
            <div className={className} onDoubleClick={this.handleDoubleClick} onClick={this.handleClick}>

                <div className="datagrid__body">
                    {
                        this.props.hasTitle && this.renderTitle(tableTitleStyle)
                    }

                    <table style={tableHeaderStyle}>
                        { this.renderHeader() }
                    </table>

                    <div className="datagrid__content" style={bodyStyle} onScroll={this.handleScroll}>

                        {
                            this.state.isLoading ? <div className="datagrid__loader">Загрузка...</div> : null
                        }

                        <table style={tableStyle}>
                            { this.renderBody() }
                        </table>
                    </div>

                    <table style={tableFooterStyle}>
                        { this.renderFooter() }
                    </table>


                </div>


            </div>

        );
    }
}
