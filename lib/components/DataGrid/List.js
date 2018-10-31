import React, { Component } from 'react';
import { Grid, List, ScrollSync, defaultCellRangeRenderer} from 'react-virtualized'
import 'react-virtualized/styles.css'; 

import TextFilter from '../Filters/TextFilter';
import NumericFilter from '../Filters/NumericFilter';
import DropDown from '../Editors/Dropdown';
import DataStore from '../Stores/DataStore';
import TextEditor from '../Editors/Text';


import projects from './fakeProjects';
import items from './fakeProjects';

const columns = [
    {
        name: 'id',
        width: 140,
        text: 'Id'
    },
    {
        name: 'name',
        width: 200,
        text: 'Счет',
        editor: function (props) {
            return <TextEditor {...props} required/>
        },
    },
    {
        name: 'code',
        width: 200,
        text: 'Код'
    },
    // {
    //     name: 'one',
    //     width: 200,
    //     text: 'One',
    //     group: 'Nested',
    //     groupPosition: 1
    // },
    // {
    //     name: 'two',
    //     text: 'Two',
    //     width: 200,
    //     group: 'Nested',
    //     groupPosition: 2
    // },
    {
        name: 'leader',
        width: 400,
        text: 'Руководитель'
    },
    {
        name: 'price',
        width: 200,
        text: 'Цена (руб.)'
    },
    {
        name: 'startDate',
        width: 220,
        text: 'Начальная дата'
    }
];

const leaderStore = new DataStore({
    fields: ['id', 'name'], 
    url: 'http://localhost:3000/leaders'
    // url: 'https://react-lib-serv.herokuapp.com/leaders'
});


const store = new DataStore({
    fields: ['id', 'code', 'name', 'leader', 'price'],
    url: 'http://localhost:3000/projects',
    // url: 'https://react-lib-serv.herokuapp.com/projects',
    isRemoteSort: true,
    pageSize: 1000,
});


const headerFilters = {
    name: {
        filter: TextFilter,
        props: {
            value: '222'
        }
    },
    price: {
        filter: NumericFilter,
        props: {
            value: ''
        }
    },
    leader: {
        filter: DropDown,
        props: {
            value: '',
            store: leaderStore,
            idField: 'name',
            textField: 'name',
            hasBlankChoice: true
        }
    },
};



export default class extends Component {

    state = {
        columns: columns,
        headerFilters: headerFilters,
        isEditing: {}
    }

    constructor(props) {
        super(props);
        this.gridRef = React.createRef();
        this.gridHeaderRef = React.createRef();

        store.on('load', this.refresh);
    }

    componentDidMount() {
        store.load().then(() => {
            this.refresh();
        });

        
    }

    refresh = () => {
        this.gridRef && this.gridRef.current.recomputeGridSize();
        this.setState(this.state)
    }


    getColumnWidth = ({index}) => {
        return this.state.columns[index].width;
    }

    cellRenderer = ({columnIndex, key, rowIndex, style}) => {
        const me = this;
        const column = this.state.columns[columnIndex];
        const columnName = column.name;
        

        const items = store.getData();
        
        if (items.length === 0) {
            return null;
        }
        const item = items[rowIndex];
        let currentValue = item[columnName];
        
        const cellStyle = {
            ...style,
            overflow: 'hidden',
            border: 'solid 0.5px silver'
        }

        let isInEditMode = this.state.isEditing && this.state.isEditing[columnName] && this.state.isEditing[columnName][item.id];

        let content = currentValue;
        
        if (isInEditMode) {
            console.log(currentValue)
            content = this.renderEditor({
                value: currentValue,
                style: cellStyle,
                editor: column.editor,
                handleOnChange,
                handleFinishEdit
            });
        } 

        
        return (
            <div style={cellStyle} data-itemid={columnName+'*'+item.id}>
                { content }
            </div>
        );

        function handleOnChange(e) {
            
        }

        function handleFinishEdit(value) {
            me.handleEdit(columnName, item.id, value || currentValue); 
        }



    }

    handleEdit = (columnName, itemId, value) => {
        const state = this.state;
        state.isEditing[columnName] = state.isEditing[columnName] || {};
        state.isEditing[columnName][itemId] = false;
        store.setValueById(itemId, columnName, value);
        this.setState(state);
        this.refresh();
    }

    renderEditor({value, editor, handleOnChange, handleFinishEdit, style}) {
        const editorStyle = {
            width: style.width,
            height: style.height,
            boxSizing: 'border-box'
        };

        
        return editor({
            style: editorStyle,
            value,
            onChange: handleOnChange,
            onFinishEdit: handleFinishEdit,
        });
    }

    headerCellRenderer = ({columnIndex, key, rowIndex, style}) => {
        const me = this;
        const column = this.state.columns[columnIndex];
        let text = column.text;

        let cellStyle = {
            ...style,
            overflow: 'hidden',
            border: 'solid 0.5px silver'
        };

        const filterConfig = this.state.headerFilters[column.name];
        let Filter = null;
        let filterProps = {};

        if (filterConfig) {
            Filter = filterConfig.filter;
            filterProps = filterConfig.props;
        }

        if (column.group && column.groupPosition === 1) {
            let cols = this.state.columns.filter((c) => c.group === column.group);
            let width = cols.reduce((a, e) => a + e.width, 0);
            
            let subWidth = width / cols.length;
            

            text = cols.map((c) => c.text).join(' ');
            cellStyle.width = width;

            let nestedStyle = {
                ...cellStyle,
            }


            return (
                <div style={nestedStyle}>
                    <div style={{textAlign: 'center'}}>{column.group}</div>
                    <div style={{display: 'flex'}}>
                        {
                            cols.map((c) => <div style={ { width: subWidth, textAlign: 'center' } }>{c.text}</div>)
                        }
                    </div>
                    
                </div>
            
            )
        } else if (column.group) {
            return null;
        }

        return (
            <div style={cellStyle}>
                {text}
                { Filter && <Filter key={filterProps.value} {...filterProps} onChange={handleFilterChange} onFinishEdit={handleFilterFinishEdit}/> }
            </div>
        );


        function handleFilterFinishEdit(value) {
            store.filter({
                field: column.name,
                ...value
            });
        }

        function handleFilterChange(e) {
            me.state.headerFilters[column.name].props.value = e.target.value;
            
            // TODO: setState не перерендеривает фильтр!
            me.gridHeaderRef.current.recomputeGridSize();
            me.forceUpdate();
        }

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
        console.log(columnName, itemId);
        // this.bindDocumentEventListener();
        this.setEditMode(columnName, itemId, true);
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

    cellRangeRenderer = (props) => {
        
        const children = defaultCellRangeRenderer(props)
        // children.push(
        //     <div>My custom overlay</div>
        // )
        return children;
    }

    render() {
        
        const items = store.getData();


        return (
            <div onDoubleClick={this.handleDoubleClick}>
                <button onClick={this.handleResize}>Resize</button>
                <ScrollSync>
                    {({ clientHeight, clientWidth, onScroll, scrollHeight, scrollLeft, scrollTop, scrollWidth }) => (
                        <>
                            <Grid
                                ref={this.gridHeaderRef}
                                cellRangeRenderer={this.cellRangeRenderer}
                                cellRenderer={this.headerCellRenderer}
                                columnWidth={this.getColumnWidth}
                                columnCount={this.state.columns.length}
                                width={600}
                                rowHeight={50}
                                height={50}
                                rowCount={1}
                                scrollLeft={scrollLeft}
                                onScroll={onScroll}
                            />
                            <Grid
                                ref={this.gridRef}
                                cellRenderer={this.cellRenderer}
                                columnWidth={this.getColumnWidth}
                                columnCount={this.state.columns.length}
                                height={600}
                                onScroll={onScroll}
                                scrollLeft={scrollLeft}

                                //   overscanColumnCount={overscanColumnCount}
                                //   overscanRowCount={overscanRowCount}
                                rowHeight={40}
                                rowCount={items.length}
                                //   scrollToColumn={scrollToColumn}
                                //   scrollToRow={scrollToRow}
                                width={600}
                                
                            />
                        </>
                    )}
                </ScrollSync>
            </div>


            
        );
    }

}
