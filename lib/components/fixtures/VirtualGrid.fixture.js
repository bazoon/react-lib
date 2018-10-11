import React from 'react';
import VirtualDataGrid from '../VirtualDataGrid/VirtualDataGrid';
import DataStore from '../Stores/DataStore';
import TextFilter from '../Filters/TextFilter';
import NumericFilter from '../Filters/NumericFilter';
import DropDown from '../Editors/Dropdown';
import TextEditor from '../Editors/Text';
import Contaner from '../VirtualDataGrid/Container';



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
        {
            name: 'name',
            width: 200,
            text: 'Счет',
            sorted: true,
            editor: function (props) {
                return <TextEditor {...props} required/>
            },
        },
        {
            name: 'code',
            width: 200,
            text: 'Код очень очень очень длинный',
            editor: function (props) {
                return <TextEditor {...props} required/>
            },
            sorted: true
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

