import React from 'react';
import VirtualDataGrid from '../../VirtualTreeGrid/VirtualTreeGrid';
import DataStore from '../../Stores/DataStore';
import TextFilter from '../../Filters/TextFilter';
import NumericFilter from '../../Filters/NumericFilter';
import DropDown from '../../Editors/Dropdown';
import TextEditor from '../../Editors/Text';
import Container from './TreeContainer';
import dateUtil from '../../../../utils/date';
import Column from '../../VirtualDataGrid/Columns/Column';
import CheckColumn from '../../VirtualDataGrid/Columns/CheckColumn';
import EditColumn from '../../VirtualDataGrid/Columns/EditColumn';
import DeleteColumn from '../../VirtualDataGrid/Columns/DeleteColumn';
import TreeStore from '../../Stores/TreeStore';
import TreeColumn from '../../VirtualTreeGrid/Columns/TreeColumn';

const leaderStore = new DataStore({
    fields: ['id', 'name'], 
    url: 'http://localhost:3000/leaders'
    // url: 'https://react-lib-serv.herokuapp.com/leaders'
});


const store = new TreeStore({
    fields: ['id', 'code', 'name', 'leader', 'price'],
    url: 'http://localhost:3000/tree_projects',
});

export default {
  component: Container,
  namespace: 'Virtual grids',
  name: 'TreeGrid',
  props: {
    title: 'Таблица с данными',
    height: 400,
    width: 800,
    store: store,
    stateId: 'VirtualG2',
    onSave: function () {
        store.sync();  
    },
    columns: [
        // {
        //     name: 'id',
        //     width: 140,
        //     text: 'Id',
        //     visible: false
        // },
        new CheckColumn({
            name: 'check',
            width: 40
        }),
        new EditColumn({
            name: 'edit',
            width: 40
        }),
        new DeleteColumn({
            name: 'delete',
            width: 40
        }),
        new TreeColumn({
                name: 'name',
                width: 200,
                text: 'Счет',
                sorted: true,
                draggable: true,
                editor: function (props) {
                    return <TextEditor {...props} required/>
                },
            }
        ),
        // new Column({
        //     name: 'some1',
        //     width: 200,
        //     text: 'long text',
        //     draggable: true,
        //     sorted: true
        // }),
        new Column({
            name: 'code',
            width: 200,
            text: 'Код очень очень очень длинный',
            draggable: true,
            editor: function (props) {
                return <TextEditor {...props} required/>
            },
            sorted: true
        }),
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
        new Column({
            name: 'leader',
            width: 400,
            text: 'Руководитель',
            draggable: true,
            editor: function (props) {
                return <DropDown idField="name" textField="name" store={leaderStore} {...props}/>
            },
        }),
        new Column({
            name: 'price',
            width: 200,
            text: 'Цена (руб.)',
            draggable: true,
            renderer: function(value, cellStyle) {
                
                cellStyle.background = value > 30000 ? '#eac7c7' : '#8cb1ce'
                
                return (
                    <span>{value}</span>
                )
            }
        }),
        new Column({
            name: 'startDate',
            width: 220,
            text: 'Начальная дата',
            draggable: true,
            renderer: function (value) {
                return <span style={{color: 'blue'}}>{ dateUtil.formatDate(value) }</span>;
            },
        })
    ],
    headerFilters: {
        name: {
            filter: TextFilter,
            props: {
                value: ''
            }
        },
        code: {
            filter: TextFilter,
            props: {
                value: ''
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
    }
    
  },

};

