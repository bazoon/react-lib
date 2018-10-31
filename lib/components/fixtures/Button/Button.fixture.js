import React from 'react';
import Button from '../../button/Button';

export default {
  component: function Buttons(props) {
    const style = {
      marginRight: '10px'
    };

    return (
      <React.Fragment>
        <div style={{marginBottom: '20px'}}>
          <Button style={style} type="primary" size="lg">Основная большая</Button>
          <Button style={style} type="primary" size="md">Основная средняя</Button>
          <Button style={style} type="primary" size="sm">Основная маленькая</Button>
        </div>
        <div style={{marginBottom: '20px'}}>
          <Button style={style} type="secondary" size="lg">Второстепенная большая</Button>
          <Button style={style} type="secondary" size="md">Второстепенная средняя</Button>
          <Button style={style} type="secondary" size="sm">Второстепенная маленькая</Button>
        </div>
        <div style={{backgroundColor: '#00f', marginBottom: '20px', padding: '10px' }}>
          <Button style={style} type="dark" size="lg">Темная большая</Button>
          <Button style={style} type="dark" size="md">Темная средняя</Button>
          <Button style={style} type="dark" size="sm">Темная маленькая</Button>
        </div>
        <div style={{backgroundColor: '#00f', marginBottom: '20px', padding: '10px' }}>
          <Button style={style} type="white" size="lg">Светлая большая</Button>
          <Button style={style} type="white" size="md">Светлая средняя</Button>
          <Button style={style} type="white" size="sm">Светлая маленькая</Button>
        </div>

        <div style={{backgroundColor: '#00f', marginBottom: '20px', padding: '10px' }}>
          <Button style={style} type="gray" size="lg">Серая большая</Button>
          <Button style={style} type="gray" size="md">Серая средняя</Button>
          <Button style={style} type="gray" size="sm">Серая маленькая</Button>
        </div>
        
        
        
        

      </React.Fragment>
    );
  },
  namespace: 'buttons',
  name: 'button',
  props: {
    type: 'primary',
    size: 'large',
    children: 'Нажми меня!',
    
  }
};

