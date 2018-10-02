import React from 'react';
import DataGrid from '../../DataGrid/DataGrid';
import Column from '../../Columns/Column';
import CheckColumn from '../../Columns/CheckColumn';
import Store from '../../Stores/DataStore';
import faker from 'faker';
import DataStore from '../../Stores/DataStore';
import TextEditor from '../../Editors/Text';
import DropDown from '../../Editors/Dropdown';
import DateEditor from '../../Editors/Date';
import TextareaEditor from '../../Editors/TextArea';
import dateUtil from '../../../../utils/date';
import Container from './Container';


const leaders = [];
for (let i = 0; i < 20; i++) {
    leaders.push({
        id: faker.random.number(),
        name: faker.name.firstName(),
    })
}

const leaderStore = new DataStore({
    fields: ['id', 'name'], 
    data: leaders,
});

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


const store = new DataStore({
    fields: ['id', 'code', 'name', 'leader', 'price'],
    data: [],
    summaryData: summaryItems
})

export default {
    component: Container,
//     // component: props => {
//     // return (
//     //     <div className="theme-white" style={{ backgroundColor:'white', width: '900px', margin: '20px'}}>
//     //         <div style={{ marginBottom: '20px' }}>
//     //             <button onClick={store.sync.bind(store)}>Save</button>
//     //             <button onClick={printChecked}>Show checked</button>
//     //         </div>
//     //         <DataGrid {...props}/>
//     //     </div>
//     // );

//     function printChecked() {
//         props.store.getData().forEach(function (item) {
//             if (item.checked) {
//                 console.log(item.name);
//             }
//         })
//     }


//   },
  namespace: 'grids',
  name: 'DataGrid',
  props: {
    title: 'Таблица с данными',
    height: 300,
    width: 500,
    columns: [
        new CheckColumn({
            name: 'check',
            width: 40
        }),
        new Column({
            name: 'code',
            width: 108,
            text: 'Код',
            sorted: true,
        }),
        new Column({
            name: 'name',
            width: 308,
            text: 'Имя',
            sorted: true,
            editor: function (props) {
                return <TextEditor {...props} required/>
            },
            filter: function (props) {
                return <TextEditor onFinishEdit={handleFinishEdit}/>
                function handleFinishEdit(v) {
                    if (v) {
                        store.filter();
                    } else {
                        store.load();
                    }
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
            editor: function (props) {
                return <DropDown idField="name" textField="name" store={leaderStore} {...props}/>
            },
            filter: function (props) {
                return <DropDown idField="id" textField="name" store={leaderStore}
                 {...props} hasBlankChoice onFinishEdit={handleFinishEdit}/>
                
                function handleFinishEdit(v) {
                    if (v == -1) {
                        store.load();
                    } else {
                        store.filter();
                    }
                }
            },

        }),
        new Column({
            name: 'price',
            width: 100,
            text: 'Price',
            renderer: function (value) {
                return <span style={{color: 'green'}}>{value}</span>;
            },
            summaryRenderer: function (v) {
                return <span style={{fontWeight: "bold"}}>{v}</span>;
            }
        }),
        new Column({
            name: 'startDate',
            width: 150,
            text: 'Start Date',
            editor: function (props) {
                return <DateEditor {...props} required/>  
            },
            renderer: function (value) {
                return <span style={{color: 'blue'}}>{dateUtil.formatDate(value)}</span>;
            },
            filter: function (props) {
                return <DateEditor onFinishEdit={handleFinishEdit}/>
                function handleFinishEdit(v) {
                    if (v) {
                        store.filter();
                    } else {
                        store.load();
                    }
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
    },
    fetch: [
        {
            matcher: '/data',
            response: {
                data: items,
                summary: summaryItems,
            }
        },
        {
            matcher: '/data/filter',
            response: items.slice(0, 4),
        }
    ]
};

