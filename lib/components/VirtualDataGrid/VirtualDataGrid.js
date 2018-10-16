import React, { Component } from 'react';
import cn from 'classnames';
import './virtual-datagrid.scss';
import { Grid, List, ScrollSync, defaultCellRangeRenderer } from 'react-virtualized'
import 'react-virtualized/styles.css'; 

import TextFilter from '../Filters/TextFilter';
import NumericFilter from '../Filters/NumericFilter';
import DropDown from '../Editors/Dropdown';
import DataStore from '../Stores/DataStore';
import TextEditor from '../Editors/Text';
import Sorter from '../Sorter/Sorter';
import { debug } from 'util';
import scrollbarSize from 'dom-helpers/util/scrollbarSize';



export default class extends Component {


    constructor(props) {
        super(props);
        this.state = {
            columns: props.columns,
            headerFilters: props.headerFilters,
            isEditing: {},
            selectedItemId: undefined
        };

        // Для обновления размеров, через recomputeGridSize, setState не справляется
        this.gridRef = React.createRef();
        this.gridHeaderRef = React.createRef();
        this.summaryGridRef = React.createRef();

        this.props.store.on('load', this.refresh);
    }

    componentDidUpdate() {
        if (this.state.headerFilters !== this.props.headerFilters) {
            this.setState({
                headerFilters: this.props.headerFilters
            });
            this.gridHeaderRef.current.recomputeGridSize();   
        }
    }

    componentDidMount() {
        this.props.store.load().then(() => {
            this.loadState();
            this.refreshAll();
        });
    }

    // Grid specific stuff
    getColumnWidth = ({index}) => {
        return this.state.columns[index].width;
    }

    refresh = () => {
        this.setState(this.state, () => this.gridRef && this.gridRef.current.recomputeGridSize());
    }

    refreshWithHeader = () => {
        this.setState(this.state, () => {
            this.gridRef && this.gridRef.current.recomputeGridSize();
            this.gridHeaderRef && this.gridHeaderRef.current.recomputeGridSize();
        });
    }

    refreshAll = () => {
        this.setState(this.state, () => {
            this.gridRef && this.gridRef.current.recomputeGridSize();
            this.gridHeaderRef && this.gridHeaderRef.current.recomputeGridSize();
            this.summaryGridRef && this.summaryGridRef.current.recomputeGridSize()
        });
    }



    // Header methods
    headerCellRenderer = ({columnIndex, key, rowIndex, style}) => {
        if (rowIndex === 1) {
            return this.headerCellFilterRenderer({columnIndex, key, rowIndex, style});
        }

        const me = this;
        const column = this.state.columns[columnIndex];
        let text = column.text;

        

        return column.renderHeaderCell({
            key,
            style,
            grid: this,
            isLastCellInRow: columnIndex === this.state.columns.length - 1,
        });


        
    }



    headerCellFilterRenderer = ({columnIndex, key, rowIndex, style}) => {
        var me = this;
        const column = this.state.columns[columnIndex];
        const filterConfig = this.state.headerFilters[column.name];
        const isLastCellInRow = columnIndex === this.state.columns.length - 1;
        let Filter = null;
        let filterProps = {};
        const className = cn("virtual-grid__cell", "virtual-grid__header-cell", {
            "virtual-grid__cell_last": isLastCellInRow
        });


        const cellStyle = {
            ...style,
        }

        if (filterConfig) {
            Filter = filterConfig.filter;
            filterProps = filterConfig.props;
        }
        
        return (
            <div style={cellStyle} key={key} className={className}>
                <div className="virtual-grid__header-cell-filter">
                    { Filter && <Filter key={filterProps.value} {...filterProps} onChange={handleFilterChange} onFinishEdit={handleFilterFinishEdit}/> }
                </div>
                
            </div>
        );

        function handleFilterFinishEdit(value) {
            me.handleFilterFinishEdit({ field: column.name, value });
        }

        function handleFilterChange(e) {
            me.state.headerFilters[column.name].props.value = e.target.value;
            
            // TODO: setState не перерендеривает фильтр!
            me.gridHeaderRef.current.recomputeGridSize();
            me.forceUpdate();
        }
    }

    noContentRenderer = () => {
        return (
            <div>Нет данных</div>
        );
    }

    // Body methods

    cellRenderer = ({columnIndex, key, rowIndex, style}) => {
        const me = this;
        
        const column = this.state.columns[columnIndex];
        const items = this.props.store.getData();
        
        if (items.length === 0) {
            return null;
        }

        const item = items[rowIndex];
        const isSelected = item.id === this.state.selectedItemId;

        return column.renderCell({
            key,
            style,
            item,
            grid: this,
            isLastCellInRow: columnIndex === this.state.columns.length - 1,
            isInEditMode: typeof column.editor === 'function' && this.state.isEditing && this.state.isEditing[column.name] && this.state.isEditing[column.name][item.id],
            isSelected
        });
    }

    summaryCellRenderer = ({columnIndex, key, rowIndex, style}) => {
        const me = this;
        const column = this.state.columns[columnIndex];
        const items = this.props.store.getSummaryData();
        
        if (items.length === 0) {
            return null;
        }

        const item = items[rowIndex];
        

        return column.renderSummaryCell({
            key,
            style,
            item,
            grid: this,
            isLastCellInRow: columnIndex === this.state.columns.length - 1,
        });
    }
    

    // Handlers

    // Сохранение инлайн редактирования
    handleEdit = (columnName, itemId, value) => {
        const state = this.state;
        state.isEditing[columnName] = state.isEditing[columnName] || {};
        state.isEditing[columnName][itemId] = false;
        this.props.store.setValueById(itemId, columnName, value);
        this.setState(state);
        this.refresh();
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
        this.refresh();
    }

    handleDoubleClick = (e) => {
        e.stopPropagation();
        var [columnName, itemId] = this.getClickData(e);
        
        // this.bindDocumentEventListener();
        if (columnName && itemId) {
            this.setEditMode(columnName, itemId, true);
        }
    }

    handleClick = (e) => {
        var [columnName, itemId] = this.getClickData(e);

        if (typeof this.props.onSelect === 'function') {
            this.props.onSelect(itemId);
        } 

        this.setState({
            selectedItemId: itemId,
        }, () => this.refresh());

        
    }

    handleFormEdit(item) {
        debugger
        this.props.onEdit(item, this.props.store);
    }

    handleDelete(item) {
        this.props.store.remove(item.id);
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
                let column =  me.findColumn(columnName, me.state.columns);
                if (column) {
                    let newWidth = startOffset + e.pageX;
                    column.setWidth(newWidth);
                    me.refreshWithHeader();
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

    handleColumnMove = (sourceColumnName, targetColumnName) => {
        var source = this.state.columns.find((c) => c.name === sourceColumnName);
        var target = this.state.columns.find((c) => c.name === targetColumnName);
        if (source && target) {
            var sourceIndex = this.state.columns.indexOf(source);
            var targetIndex = this.state.columns.indexOf(target);
            var temp = this.state.columns[sourceIndex];
            this.state.columns[sourceIndex] = this.state.columns[targetIndex];
            this.state.columns[targetIndex] = temp;
            this.saveState();
            this.refreshWithHeader();
        }
    }


    handleColumnSort = (column) => {
        if (this.isResizing) return;
        
        if (column.sortDirection) {
            column.sortDirection = column.sortDirection === 'asc' ? 'desc' : 'asc';
        } else {
            this.clearColumnSort();
            column.sortDirection = 'asc';
        }

        this.props.store.sort(column.name, column.sortDirection);
        this.refreshWithHeader();
    }

    clearColumnSort() {
        let cols = this.state.columns;
        cols.forEach(column => {
            column.sortDirection = '';
        });
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
        this.gridHeaderRef.current.recomputeGridSize();
        
    }

    handleItemChecked(item) {
        item.checked = !item.checked;
        this.refresh();
    }

    handleAllChecked(checked) {
        this.props.store.forEach((item) => item.checked = checked);
        this.refresh();
    }

    // 

    saveState() {
        
        if (!this.props.stateId) return;
        const columns = this.state.columns;
        const columnsString = JSON.stringify(columns);
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

    getItems() {
        return this.props.store.getData();
    }

    getRowCount() {
        return this.getItems().length;
    }

    
    render() {
        const summary = this.props.store.getSummaryData();    
        const items = this.getItems();
        const rowCount = this.getRowCount();

        const hasHeaderFilters = this.state.headerFilters && Object.keys(this.state.headerFilters).length > 0;
        const headerRowCount = hasHeaderFilters ? 2 : 1;
        
        return (
            <div className="virtual-grid theme-white" onClick={this.handleClick} onDoubleClick={this.handleDoubleClick}>
                <ScrollSync>
                    {({ clientHeight, clientWidth, onScroll, scrollHeight, scrollLeft, scrollTop, scrollWidth }) => {
                        
                        return (
                            <>  
                            <div className="virtual-grid__title" style={{width: `${this.props.width}px`}}>
                                { this.props.title }
                            </div>
                                <div className="virtual-grid__header-wrap" style={{width: this.props.width +'px' }}>
                                    <Grid
                                        className="virtual-grid__header"
                                        ref={this.gridHeaderRef}
                                        cellRenderer={this.headerCellRenderer}
                                        columnWidth={this.getColumnWidth}
                                        columnCount={this.state.columns.length}
                                        width={this.props.width - scrollbarSize()}
                                        rowHeight={50}
                                        height={100}
                                        rowCount={headerRowCount}
                                        scrollLeft={scrollLeft}
                                    />
                                </div>
                                <Grid
                                    ref={this.gridRef}
                                    cellRenderer={this.cellRenderer}
                                    noContentRenderer={this.noContentRenderer}
                                    columnWidth={this.getColumnWidth}
                                    columnCount={this.state.columns.length}
                                    height={this.props.height}
                                    onScroll={onScroll}
                                    scrollLeft={scrollLeft}
                                    rowHeight={40}
                                    rowCount={rowCount}
                                    width={this.props.width}
                                />
                                <div className="virtual-grid__header-wrap" style={{width: this.props.width +'px' }}>
                                    <Grid
                                        ref={this.summaryGridRef}
                                        className="virtual-grid__header"
                                        cellRenderer={this.summaryCellRenderer}
                                        columnWidth={this.getColumnWidth}
                                        columnCount={this.state.columns.length}
                                        width={this.props.width - scrollbarSize()}
                                        rowHeight={20}
                                        height={ 20 * summary.length }
                                        rowCount={summary.length}
                                        scrollLeft={scrollLeft}
                                    />
                                </div>
                            </>
                        )
                        
                    }}
                </ScrollSync>
            </div>

        );
    }

}


