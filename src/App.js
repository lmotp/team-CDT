import './App.css';
import react from 'react';
import HeaderGnb from './components/HeaderGnb';

import './styles/reset.css';
import './styles/gnb.css';
import './styles/search-input.css';
import './styles/write-button.css';
import './styles/gnb-menu.css';

function App() {
  return (
    <div className="container">
      <HeaderGnb></HeaderGnb>
    </div>
  );
}

export default App;
