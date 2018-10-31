import React from 'react';
import Container from './Container';


const projectsData = [
  {
    country: 'завершение',
    value: 5,
    color: 'hsl(201, 100%, 24%)'
  },
  {
    country: 'реализация',
    value: 35,
    color: 'hsl(201, 100%, 24%)'
  },
  {
    country: 'разработка стратегии', 
    value: 30,
    color: 'hsl(201, 100%, 24%)'
  },
  {
    country: 'подготовка паспорта', 
    value: 20,
    color: 'hsl(201, 100%, 24%)'
  },
  {
    country: 'инициация', 
    value: 10,
    color: 'hsl(201, 100%, 24%)'
  }

];


export default {
  component: Container,
  name: 'Bar',
  
  props: {
    data: projectsData
    
  },

};

