import React from 'react';
import HeaderGnb from './components/HeaderGnb';
import Contents from './components/contents/Contents';
import { Context } from './Context';
import Share from './pages/Share';
import './App.css';

import './styles/base/reset.css';
import './styles/base/visually-hidden.css';

function App() {
  return (
    <Context>
      <div className="container">
        <HeaderGnb></HeaderGnb>
        <Contents></Contents>
        <Share></Share>
      </div>
    </Context>
  );
}

export default App;
