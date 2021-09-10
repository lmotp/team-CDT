import './App.css';
import react from 'react';
import { Route } from 'react-router-dom';

import HeaderGnb from './components/HeaderGnb';
import Contents from './components/contents/Contents';
import NoticeContents from './components/notice-contents/NoticeContents';

import './styles/base/reset.css';
import './styles/base/visually-hidden.css';

function App() {
  return (
    <div className="container">
      <HeaderGnb></HeaderGnb>
      <Route exact path="/" component={Contents} />
      <Route path="/notice" component={NoticeContents} />
    </div>
  );
}

export default App;
