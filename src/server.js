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
    'SELECT category,bracket,title,post.createdAt,img,nickname,views,heart,hashTag,content FROM post LEFT JOIN testauth_id ON post.auth_id = testauth_id.auth_id where post_id = ?',
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

app.post('/detailpage/comment/count', (req, res) => {
  const { postId, count } = req.body;
  connection.query('UPDATE post SET count = ? WHERE post_id = ?', [Number(count), Number(postId)], (err, row) => {
    if (err) {
      console.log('코멘트갯수 에러', err);
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

app.post('/detailpage/heart', (req, res) => {
  const { postId } = req.body;

  connection.query('SELECT * FROM post_heartbox WHERE post_id = ?', [postId], (err, row) => {
    if (err) {
      console.log(err);
    }
    res.json({ count: row.length });
  });
});

app.post('/detailpage/hearted', (req, res) => {
  const { postId, auth } = req.body;

  connection.query('SELECT * FROM post_heartbox WHERE post_id = ? AND auth_id = ?', [postId, auth], (err, row) => {
    if (err) {
      console.log(err);
    }

    let result = false;
    if (row.length !== 0) {
      result = true;
    }
    res.json({ result, info: row });
  });
});

app.post('/detailpage/heart/add', (req, res) => {
  const { postId, auth } = req.body;

  connection.query('INSERT INTO post_heartbox VALUES (null,?,?,NOW(),NOW())', [auth, postId], (err, row) => {
    if (err) {
      console.log(err);
    }
    res.send(true);
  });
});

app.post('/detailpage/heart/addCount', (req, res) => {
  const { postId } = req.body;

  connection.query('UPDATE post SET heart=heart+1 WHERE post_id=?;', [postId], (err, row) => {
    if (err) {
      console.log(err);
    }
    res.send(true);
  });
});

app.post('/detailpage/heart/remove', (req, res) => {
  const { postId, auth, heartId } = req.body;

  connection.query(
    'DELETE FROM post_heartbox WHERE auth_id = ? AND post_id = ? AND heart_id = ?;',
    [auth, postId, heartId],
    (err, row) => {
      if (err) {
        console.log(err);
      }
      res.send(false);
    },
  );
});

app.post('/detailpage/heart/removeCount', (req, res) => {
  const { postId } = req.body;

  connection.query('UPDATE post SET heart=heart-1 WHERE post_id=?;', [postId], (err, row) => {
    if (err) {
      console.log(err);
    }
    res.send(false);
  });
});

app.post('/notice/list', (req, res) => {
  const { board } = req.body;

  let category;
  switch (board) {
    case 'board' && '주요소식':
      category = '주요소식';
      break;
    case 'event' && '이벤트':
      category = '이벤트';
      break;
    case 'free' && '자유게시판':
      category = '자유게시판';
      break;
    case 'video' && '비디오':
      category = '비디오';
      break;
    default:
      throw new Error('액션타입이 안맞습니다..........');
  }
  connection.query(
    'SELECT post_id,count,heart,nickname,title,content,post.createdAt,category,bracket,views FROM post INNER JOIN testauth_id ON post.auth_id = testauth_id.auth_id WHERE category = ?',
    [category],
    (err, row) => {
      if (err) {
        console.log('게시판리스트 에러입니다.', err);
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
