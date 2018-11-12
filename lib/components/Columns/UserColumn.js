import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import Column from './Column';


export default class  extends Column {
    constructor(props) {
        super(props);
        // this.renerer = th
    }

    renderer(value) {
        const style = {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
        };

        const imgStyle = {
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            marginRight: '8px',
            objectFit: 'cover',
            cursor: 'pointer'

        };
        
        const avatar = value && value.avatar;
        const name = value && value.name;

        return (
            <div style={style}>
                <div>
                    <img src={avatar} style={imgStyle}/>
                </div>
                <div>
                    { name }
                </div>
            </div>
        );
    }
}
