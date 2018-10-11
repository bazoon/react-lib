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
            isEditing: {}
        };

        // Для обновления размеров, через recomputeGridSize, setState не справляется
        this.gridRef = React.createRef();
        this.gridHeaderRef = React.createRef();

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
            this.refresh();
        });
    }

    // Grid specific stuff
    getColumnWidth = ({index}) => {
        return this.state.columns[index].width;
    }

    refresh = () => {
        this.setState(this.state, () => this.gridRef && this.gridRef.current.recomputeGridSize());
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
        return column.renderCell({
            key,
            style,
            item,
            grid: this,
            isLastCellInRow: columnIndex === this.state.columns.length - 1,
            isInEditMode: typeof column.editor === 'function' && this.state.isEditing && this.state.isEditing[column.name] && this.state.isEditing[column.name][item.id]
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


    handleResize = () => {
        let columns = this.state.columns.map((column) => {
            let c = Object.assign({}, column, { width: column.width + 20 })
            return c;
        });
        let me = this;
        
        this.setState({ columns: columns }, () => {
            me.gridRef.current.recomputeGridSize();
            me.gridHeaderRef.current.recomputeGridSize()
        });
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
        this.setState(this.state);
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


    render() {
        
        const items = this.props.store.getData();
        
        const hasHeaderFilters = this.state.headerFilters && Object.keys(this.state.headerFilters).length > 0;
        const headerRowCount = hasHeaderFilters ? 2 : 1;
        return (
            <div className="virtual-grid theme-white" onClick={this.handleDoubleClick}>
                <ScrollSync>
                    {({ clientHeight, clientWidth, onScroll, scrollHeight, scrollLeft, scrollTop, scrollWidth }) => {
                        
                        return (
                            <>  
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
                                    rowCount={items.length}
                                    width={this.props.width}
                                />
                            </>
                        )
                        
                    }}
                </ScrollSync>
            </div>

        );
    }

}


