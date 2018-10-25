import React from 'react';
import Container from './Container';
import DataStore from '../../Stores/DataStore';

const store = new DataStore({
    fields: ['id', 'name'], 
    url: 'http://localhost:3000/projects',
    // url: 'https://react-lib-serv.herokuapp.com/leaders'
    shouldCacheFilter: true
  });

export default {
  component: Container,
  name: 'Search',
  props: {
    width: 300,
    store: store,
    titleField: 'name',
    idField: 'id'
  },
};

