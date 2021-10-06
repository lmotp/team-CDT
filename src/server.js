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

app.post('/detailpage', (req, res) => {
  const { postId } = req.body;
  connection.query(
    'SELECT * FROM post LEFT JOIN testauth_id ON post.auth_id = testauth_id.auth_id where post_id = ?',
    [postId],
    (err, row) => {
      if (err) {
        console.log('나는 디테일 에러', err);
      }
      res.send(row);
    },
  );
});

app.post('/detailpage/views', (req, res) => {
  const { postId } = req.body;
  connection.query('UPDATE post SET views = views + 1 WHERE post_id = ?;', [Number(postId)], (err, row) => {
    if (err) {
      console.log('조회수부분 에러', err);
    }
    res.send(row);
  });
});

app.post('/detailpage/comment', (req, res) => {
  const { comment, postId } = req.body;

  connection.query(
    'INSERT INTO post_comment VALUES (null,?,NOW(),?,2,NOW())',
    [Number(postId), comment],
    (err, row) => {
      if (err) {
        console.log('디테일페이지 에러입입니다.', err);
      }
      res.send(row);
    },
  );
});

app.post('/detailpage/comment/list', (req, res) => {
  const { postId } = req.body;

  connection.query(
    'SELECT comment_id,post_comment.post_id,content,post_comment.createdAt,img,nickname FROM post_comment INNER JOIN testauth_id ON post_comment.auth_id = testauth_id.auth_id WHERE post_id = ?',
    [Number(postId)],
    (err, row) => {
      if (err) {
        console.log('코멘트리스트 불러올 때 에러입니다.', err);
      }
      res.send(row);
    },
  );
});

app.post('/detailpage/recomment', (req, res) => {
  const { reComment, commentId } = req.body;

  connection.query('INSERT INTO post_recomment VALUES(null,?,2,?,NOW(),NOW())', [commentId, reComment], (err, row) => {
    if (err) {
      console.log('대댓글 에러에요', err);
    }
    res.send(row);
  });
});

app.post('/detailpage/recomment/list', (req, res) => {
  const { postId } = req.body;

  connection.query(
    'SELECT post_recomment.comment_id,post_recomment.auth_id,recomment,post_recomment.createdAt,nickname,img FROM post_recomment LEFT JOIN post_comment ON post_recomment.comment_id = post_comment.comment_id LEFT JOIN testauth_id ON post_recomment.auth_id = testauth_id.auth_id WHERE post_id = ?',
    [Number(postId)],
    (err, row) => {
      if (err) {
        console.log('대댓글 에러', err);
      }

      res.send(row);
    },
  );
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
