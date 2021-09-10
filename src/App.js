import './App.css';
import react from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { Context } from './Context';

import HeaderGnb from './components/HeaderGnb';
import Contents from './components/contents/Contents';
import Share from './pages/Share';
import NotFound from './pages/NotFound';
import NoticeContents from './components/notice-contents/NoticeContents';

import './styles/base/reset.css';
import './styles/base/visually-hidden.css';

function App() {
  return (
    <Context>
      <HashRouter>
        <div className="container">
          <HeaderGnb></HeaderGnb>
          <Switch>
            <Route exact path="/" component={Contents} />
            <Route path="/share" component={Share} />
            <Route path="/notice" component={NoticeContents} />
            <Route path="/" component={NotFound} />
          </Switch>
        </div>
      </HashRouter>
    </Context>
  );
}

export default App;
