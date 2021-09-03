import './App.css';
import React from 'react';
import HeaderGnb from './components/HeaderGnb';

import './styles/reset.css';
import './styles/gnb.css';
import Share from './pages/Share';
import { Context } from './Context';

function App() {
  return (
    <>
      <Context>
        <Share />
        <HeaderGnb></HeaderGnb>
      </Context>
    </>
  );
}

export default App;
