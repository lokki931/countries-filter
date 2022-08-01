import React from 'react';

const Country = (props) => {
    return (
        <div className='item'>
            <div className='item__img'>
                <img src={props.img} alt={props.name} />
            </div>
            <h3 className='item__tile'>{props.name}</h3>
        </div>
    )
}
export default Country;
