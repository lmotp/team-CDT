import './App.css';
import react from 'react';
import HeaderGnb from './components/HeaderGnb';
import Contents from './components/contents/Contents';

import './styles/base/reset.css';
import './styles/base/visually-hidden.css';

function App() {
  return (
    <div className="container">
      <HeaderGnb></HeaderGnb>
      <Contents></Contents>
    </div>
  );
}

export default App;
