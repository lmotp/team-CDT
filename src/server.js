const express = require('express');
const multer = require('multer');
const port = process.env.PORT || 5000;
const app = express();
const cookieParser = require('cookie-parser');
const session = require('express-session');
const FileStore = require('session-file-store')(session);

const auth = [];
console.log(auth);

require('dotenv').config();

const upload = multer({
  storage: multer.diskStorage({
    destination: './uploads',
    filename: function (req, file, cb) {
      cb(null, new Date().valueOf() + '-' + file.originalname);
    },
  }),
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  session({
    secret: 'Secret key',
    resave: false,
    saveUninitialized: true,
    store: new FileStore(),
  }),
);

app.use('/image', express.static('./uploads'));

app.get('/', (req, res) => {
  console.log(req.session);
  if (req.session.isLogin === true) {
    res.send(true);
  } else if (req.session.isLogin !== true) {
    res.send(false);
  }
});

app.post('/test', upload.single('image'), (req, res) => {
  const image = `/image/${req.file.filename}`;
  res.send(image);
});

app.post('/user/login', (req, res) => {
  const loginUsername = auth
    .map((user) => {
      return user.username;
    })
    .filter((username) => {
      return req.body.user_name === username;
    })[0];

  const loginUserPwd = auth
    .map((user) => {
      return user.pwd;
    })
    .filter((pwd) => {
      return req.body.user_pwd === pwd;
    })[0];

  if (auth.length !== 0 && loginUsername && loginUserPwd) {
    req.session.isLogin = true;
    req.session.user_id = req.body.user_name;
    res.send({ checkLogin: true, nickname: req.body.user_name, reLogin: false });
  } else {
    res.send({ checkLogin: false, reLogin: true });
  }
});

app.post('/auth/join', (req, res) => {
  console.log(req.body);
  auth.push(req.body);
  console.log(auth);
  res.send('회원가입 성공');
});

app.get('/auth/username', (req, res) => {
  const authUsername = auth.map((user) => {
    return user.username;
  });
  res.send(authUsername);
});

app.listen(port, () => {
  console.log(`서버 ${port}가 열렸습니다.`);
});
