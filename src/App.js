import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { Context } from './Context';
import HeaderGnb from './components/HeaderGnb';
import Contents from './components/contents/Contents';
import Share from './pages/Share';
import NotFound from './pages/NotFound';
import FoodGame from './components/foodGame/FoodGame';
import FoodGameResult from './components/foodGame/FoodGameResult';
import './App.css';
import './styles/base/reset.css';
import './styles/base/visually-hidden.css';
import DetailPage from './pages/DetailPage';
import UploadForm from './pages/UploadForm';

function App() {
  return (
    <Context>
      <HashRouter>
        <div className="container">
          <HeaderGnb></HeaderGnb>
          <Switch>
            <Route exact path="/" component={Contents} />
            <Route path="/share" component={Share} />
            <Route path="/detailpage" component={DetailPage} />
            <Route path="/uploadform" component={UploadForm} />
            <Route exact path="/foodgame" component={FoodGame} />
            <Route exact path="/foodgame/:count" component={FoodGameResult} />
            <Route path="/" component={NotFound} />
          </Switch>
        </div>
      </HashRouter>
    </Context>
  );
}

export default App;
