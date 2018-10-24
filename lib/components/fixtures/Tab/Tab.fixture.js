import React from 'react';
import Container from './Container';

export default {
  component: Container,
  name: 'Tab',
  props: {
    defaultActiveIndex: 0,
    panes: [
        {
            menuItem: 'Tab1',
            render: () => <div>
                Ullamco minim velit nostrud non dolore officia cillum eiusmod est est sint sit ullamco. Magna in nisi nulla laboris irure. Cillum voluptate mollit qui laborum et. Quis Lorem eiusmod deserunt ad incididunt et ut laborum reprehenderit officia dolor exercitation esse culpa. Irure incididunt ea ea aute irure magna ut voluptate laboris deserunt duis non. Eiusmod aliqua pariatur cillum ipsum exercitation anim pariatur.
                Nulla ex laborum velit consectetur aute tempor enim occaecat dolor exercitation ut dolor. Non fugiat cillum tempor mollit exercitation aute amet anim in aliquip consectetur. Consectetur veniam ex cupidatat elit nisi exercitation qui ad nostrud do ullamco. Nisi tempor in mollit ullamco reprehenderit est do aliqua. Eiusmod eiusmod ex cillum consequat voluptate sunt reprehenderit ea. Magna duis id qui dolor fugiat. Id velit laborum adipisicing non nisi cupidatat ad qui.
            </div>
        },
        {
            menuItem: 'Tab2',
            render: () => 'Hello2'
        },
        {
            menuItem: 'Disabled Tab',
            isDisabled: true,
            render: () => <div>
                Sunt laborum deserunt enim tempor et aliqua. Amet esse officia quis commodo. Nulla ullamco ut duis sit. Velit dolore commodo voluptate cillum eiusmod dolor ut ipsum non adipisicing minim. In aliqua nisi commodo irure ullamco minim sit. Laboris excepteur mollit eiusmod esse dolor.
                Minim proident laboris cupidatat Lorem commodo elit in duis incididunt deserunt reprehenderit. Enim excepteur officia ad incididunt quis. Proident cupidatat aliquip enim do pariatur occaecat aliqua sit.
                Minim nostrud Lorem aliquip aliqua. Adipisicing proident ut nulla aute reprehenderit consectetur est irure deserunt cupidatat aliquip excepteur ullamco dolor. Ex eiusmod sit occaecat sint officia deserunt sint irure do. Voluptate eiusmod anim eiusmod excepteur ipsum consequat labore officia.
            </div>
        },
        
    ]
    
  },

};

