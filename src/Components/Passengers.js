import React, { useState } from 'react';
import './Passengers.css';

export const Passengers = ({ state, send }) => {
  const [value, changeValue] = useState('');

  const onChangeInput = (e) => {
    changeValue(e.target.value);
  }

  const goToTicket = () => {
    send({type:'DONE'})
  }

  const submit = (e) => {
    e.preventDefault();
    send({
      type:'ADD',
      newPassenger: value, 
    })
    console.log(value)
    
    changeValue('');
  }

  const { passengers } = state.context;
//  const passengers = ['dan','alex']
  
 
  return (
    <form onSubmit={submit} className='Passengers'>
      <p className='Passengers-title title'>Agrega a las personas que van a volar ✈️</p>
      {passengers.map((person, idx) => <p className='text' key={`person-${idx}`}>{person}</p>)}
      <input 
        id="name" 
        name="name" 
        type="text" 
        placeholder='Escribe el nombre completo' 
        required 
        value={value} 
        onChange={onChangeInput}
      />
      <div className='Passengers-buttons'>
        <button 
          className='Passengers-button Passengers-add button-secondary'
          type="submit"
        >
          Agregar Pasajero
        </button>
        {!!(passengers.length > 0 ) && <button
          className='Passengers-button Passenger-pay button'
          type="button"
          onClick={goToTicket}
        >
          Ver mi ticket
        </button>}
      </div>
    </form>
  );
};