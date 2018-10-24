import React from 'react';
import Container from './Container';
import DataStore from '../../Stores/DataStore'

const store = new DataStore({
  fields: ['id', 'name'], 
  url: 'http://localhost:3000/leaders'
  // url: 'https://react-lib-serv.herokuapp.com/leaders'
});


export default {
  component: Container,
  name: 'Dropdown',
  
  props: {
    // width: 300,
    height: 200,
    placeholder: 'Выберите что-нибудь',
    store: store,
    idField: 'id',
    textField: 'name',
  },

};

