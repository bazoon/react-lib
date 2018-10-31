import React, { Component } from 'react';
import Modal from '../../../Modal/Modal';
import DropDown from '../../../Editors/Dropdown';
import Text from '../../../Editors/Text';
import DataStore from '../../../Stores/DataStore';



export default class EditWindow extends Component {


    constructor(props) {
        super(props);
        this.leaderStore = new DataStore({
            fields: ['id', 'name'], 
            url: 'http://localhost:3000/leaders'
        });
        this.inputRef = React.createRef();
    }

    handleLastFocus = () => {
        const node = this.inputRef.current;
        node && node.input.focus();
    }

    focusFirstInput() {
        const node = this.inputRef.current;
        node && node.input.focus();
    }


    render() {
        const fieldStyle = {
            marginBottom: '10px'
        };
        
        return (
            <Modal isOpened={this.props.isOpened} 
                    onClose={this.props.onClose}
                    onSave={this.props.onSave}
                    width={450}
            >
                <div>
                    <div style={fieldStyle}>
                        <label>
                            Год
                            <Text onChange={(e) => this.props.onChangeField("year", e)} ref={this.inputRef} value={this.props.editItem.year}></Text>
                        </label>
                    </div>
                    <div style={fieldStyle}>
                        <label>
                            План на год
                            <Text onChange={(e) => this.props.onChangeField("year_plan", e)} value={this.props.editItem.year_plan}></Text>
                        </label>
                    </div>
                    <fieldset>
                        <legend>I кв.</legend>
                        <div style={{display: 'flex', justifyContent: 'space-between'}}>
                            <div style={fieldStyle}>
                                <label>
                                    План
                                    <Text onChange={(e) => this.props.onChangeField("first_plan", e)} value={this.props.editItem.first_plan}></Text>
                                </label>
                            </div>
                            <div style={fieldStyle}>
                                <label>
                                    Факт
                                    <Text onChange={(e) => this.props.onChangeField("first_fact", e)} value={this.props.editItem.first_fact}></Text>
                                </label>
                            </div>
                        </div>
                    </fieldset>
                    <fieldset>
                        <legend>II кв.</legend>
                        <div style={{display: 'flex', justifyContent: 'space-between'}}>
                            <div style={fieldStyle}>
                                <label>
                                    План
                                    <Text onChange={(e) => this.props.onChangeField("second_plan", e)} value={this.props.editItem.second_plan}></Text>
                                </label>
                            </div>
                            <div style={fieldStyle}>
                                <label>
                                    Факт
                                    <Text onChange={(e) => this.props.onChangeField("second_fact", e)} value={this.props.editItem.second_fact}></Text>
                                </label>
                            </div>
                        </div>
                    </fieldset>
                    <fieldset>
                        <legend>III кв.</legend>
                        <div style={{display: 'flex', justifyContent: 'space-between'}}>
                            <div style={fieldStyle}>
                                <label>
                                    План
                                    <Text onChange={(e) => this.props.onChangeField("third_plan", e)} value={this.props.editItem.third_plan}></Text>
                                </label>
                            </div>
                            <div style={fieldStyle}>
                                <label>
                                    Факт
                                    <Text onChange={(e) => this.props.onChangeField("third_fact", e)} value={this.props.editItem.third_fact}></Text>
                                </label>
                            </div>
                        </div>
                    </fieldset>
                    <fieldset>
                        <legend>IV кв.</legend>
                        <div style={{display: 'flex', justifyContent: 'space-between'}}>
                            <div style={fieldStyle}>
                                <label>
                                    План
                                    <Text onChange={(e) => this.props.onChangeField("fourth_plan", e)} value={this.props.editItem.fourth_plan}></Text>
                                </label>
                            </div>
                            <div style={fieldStyle}>
                                <label>
                                    Факт
                                    <Text onChange={(e) => this.props.onChangeField("fourth_fact", e)} value={this.props.editItem.fourth_fact}></Text>
                                </label>
                            </div>
                        </div>
                    </fieldset>
                    
                </div>





            
            </Modal>
        );


    }

}
