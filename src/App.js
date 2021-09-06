import './App.css';
import React from 'react';
import HeaderGnb from './components/HeaderGnb';
import { Context } from './Context';
import Share from './pages/Share';

function App() {
  return (
    <Context>
      <div className="container">
        <Share />
        <HeaderGnb></HeaderGnb>
      </div>
    </Context>
  );
}

export default App;
