import React from 'react';
import Container from './Container';



const pieData = [
  {
    id: 1,
    label: "Требуется согласование",
    value: 72,
    total: 72 + 20 + 145 + 30
  },
  {
    id: 2,
    label: "Контракт",
    value: 20,
    total: 72 + 20 + 145 + 30
  },
  {
    id: 3,
    label: "В работе",
    value: 145,
    total: 72 + 20 + 145 + 30
  },
  {
    id: 4,
    label: "Выполнено",
    value: 30,
    total: 72 + 20 + 145 + 30
  },
];


const barData = [
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
  name: '2 Charts',
  
  props: {
    pieData,
    barData
    
  },

};

