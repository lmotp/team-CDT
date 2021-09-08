import React from 'react';
import HeaderGnb from './components/HeaderGnb';
import { Context } from './Context';
import Share from './pages/Share';
import './App.css';

function App() {
  return (
    <Context>
      <div className="container">
        <HeaderGnb></HeaderGnb>
        <Share></Share>
      </div>
    </Context>
  );
}

export default App;
