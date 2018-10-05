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


const items = [];
let year = 2018;
for (let i = 0; i < 50; i++ ) {
    items.push({
        id: faker.random.uuid(),
        year: year++,
        year_plan: faker.random.number(),
        first_plan: faker.random.number(),
        first_fact: faker.random.number(),
        second_plan: faker.random.number(),
        second_fact: faker.random.number(),
        third_plan: faker.random.number(),
        third_fact: faker.random.number(),
        fourth_plan: faker.random.number(),
        fourth_fact: faker.random.number(),
    });
}

const summary = [
    {
        id: faker.random.uuid(),
        year: '',
        year_plan: 'Итого',
        first_plan: faker.random.number(),
        first_fact: faker.random.number(),
        second_plan: faker.random.number(),
        second_fact: faker.random.number(),
        third_plan: faker.random.number(),
        third_fact: faker.random.number(),
        fourth_plan: faker.random.number(),
        fourth_fact: faker.random.number(),

    },
    {
        id: faker.random.uuid(),
        year: '',
        year_plan: 'ВСЕГО',
        first_plan: faker.random.number(),
        first_fact: faker.random.number(),
        second_plan: faker.random.number(),
        second_fact: faker.random.number(),
        third_plan: faker.random.number(),
        third_fact: faker.random.number(),
        fourth_plan: faker.random.number(),
        fourth_fact: faker.random.number(),

    }
]

const store = new DataStore({
    fields: ['id', 'code', 'name', 'leader', 'price'],
    data: [],
    url: 'data'
})

export default {
  component: Container,
  namespace: 'grids',
  name: 'DataGrid2',
  props: {
    title: 'Плановые и прогнозные оценки показателя',
    height: 300,
    width: 500,
    columns: [
        new Column({
            name: 'year',
            width: 70,
            text: 'Год',
            sorted: true,
            draggable: true
        }),
        new Column({
            name: 'year_plan',
            width: 100,
            text: 'План на год',
            draggable: true,
            editor: function (props) {
                return <TextEditor {...props} />
            },
            summaryRenderer: summaryRenderer
        }),
        new Column({
            name: 'first_q',
            width: 150,
            text: 'I кв.',
            draggable: true,
            columns: [
                new Column({
                    name: 'first_plan',
                    width: 75,
                    text: 'план',
                    editor: function (props) {
                        return <TextEditor {...props} />
                    },
                    summaryRenderer: summaryRenderer,
                }),
                new Column({
                    name: 'first_fact',
                    width: 75,
                    text: 'факт',
                    editor: function (props) {
                        return <TextEditor {...props} />
                    },
                    summaryRenderer: summaryRenderer,
                })
            ]
        }),
        new Column({
            name: 'second_q',
            width: 200,
            text: 'II кв.',
            draggable: true,
            columns: [
                new Column({
                    name: 'second_plan',
                    width: 100,
                    text: 'план',
                    editor: function (props) {
                        return <TextEditor {...props} />
                    },
                    summaryRenderer: summaryRenderer,
                }),
                new Column({
                    name: 'second_fact',
                    width: 100,
                    text: 'факт',
                    editor: function (props) {
                        return <TextEditor {...props} />
                    },
                    summaryRenderer: summaryRenderer,
                })
            ]
        }),
        new Column({
            name: 'third_q',
            width: 200,
            text: 'III кв.',
            draggable: true,
            columns: [
                new Column({
                    name: 'third_plan',
                    width: 100,
                    text: 'план',
                    editor: function (props) {
                        return <TextEditor {...props} />
                    },
                    summaryRenderer: summaryRenderer,
                }),
                new Column({
                    name: 'third_fact',
                    width: 100,
                    text: 'факт',
                    editor: function (props) {
                        return <TextEditor {...props} />
                    },
                    summaryRenderer: summaryRenderer,
                })
            ]
        }),
        new Column({
            name: 'tourth_q',
            width: 200,
            text: 'IV кв.',
            draggable: true,
            columns: [
                new Column({
                    name: 'fourth_plan',
                    width: 100,
                    text: 'план',
                    editor: function (props) {
                        return <TextEditor {...props} />
                    },
                    summaryRenderer: summaryRenderer,
                }),
                new Column({
                    name: 'fourth_fact',
                    width: 100,
                    text: 'факт',
                    editor: function (props) {
                        return <TextEditor {...props} />
                    },
                    summaryRenderer: summaryRenderer,
                })
            ]
        }),
        
    ],
    store: store,
    },
    fetch: [
        {
            matcher: 'data',
            response: {
                data: items,
                summary: summary,
            },
        }
    ]
};



function summaryRenderer(v) {
    return (
        <span style={{fontWeight:'bold'}}>{v}</span>
    );

}