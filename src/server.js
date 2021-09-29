const express = require('express');
const multer = require('multer');
const mysql = require('mysql');
const app = express();

const auth = [];

require('dotenv').config({ path: __dirname + '/.env' });

const port = process.env.DB_PORT || 5000;

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

connection.connect();

const upload = multer({
  storage: multer.diskStorage({
    destination: __dirname + '/uploads',
    filename: function (req, file, cb) {
      cb(null, new Date().valueOf() + '-' + file.originalname);
    },
  }),
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/image', express.static(__dirname + '/uploads'));

app.post('/thumbnail', upload.single('image'), (req, res) => {
  const image = `/image/${req.file.filename}`;
  res.send(image);
});

app.post('/uploadform', (req, res) => {
  const { id, title, category, brackets, value, hashTag } = req.body;
  const params = [id, title, value, hashTag, category, brackets];
  connection.query('INSERT INTO post VALUES (null,?,?,?,?,NOW(),NOW(),?,?)', params, (err, row) => {
    if (err) {
      console.log(err);
    }
    res.send(row);
  });
});

app.post('/detail', (req, res) => {
  const { id } = req.body;
  connection.query('SELECT * FROM post WHERE post_id=?', [id], (err, row) => {
    if (err) {
      console.log('나는 디테일 에러', err);
    }
    res.send(row);
  });
});

app.post('/user/login', (req, res) => {
  if (req.body.user_name === 'abc' && req.body.user_pwd === '1111') {
    console.log('success login');
    res.send({ checkLogin: true, nickname: req.body.user_name });
  } else if (req.body.user_name === auth[0].username && req.body.user_pwd === auth[0].pwd) {
    res.send({ checkLogin: true, nickname: req.body.user_name });
  } else {
    res.send({ checkLogin: false, reLogin: false });
  }
});

app.post('/auth/join', (req, res) => {
  console.log(req.body);
  auth.push(req.body);
  res.json(auth[0]);
});

app.listen(port, () => {
  console.log(`서버 ${port}가 열렸습니다.`);
});
