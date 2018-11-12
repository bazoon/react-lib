import React from 'react';
import DataGrid from '../../../DataGrid/DataGrid';
import Column from '../../../Columns/Column';
import CheckColumn from '../../../Columns/CheckColumn';
import DeleteColumn from '../../../Columns/DeleteColumn';
import EditColumn from '../../../Columns/EditColumn';
import Store from '../../../Stores/DataStore';
import faker from 'faker';
import DataStore from '../../../Stores/DataStore';
import TextEditor from '../../../Editors/Text';
import DropDown from '../../../Editors/Dropdown';
import DateEditor from '../../../Editors/Date';
import TextareaEditor from '../../../Editors/TextArea';
import dateUtil from '../../../../../utils/date';
import ContainerContructor from '../../../TreeCommon/Container';
import NumericFilter from '../../../Filters/NumericFilter';
import TextFilter from '../../../Filters/TextFilter';
import DateFilter from '../../../Filters/DateFilter';
import WithPermissions from '../../../TreeCommon/WithPermissions';
import Columns from '../../../TreeCommon/Columns';
import Info from '../../Info';
import SwitchColumn from '../../../Columns/SwitchColumn';

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

const permissions = [ "projects.add", "projects.delete", "projects.edit", "projects.switch" ];

const Container = ContainerContructor(DataGrid, undefined, {
    
});




const description = <div>
    Компонент грид 
    Поддерживает:
    <ul>
        <li>инлайн редактирование</li>
        <li>отображение итогов</li>
        <li>применение пермишнов к столбцам - можно сделать столбцы с действиями (редактирование, удаление,...)</li>
        <li>сортировку</li>
        <li>изменение ширины столбцов с помощью мыши</li>
        <li>изменение порядка столбцов с помощью перетаскивания</li>
        <li>кастомный рендеринг столбцов</li>
        <li>столбцы для удаления и редактирования (в общем случае можно создать столбец для произвольных действий)</li>
    </ul>
</div>;

// const ComponentWithInfo = Info(Component, description);


export default {
    component: function Grids(props) {
        return (
            <div className="theme-white" style={{ backgroundColor:'white', width: '900px', margin: '20px'}}>
                <DataGrid {...props}/>
            </div>
        );

        },
//   namespace: 'grids',
  name: 'Grouped',
  props: {
    title: 'Таблица с данными',
    permissionsPrefix: 'projects',
    height: 300,
    width: 500,
    onSave: function () {
        store.sync();  
    },
    groupBy: 'name',
    columns: new Columns([
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
        
    ]),
        store: store,
        height: 300,
        stateId: 'somegrid2',
        
    },
};

