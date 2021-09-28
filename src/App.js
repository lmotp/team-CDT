import React, { useState } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { Context } from './Context';
import HeaderGnb from './components/HeaderGnb';
import Contents from './components/contents/Contents';
import Share from './pages/Share';
import NotFound from './pages/NotFound';
import FoodGame from './components/foodGame/FoodGame';
import FoodGameResult from './components/foodGame/FoodGameResult';
import NoticeContents from './components/notice-contents/NoticeContents';
import Login from './components/login/Login';
import Auth from './components/login/Auth';
import './App.css';
import './styles/base/reset.css';
import './styles/base/visually-hidden.css';
import DetailPage from './pages/DetailPage';
import UploadForm from './pages/UploadForm';

export function App() {
  const [login, setLogin] = useState({ checkLogin: false });

  return (
    <Context>
      <HashRouter>
        <div className="container">
          <HeaderGnb login={login} setLogin={setLogin} />
          <Switch>
            <Route exact path="/" component={Contents} />
            <Route path="/share" component={Share} />
            <Route path="/detailpage" component={DetailPage} />
            <Route path="/uploadform" component={UploadForm} />
            <Route exact path="/foodgame" component={FoodGame} />
            <Route exact path="/foodgame/:count" component={FoodGameResult} />
            <Route path="/notice" component={NoticeContents} />
            <Route path="/" component={NotFound} />
            <Route path="/user" render={() => <Login login={login} setLogin={setLogin} />} />
            <Route path="/auth" component={Auth} />
          </Switch>
        </div>
      </HashRouter>
    </Context>
  );
}

export default App;
