import React from 'react';
import VirtualDataGrid from '../VirtualDataGrid/VirtualDataGrid';
import DataStore from '../Stores/DataStore';
import TextFilter from '../Filters/TextFilter';
import NumericFilter from '../Filters/NumericFilter';
import DropDown from '../Editors/Dropdown';
import TextEditor from '../Editors/Text';
import Contaner from '../VirtualDataGrid/Container';
import dateUtil from '../../../utils/date';
import Column from '../VirtualDataGrid/Columns/Column';
import CheckColumn from '../VirtualDataGrid/Columns/CheckColumn';



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


export default {
  component: Contaner,
  namespace: 'Virtual grids',
  name: 'Grid',
  props: {
    title: 'Таблица с данными',
    height: 600,
    width: 800,
    store: store,
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
        new Column({
                name: 'name',
                width: 200,
                text: 'Счет',
                sorted: true,
                editor: function (props) {
                    return <TextEditor {...props} required/>
                },
            }
        ),
        new Column({
            name: 'code',
            width: 200,
            text: 'Код очень очень очень длинный',
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
            editor: function (props) {
                return <DropDown idField="name" textField="name" store={leaderStore} {...props}/>
            },
        }),
        new Column({
            name: 'price',
            width: 200,
            text: 'Цена (руб.)',
            renderer: function(value, cellStyle) {
                
                cellStyle.background = value > 30000 ? 'teal' : 'silver'
                
                return (
                    <span>{value}</span>
                )
            }
        }),
        new Column({
            name: 'startDate',
            width: 220,
            text: 'Начальная дата',
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

