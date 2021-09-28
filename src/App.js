import './App.css';
import react, { useState } from 'react';
import { Route } from 'react-router-dom';

import HeaderGnb from './components/HeaderGnb';
import Contents from './components/contents/Contents';
import NoticeContents from './components/notice-contents/NoticeContents';
import Login from './components/login/Login';
import Auth from './components/login/Auth';

import './styles/base/reset.css';
import './styles/base/visually-hidden.css';

export function App() {
  const [login, setLogin] = useState({ checkLogin: false });

  return (
    <div className="container">
      <HeaderGnb login={login} setLogin={setLogin} />
      <Route exact path="/" component={Contents} />
      <Route path="/notice" component={NoticeContents} />
      <Route path="/user" render={() => <Login login={login} setLogin={setLogin} />} />
      <Route path="/auth" component={Auth} />
    </div>
  );
}

export default App;
