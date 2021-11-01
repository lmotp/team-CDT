import React, { useState, useEffect } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { Context } from './Context';
import HeaderGnb from './components/HeaderGnb';
import Contents from './components/contents/Contents';
import Share from './pages/Share';
import NotFound from './pages/NotFound';
import FoodGame from './components/foodGame/FoodGame';
import FoodGameResult from './components/foodGame/FoodGameResult';
import NoticeContents from './components/notice-contents/NoticeContents';
import Video from './components/video/Video';
import Login from './components/login/Login';
import Auth from './components/login/Auth';
import DetailPage from './pages/DetailPage';
import UploadForm from './pages/UploadForm';
import './App.css';
import './styles/base/reset.css';
import './styles/base/visually-hidden.css';
import axios from 'axios';
import MyPage from './pages/MyPage';

export function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [username, setUsername] = useState('');
  const [userProfileImg, setUserProfileImg] = useState('');
  const [userId, setUserId] = useState('');
  const [user, setUser] = useState([]);

  useEffect(() => {
    axios.get('/loginCheck').then((res) => {
      console.log(res.data.checkLogin);
      setIsLogin(res.data.checkLogin);
      setUsername(res.data.username);
      setUserProfileImg(res.data.userProfileImg);
      setUserId(res.data.userId);
      setUser(res.data.user);
    });
  }, [isLogin, setUserProfileImg, setUsername]);

  return (
    <Context>
      <HashRouter>
        <div className="contain">
          <HeaderGnb
            isLogin={isLogin}
            setIsLogin={setIsLogin}
            username={username}
            userProfileImg={userProfileImg}
            setUsername={setUsername}
          />
          <Switch>
            <Route exact path="/" component={Contents} />
            <Route exact path="/detailpage/:post_id" render={() => <DetailPage userId={userId} isLogin={isLogin} />} />
            <Route path="/video_list" component={Video} />
            <Route path="/uploadform" render={() => <UploadForm userId={userId} />} />
            <Route exact path="/foodgame" component={FoodGame} />
            <Route exact path="/foodgame/:count" component={FoodGameResult} />
            <Route path="/notice/recommend/:category" render={() => <Share userId={userId} />} />
            <Route exact path="/notice/:board" component={NoticeContents} />
            <Route
              path="/user"
              render={() => (
                <Login isLogin={isLogin} setIsLogin={setIsLogin} username={username} setUsername={setUsername} />
              )}
            />
            <Route path="/auth" component={Auth} />
            <Route
              path="/mypage/:username"
              render={() => (
                <MyPage
                  user={user}
                  isLogin={isLogin}
                  userProfileImg={userProfileImg}
                  usernames={username}
                  setUsername={setUsername}
                  setUserProfileImg={setUserProfileImg}
                  userId={userId}
                />
              )}
            />
            <Route path="/" component={NotFound} />
          </Switch>
        </div>
      </HashRouter>
    </Context>
  );
}

export default App;
