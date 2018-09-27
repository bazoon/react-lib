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
import dateUtil from '../../../../utils/date';


const leaders = []
for (let i = 0; i < 20; i++) {
    leaders.push({
        id: faker.random.number(),
        name: faker.name.firstName(),
    })
}

const leaderStore = new DataStore({
    fields: ['id', 'name'], 
    data: leaders,
})


const items = [];
for (let i = 0; i < 100; i++ ) {
    items.push({
        id: faker.random.uuid(),
        code: faker.finance.account(),
        name: faker.finance.accountName(),
        leader: faker.name.firstName(),
        price: faker.random.number(),
        price2: faker.random.number(),
        some: faker.lorem.words(2),
        startDate: faker.date.future(),
        some1: faker.lorem.words(10),
        some2: faker.lorem.words(20)
    });
}

const store = new DataStore({
    fields: ['id', 'code', 'name', 'leader', 'price'],
    data: [],
})

export default {
  component: props => {
    return (
        <div className="theme-white" style={{width: '900px', margin: '20px'}}>
            <button onClick={store.sync.bind(store)}>Save</button>
            <button onClick={printChecked}>Show checked</button>
            <DataGrid {...props}/>
        </div>
    );

    function printChecked() {
        props.store.getData().forEach(function (item) {
            if (item.checked) {
                console.log(item.name);
            }
        })
    }


  },
  namespace: 'grids',
  name: 'DataGrid',
  props: {
    height: 300,
    width: 500,
    columns: [
        new CheckColumn({
            name: 'check',
            width: 20
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
                return <TextEditor {...props} />
            },
        }),
        new Column({
            name: 'leader',
            width: 208,
            text: 'Руководитель',
            editor: function (props) {
                return <DropDown idField="name" textField="name" store={leaderStore} {...props}/>
            }
        }),
        new Column({
            name: 'price',
            width: 100,
            text: 'Price',
            renderer: function (value) {
                return <span style={{color: 'green'}}>{value}</span>;
            }
        }),
        new Column({
            name: 'startDate',
            width: 100,
            text: 'Start Date',
            editor: function (props) {
                return <DateEditor {...props}/>  
            },
            renderer: function (value) {
                return <span style={{color: 'blue'}}>{dateUtil.formatDate(value)}</span>;
            }
        }),
        new Column({
            name: 'Foo',
            width: 200,
            text: 'Stacked columns',
            columns: [
                new Column({
                    name: 'price',
                    width: 100,
                    text: 'Price',
                    renderer: function (value) {
                        return <span style={{color: 'green'}}>{value}</span>;
                    }
                }),
                new Column({
                    name: 'price2',
                    width: 100,
                    text: 'Price',
                    renderer: function (value) {
                        return <span style={{color: 'red'}}>{value}</span>;
                    }
                }), 
            ]
        }),
        

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
    },
    fetch: [
        {
            matcher: '/data',
            response: items,
        }
    ]
};

