import React from 'react';
import { Welcome } from '../Components/Welcome';
import { Search } from '../Components/Search';
import { Passengers } from '../Components/Passengers';
import { Tickets } from '../Components/Tickets';
import './StepsLayout.css';

export const StepsLayout = ({ state, send }) => {
  // console.log(state)

  const renderContent = () => {
    // console.log("inicio",state.matches('inicial'))
    if(state.matches('inicial')) 
      return <Welcome state={state} send={send}/>;
    if(state.matches('search')) 
      return <Search state={state} send={send}/>;
    if(state.matches('tickets')) 
      return <Tickets send={send} context={state.context}/>;
    if(state.matches('passengers')) 
      return <Passengers state={state} send={send}/>;
    return null;
  };

  return (
    <div className='StepsLayout'>
      {renderContent()}
    </div>
  );
}; 