import React from 'react';
import Container from './Container';

const projectsData = [
  {
    id: 1,
    label: "Требуется согласование",
    value: 72
  },
  {
    id: 2,
    label: "Контракт",
    value: 20
  },
  {
    id: 3,
    label: "В работе",
    value: 145
  },
  {
    id: 4,
    label: "Выполнено",
    value: 30
  },
  


];


const data = [
    {
      "id": "python",
      "label": "python",
      "value": 72,
      "color": "hsl(320, 70%, 50%)"
    },
    {
      "id": "elixir",
      "label": "elixir",
      "value": 13,
      "color": "hsl(214, 70%, 50%)"
    },
    {
      "id": "scala",
      "label": "scala",
      "value": 500,
      "color": "hsl(81, 70%, 50%)"
    },
    {
      "id": "sass",
      "label": "sass",
      "value": 245,
      "color": "hsl(303, 70%, 50%)"
    },
    {
      "id": "hack",
      "label": "hack",
      "value": 425,
      "color": "hsl(352, 70%, 50%)"
    }
  ];

export default {
  component: Container,
  name: 'Pie',
  
  props: {
    data: projectsData
    
  },

};

