import React from 'react';
import TreeGrid from '../../TreeGrid/TreeGrid';
import Column from '../../Columns/Column';
import TreeColumn from '../../Columns/TreeColumn';
import Store from '../../Stores/DataStore';
import faker from 'faker';
import TreeStore from '../../Stores/TreeStore';
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
    url: 'http://localhost:3000/leaders'
    // url: 'https://react-lib-serv.herokuapp.com/leaders'
});



function genItem(leaf, expanded, level) {
    return {
        id: faker.random.uuid(),
        code: faker.finance.account(),
        name: faker.finance.accountName(),
        leader: faker.name.firstName(),
        price: faker.random.number(),
        some: faker.lorem.words(2),
        startDate: faker.date.future(),
        children: [],
        level: level,
        expanded: expanded,
        leaf: leaf
    }
}


const items = [];
for (let i = 0; i < 20; i++ ) {
    items.push(genItem(false, true, 0));
}

for (let i = 0; i < 20; i +=5) {
    let item = items[i];
    for (let j = 0; j < 5; j++) {
        item.children.push(genItem(true, true, 1));
    }
}

for (let i = 0; i < 20; i +=5) {
    items[0].children[0].leaf = false;
    items[0].children[0].children.push(genItem(true, true, 2));
}



const store = new TreeStore({
    fields: ['id', 'code', 'name', 'leader', 'price'],
    url: 'http://localhost:3000/tree_projects',
});

export default {
  component: function Grids(props) {
    return (
        <div className="theme-white" style={{width: '900px', margin: '20px', backgroundColor: '#fff'}}>
            <button onClick={store.sync.bind(store)}>Save</button>
            <TreeGrid {...props} theme="smallTheme"/>
        </div>
    );
  },
  namespace: 'grids',
  name: 'TreeGrid',
  props: {
    height: 300,
    width: 500,
    columns: [
        new Column({
            name: 'code',
            width: 108,
            text: 'Код',
            draggable: true,
        }),
        new TreeColumn({
            name: 'name',
            width: 308,
            text: 'Имя',
            draggable: true,
            editor: function (props) {
                return <TextEditor {...props} />
            },
        }),
        new Column({
            name: 'leader',
            width: 208,
            text: 'Руководитель',
            draggable: true,
            editor: function (props) {
                return <DropDown idField="name" textField="name" store={leaderStore} {...props}/>
            }
        }),
        new Column({
            name: 'Stacked',
            width: 200,
            text: 'Stacked',
            draggable: true,
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
                    name: 'startDate',
                    width: 100,
                    text: 'Start Date',
                    editor: function (props) {
                        return <DateEditor {...props}/>  
                    },
                    renderer: function (value) {
                        return <span style={{color: 'violet'}}>{dateUtil.formatDate(value)}</span>;
                    }
                }),
            ]
        })

        
    ],
    store: store,
    },
    // fetch: [
    //     {
    //         matcher: 'data',
    //         response: {
    //             data: items
    //         },
    //     }
    // ]
};

