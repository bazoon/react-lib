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
import ProgressColumn from '../../../Columns/ProgressColumn';



const leaderStore = new DataStore({
    fields: ['id', 'name'], 
    url: 'http://localhost:3000/leaders'
    // url: 'https://react-lib-serv.herokuapp.com/leaders'
});



const store = new DataStore({
    fields: ['id', 'name', 'progress', 'deadline', 'responsible', 'budget', 'risk', 'requireAttention'],
    url: 'http://localhost:3000/tree_projects2',
    // url: 'https://react-lib-serv.herokuapp.com/projects',
    isRemoteSort: true,
    pageSize: 10,
});


const permissions = [ "projects.add", "projects.delete", "projects.edit", "projects.switch" ];

// const Container = ContainerContructor(DataGrid, EditWindow, {
//     applyPermissions: function (permissions, state) {
//         state.columns.setEnabled('switch', permissions.switch === true);
        
//     }
// });



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
  name: 'Custom',
  props: {
    title: 'Таблица с данными',
    permissionsPrefix: 'projects',
    height: 300,
    width: 500,
    onSave: function () {
        store.sync();  
    },
    columns: new Columns([
        new Column({
            name: 'name',
            width: 308,
            text: 'Проект',
            sorted: true,
            draggable: true,
            
        }),
        new ProgressColumn({
            name: 'progress',
            width: 100,
            text: 'Прогресс',
            sorted: true,
            draggable: true,
        }),
        new Column({
            name: 'deadline',
            width: 80,
            text: 'Срок',
            sorted: true,
            draggable: true,
            renderer: function (value) {
                return <span>{ dateUtil.formatDate(value) }</span>;
            },
        }),
        new Column({
            name: 'responsible',
            width: 150,
            text: 'Ответственный',
            sorted: true,
            draggable: true,
            renderer: function (r) {
                const style = {
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                };

                const imgStyle = {
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    marginRight: '8px'
                };

                return (
                    <div style={style}>
                        <div style={{height: '40px'}}>
                            <img src={r.avatar} style={imgStyle}/>
                        </div>
                        <div>
                            { r.name }
                        </div>
                    </div>   
                );
            },
        }),
        new Column({
            name: 'budget',
            width: 100,
            text: 'Бюджет, тыс. руб.',
            sorted: true,
            draggable: true,
        }),
        new Column({
            name: 'risk',
            width: 100,
            text: 'Риски',
            sorted: true,
            draggable: true,
            renderer: function (value) {
                const v = +value * 100;
                const style = {
                    color: v > 60 ? '#ad0a1d' : '#000000'
                };
                
                return <span style={style}>{ Math.ceil(v) }%</span>;
            },
        }),
    ]),
        store: store,
        height: 300,
        stateId: 'somegrid22',
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
};

