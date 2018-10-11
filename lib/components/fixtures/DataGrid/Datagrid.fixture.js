import React from 'react';
import DataGrid from '../../DataGrid/DataGrid';
import Column from '../../Columns/Column';
import CheckColumn from '../../Columns/CheckColumn';
import DeleteColumn from '../../Columns/DeleteColumn';
import EditColumn from '../../Columns/EditColumn';
import Store from '../../Stores/DataStore';
import faker from 'faker';
import DataStore from '../../Stores/DataStore';
import TextEditor from '../../Editors/Text';
import DropDown from '../../Editors/Dropdown';
import DateEditor from '../../Editors/Date';
import TextareaEditor from '../../Editors/TextArea';
import dateUtil from '../../../../utils/date';
import Container from './Container';
import NumericFilter from '../../Filters/NumericFilter';
import TextFilter from '../../Filters/TextFilter';
import DateFilter from '../../Filters/DateFilter';


const leaders = [];
for (let i = 0; i < 20; i++) {
    leaders.push({
        id: faker.random.number(),
        name: faker.name.firstName(),
    })
}


const items = [];
for (let i = 0; i < 100; i++ ) {
    items.push({
        id: faker.random.uuid(),
        code: faker.finance.account(),
        name: faker.finance.accountName(),
        leader: faker.name.firstName(),
        price: faker.random.number(),
        price2: faker.random.number(),
        some: faker.lorem.words(200),
        startDate: faker.date.future(),
        some1: faker.lorem.words(10),
        some2: faker.lorem.words(20)
    });
}

const summaryItems = [
    {
        code: '',
        name: 'Итого:',
        leader: '',
        price: 10000,
        price2: '',
        some: '',
        startDate: '',
        some1: '',
        some2: ''
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
    pageSize: 10,
});

export default {
component: Container,
  namespace: 'grids',
  name: 'DataGrid',
  props: {
    title: 'Таблица с данными',
    height: 300,
    width: 500,
    onSave: function () {
        store.sync();  
    },
    columns: [
        new CheckColumn({
            name: 'check',
            width: 40,
            draggable: true,
        }),
        new DeleteColumn({
            name: 'delete',
            width: 30,
            draggable: true,
        }),
        new EditColumn({
            name: 'edit',
            width: 30,
            draggable: true,
        }),
        new Column({
            name: 'code',
            width: 108,
            text: 'Код',
            sorted: true,
            draggable: true,
        }),
        new Column({
            name: 'name',
            width: 308,
            text: 'Имя',
            sorted: true,
            draggable: true,
            editor: function (props) {
                return <TextEditor {...props} required/>
            },
            filter: function (props) {
                return <TextEditor onFinishEdit={handleFinishEdit}/>
                function handleFinishEdit(v) {
                    store.filter({
                        field: 'name',
                        value: v
                    });
                }
            },
            summaryRenderer: function (v) {
                return <span style={{fontWeight: "bold"}}>{v}</span>;
            }
            

        }),
        new Column({
            name: 'leader',
            width: 208,
            text: 'Руководитель',
            sorted: true,
            draggable: true,
            editor: function (props) {
                return <DropDown idField="name" textField="name" store={leaderStore} {...props}/>
            },
            filter: function (props) {
                return <DropDown idField="name" textField="name" store={leaderStore}
                 {...props} hasBlankChoice onFinishEdit={handleFinishEdit}/>
                
                function handleFinishEdit(v) {
                    if (v == -1) {
                        store.filter({
                            field: 'leader',
                            value: ""
                        });
                    } else {
                        store.filter({
                            field: 'leader',
                            value: v
                        });
                    }
                }
            },

        }),
        new Column({
            name: 'price',
            width: 100,
            text: 'Price',
            sorted: true,
            draggable: true,
            renderer: function (value) {
                return <span style={{color: 'green'}}>{value && value.toLocaleString()}</span>;
            },
            summaryRenderer: function (v) {
                return <span style={{fontWeight: "bold"}}>{v}</span>;
            },
            filter: function (props) {
                return <NumericFilter onFinishEdit={handleFinishEdit}/>
                function handleFinishEdit(v) {
                    store.filter({
                        field: 'price',
                        value: v.value,
                        ordering: v.ordering
                    });
                }
            }
        }),
        new Column({
            name: 'startDate',
            width: 150,
            sorted: true,
            text: 'Start Date',
            draggable: true,
            editor: function (props) {
                return <DateEditor {...props} required/>  
            },
            renderer: function (value) {
                return <span style={{color: 'blue'}}>{ dateUtil.formatDate(value) }</span>;
            },
            filter: function (props) {
                return <DateEditor onFinishEdit={handleFinishEdit}/>
                function handleFinishEdit(v) {
                    store.filter({
                        field: 'startDate',
                        value: v
                    });
                    
                }
            },
        }),
        // new Column({
        //     name: 'Foo',
        //     width: 400,
        //     text: 'Stacked columns',
        //     columns: [
        //         new Column({
        //             name: 'price',
        //             width: 100,
        //             text: 'Big Price',
        //             editor: function (props) {
        //                 return <TextEditor {...props} />
        //                 // return <TextareaEditor {...props}/>
        //             },
        //             renderer: function (value) {
        //                 return <span style={{color: 'green'}}>{value}</span>;
        //             }
        //         }),
        //         new Column({
        //             name: 'price2',
        //             width: 300,
        //             text: 'Common price',
        //             columns: [
        //                 new Column({
        //                     name: 'price',
        //                     width: 150,
        //                     text: 'Price',
        //                     renderer: function (value) {
        //                         return <span style={{color: 'red'}}>{value}</span>;
        //                     }
        //                 }), 
        //                 new Column({
        //                     name: 'price',
        //                     width: 150,
        //                     text: 'Price',
        //                     renderer: function (value) {
        //                         return <span style={{color: 'red'}}>{value}</span>;
        //                     }
        //                 }), 
        //             ]
        //         }), 
        //     ]
        // }),
        

        // new Column({
        //     name: 'some',
        //     width: 408,
        //     text: 'Some',
        // }),
        // new Column({
        //     name: 'some1',
        //     width: 408,
        //     text: 'Some',
        // }),
        // new Column({
        //     name: 'some2',
        //     width: 408,
        //     text: 'Some',
        // }),
    ],
        items: items,
        store: store,
        height: 300,
        stateId: 'somegrid1',
        headerFilters: {
            name: {
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
            startDate: {
                filter: DateFilter,
                props: {
                    value: ''
                }
            }
        }
    },
    // fetch: [
    //     {
    //         matcher: '/data',
    //         response: {
    //             data: items,
    //             summary: summaryItems,
    //         }
    //     },
    //     {
    //         matcher: '/data/filter',
    //         response: items.slice(0, 4),
    //     },
    //     {
    //         matcher: '/data/sort',
    //         response: items.slice().sort((a, b) => a-b),
    //     }
    // ]
};

