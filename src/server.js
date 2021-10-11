const express = require('express');
const multer = require('multer');
const port = process.env.PORT || 5000;
const app = express();
const cookieParser = require('cookie-parser');
const session = require('express-session');
const mysql = require('mysql');
const MysqlStore = require('express-mysql-session')(session);

const options = {
  host: '39.123.4.73',
  port: '3306',
  user: 'abc',
  password: '123456789a',
  database: 'scdt',
};

const sessionStore = new MysqlStore(options);

require('dotenv').config();

const connection = mysql.createConnection({
  host: '39.123.4.73',
  port: '3306',
  database: 'scdt',
  user: 'abc',
  password: '123456789a',
});

connection.connect();

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
app.use(cookieParser());
app.use(
  session({
    secret: 'Secret key',
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
  }),
);

app.use('/image', express.static('./uploads'));

app.get('/loginCheck', (req, res) => {
  if (req.session.isLogin) {
    res.send({ checkLogin: true, username: req.session.user_id });
  } else {
    res.send({ checkLogin: false });
  }
});

app.post('/test', upload.single('image'), (req, res) => {
  const image = `/image/${req.file.filename}`;
  res.send(image);
});

app.post('/user/login', (req, res) => {
  /*
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
  */
  connection.query('select username, password from auth', (err, rows) => {
    if (err) {
      throw err;
    } else {
      const authUsername = rows.filter((user) => {
        return req.body.user_name === user.username;
      })[0];
      const authPwd = rows.filter((user) => {
        return req.body.user_pwd === user.password;
      })[0];

      console.log(authUsername);
      console.log(authPwd);
      if (authUsername && authPwd) {
        req.session.isLogin = true;
        req.session.user_id = req.body.user_name;
        res.send({ checkLogin: true, nickname: req.body.user_name, reLogin: false });
      } else {
        res.send({ checkLogin: false, reLogin: true });
      }
    }
  });
});

app.post('/auth/join', (req, res) => {
  connection.query(
    'INSERT INTO auth(username, password, name, gender, bYear, bMonth, bDay, phoneNumber) Values(?, ?, ?, ?, ?, ?, ?, ?)',
    [
      req.body.username,
      req.body.pwd,
      req.body.name,
      req.body.gender,
      req.body.birthdayYear,
      req.body.birthdayMonth,
      req.body.birthdayDay,
      req.body.phoneNumber,
    ],
    (err) => {
      if (err) {
        console.log('err');
      } else {
        console.log('성공');
      }
    },
  );
  res.send('회원가입 성공');
});

app.post('/auth/username', (req, res) => {
  /*
  const authUsername = auth.map((user) => {
    return user.username;
  });
  res.send(authUsername);
  */
  connection.query('select username from auth', (err, rows, fields) => {
    if (err) {
      throw err;
    } else {
      const authUsername = rows.filter((user) => {
        return user.username === req.body.username;
      })[0];

      if (authUsername) {
        res.send(true);
      } else {
        res.send(false);
      }
    }
  });
});

app.listen(port, () => {
  console.log(`서버 ${port}가 열렸습니다.`);
});
