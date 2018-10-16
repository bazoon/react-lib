import React from 'react';
import Container from './Container';

export default {
  component: Container,
  namespace: 'Menu',
  name: 'Menu',
  props: {
    width: 350,
    items: [
        {
            title: 'Проекты',
            id: 1,
            children: [
                {
                    title: 'Здравоохранение',
                    id: 4,
                    children: [
                        {
                            title: 'Строительство поликлинники №1',
                            id: 7
                        },
                        {
                            title: 'Закупка оборудования',
                            id: 8
                        }

                    ]
                },
                {
                    title: 'Образование',
                    id: 5
                },
                {
                    title: 'Наука',
                    id: 6
                }
            ]
        },
        {
            title: 'Администрирование',
            id: 2
        },
        {
            title: 'Справочники',
            id: 3
        }
    ]
  },

};

