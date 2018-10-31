import React, { Component } from 'react';
import DataGrid from '../../VirtualTreeGrid/VirtualTreeGrid';

import Modal from '../../Modal/Modal';
import Text from '../../Editors/Text';
import faker from 'faker';
import DataStore from '../../Stores/DataStore';
import DropDown from '../../Editors/Dropdown';
import Paging from '../../PagingToolbar/Paging';


export default class Grids extends Component {

    constructor(props) {
        super(props);
        this.inputRef = React.createRef();
        this.payload = {};
        this.state = {
            isOpened: false,
            editItem: {},
            headerFilters: props.headerFilters,
            isInfoVisible: false
        };

        const leaders = [];
        for (let i = 0; i < 20; i++) {
            leaders.push({
                id: faker.random.number(),
                name: faker.name.firstName(),
            })
        }

        this.leaderStore = new DataStore({
            fields: ['id', 'name'], 
            url: 'http://localhost:3000/leaders'
        });

        
    }

    handleEdit = (item, store) => {
        this.store = store;
        this.item = item;
        
        this.setState({
            isOpened: true,
            editItem: Object.assign({}, item),
        });
        setTimeout(() => {
            const node = this.inputRef.current;
            node && node.input.focus();
        });
    }

    handleClose = (item) => {
        this.setState({
            isOpened: false
        });
    }

    handleLastFocus = () => {
        const node = this.inputRef.current;
        node && node.input.focus();
    }

    handleChangeField = (field, e) => {
        this.state.editItem[field] = e.target.value;
        this.setState(this.state);
    }

    handleSave = () => {
        let payload = this.state.editItem;
        this.store.update(this.item.id, payload);
    }

    onClearFilters = () => {
        if (!this.state.headerFilters) return;
        const keys = Object.keys(this.state.headerFilters);
        let headerFilters = Object.assign({}, this.state.headerFilters);
        keys.forEach((key) => headerFilters[key].props.value = '');
        var me = this;
        this.setState({ headerFilters: headerFilters }, () => {
            this.props.store.clearFilters();
            this.props.store.load()
        });
    }

    onShowChecked = () => {
        console.log(this.props.store.getData().filter((i) => i.checked));
    }

    onSave = () => {
        this.props.store.sync();
    }

    toggleInfo = () => {
        this.setState({
            isInfoVisible: !this.state.isInfoVisible
        });
    }

    render() {
        const fieldStyle = {
            width: '100%',
            marginBottom: '10px'
        }
        
        const infoStyle = {
            maxWidth: '400px',
            backgroundColor: '#76D6FF',
            color: '#212121',
            padding: '20px',
            display: this.state.isInfoVisible ? 'block' : 'none'
        };

        const a = this.state.isOpened;
        
        return (
            <>
                <button onClick={this.toggleInfo}>Показать описание</button>
                <p style={infoStyle} >
                    Компонент грид с использованием библиотеки react-virtualized
                    Позволяет отображать большие объемы данных за счет отображения
                    только части данных и перестроения при скролле. Видимые данные
                    обновляются "на лету".
                    Поддерживает:
                    <ul>
                        <li>инлайн редактирование</li>
                        <li>отображение итогов</li>
                        <li>сортировку</li>
                        <li>изменение ширины столбцов с помощью мыши</li>
                        <li>изменение порядка столбцов с помощью перетаскивания</li>
                        <li>кастомный рендеринг столбцов</li>
                        <li>столбцы для удаления и редактирования (в общем случае можно создать столбец для произвольных действий)</li>
                    </ul>
                    
                </p>
                <div className="theme-white" style={{ backgroundColor:'white', width: '900px', padding: '20px'}}>
                    <div style={{ marginBottom: '20px' }}>
                        <button onClick={this.onSave}>Save</button>
                        <button onClick={this.onShowChecked}>Show checked</button>
                        <button onClick={this.onClearFilters}>Clear filters</button>
                    </div>
                    <DataGrid {...this.props} onEdit={this.handleEdit} headerFilters={this.state.headerFilters}/>
                    <Paging store={this.props.store} interval={3} />
                    
                    <Modal isOpened={this.state.isOpened} 
                            onClose={this.handleClose}
                            onSave={this.handleSave}
                            width={400}
                            height={300}
                    >

                        <div style={fieldStyle}>
                            <label>
                                Код
                                <Text onChange={this.handleChangeField.bind(this, "code")} ref={this.inputRef} value={this.state.editItem.code}></Text>
                            </label>
                        </div>
                        <div style={fieldStyle}>
                            <label>
                                Имя
                                <Text value={this.state.editItem.name} onChange={this.handleChangeField.bind(this, "name")}></Text>
                            </label>
                        </div>
                        <div style={fieldStyle}>
                            <label>
                                Руководитель
                                <DropDown onChange={this.handleChangeField.bind(this, "leader")} value={this.state.editItem.leader} idField="name" textField="name" store={this.leaderStore} onBlur={this.handleLastFocus}/>
                            </label>
                        </div>


                    
                    </Modal>
                </div>
            </>
            );
    }

}