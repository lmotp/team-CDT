const express = require('express');
const multer = require('multer');
const mysql = require('mysql');
const app = express();
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MysqlStore = require('express-mysql-session')(session);

require('dotenv').config({ path: __dirname + '/.env' });

const options = {
  host: process.env.DB_HOST,
  port: process.env.DB_HOSTPORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
};

const sessionStore = new MysqlStore(options);

const port = process.env.PORT || 5000;

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_HOSTPORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

app.use(cookieParser());
app.use(
  session({
    key: process.env.SESSION_KEY,
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
  }),
);

connection.on('error', function (err) {
  console.log('hi');
  if (err.code === 'PROTOCOL_CONNECTION_LOST') {
    return connection.connect();
  } else {
    throw err;
  }
});

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
app.use(cors());

app.post('/api/thumbnail', upload.single('image'), (req, res) => {
  const image = `/image/${req.file.filename}`;
  console.log(image);
  res.send(image);
});

app.post('/api/uploadform', (req, res) => {
  const { id, title, category, brackets, value, hashTag, changeStateLocation, postId } = req.body;
  const params = [id, title, value, hashTag, category, brackets];

  if (changeStateLocation) {
    connection.query(
      'UPDATE post SET title = ?, content = ?, hashTag = ?, category = ?, bracket = ? WHERE post_id = ?;',
      [title, value, hashTag, category, brackets, postId],
      (err, row) => {
        if (err) {
          console.log('게시글 수정 에러', err);
        }
        res.send(row);
      },
    );
  } else {
    connection.query(
      'INSERT INTO post(auth_id,title,content,hashTag,createdAt,updatedAt,category,bracket,views,heart,count) VALUES (?,?,?,?,NOW(),NOW(),?,?,0,0,0)',
      params,
      (err, row) => {
        if (err) {
          console.log(err);
        }
        res.send(row);
      },
    );
  }
});

app.post('/api/detailpage', (req, res) => {
  const { postId } = req.body;
  connection.query(
    'SELECT post.post_id,post.auth_id,category,bracket,title,post.createdAt,profileImg,name,views,heart,hashTag,content FROM post LEFT JOIN auth ON post.auth_id = auth.id where post_id = ?',
    [postId],
    (err, row) => {
      if (err) {
        console.log('나는 디테일 에러', err);
      }
      res.send(row);
    },
  );
});

app.post('/api/detailpage/remove', (req, res) => {
  const { postId, authId } = req.body;
  connection.query('DELETE FROM post WHERE post_id = ? AND auth_id = ?;', [Number(postId), authId], (err, row) => {
    if (err) {
      console.log(err);
    }
    res.send(row);
  });
});

app.post('/api/detailpage/views', (req, res) => {
  const { postId } = req.body;
  connection.query('UPDATE post SET views = views + 1 WHERE post_id = ?;', [Number(postId)], (err, row) => {
    if (err) {
      console.log('조회수부분 에러', err);
    }
    res.send(row);
  });
});

app.post('/api/detailpage/comment/count', (req, res) => {
  const { postId, count } = req.body;
  connection.query('UPDATE post SET count = ? WHERE post_id = ?', [Number(count), Number(postId)], (err, row) => {
    if (err) {
      console.log('코멘트갯수 에러', err);
    }
    res.send(row);
  });
});

app.post('/api/detailpage/comment', (req, res) => {
  const { comment, postId, userId } = req.body;

  connection.query(
    'INSERT INTO post_comment VALUES (null,?,NOW(),?,?,NOW())',
    [Number(postId), comment, userId],
    (err, row) => {
      if (err) {
        console.log('디테일페이지 에러입입니다.', err);
      }
      res.send(row);
    },
  );
});

app.post('/api/detailpage/comment/list', (req, res) => {
  const { postId } = req.body;

  connection.query(
    'SELECT post_comment.auth_id,comment_id,post_comment.post_id,content,post_comment.createdAt,profileImg,name FROM post_comment INNER JOIN auth ON post_comment.auth_id = auth.id WHERE post_id = ?',
    [Number(postId)],
    (err, row) => {
      if (err) {
        console.log('코멘트리스트 불러올 때 에러입니다.', err);
      }
      res.send(row);
    },
  );
});

app.post('/api/detailpage/recomment', (req, res) => {
  const { reComment, commentId, userId } = req.body;

  connection.query(
    'INSERT INTO post_recomment VALUES(null,?,?,?,NOW(),NOW())',
    [commentId, userId, reComment],
    (err, row) => {
      if (err) {
        console.log('대댓글 에러에요', err);
      }
      res.send(row);
    },
  );
});

app.post('/api/detailpage/recomment/list', (req, res) => {
  const { postId } = req.body;

  connection.query(
    'SELECT post_recomment.id,post_recomment.comment_id,post_recomment.auth_id,recomment,post_recomment.createdAt,name,profileImg FROM post_recomment LEFT JOIN post_comment ON post_recomment.comment_id = post_comment.comment_id LEFT JOIN auth ON post_recomment.auth_id = auth.id WHERE post_id = ?',
    [Number(postId)],
    (err, row) => {
      if (err) {
        console.log('대댓글 에러', err);
      }
      res.send(row);
    },
  );
});

app.post('/api/detailpage/recomment/list/remove', (req, res) => {
  const { commentId, authId, recommentId, on } = req.body;

  if (on) {
    connection.query(
      'DELETE FROM post_recomment WHERE id = ? AND comment_id = ?;',
      [Number(recommentId), Number(commentId)],
      (err, row) => {
        if (err) {
          console.log('어디지?', err);
        }
        res.send(row);
      },
    );
  } else {
    connection.query(
      'DELETE FROM post_comment WHERE comment_id = ? AND auth_id = ?;',
      [Number(commentId), Number(authId)],
      (err, row) => {
        if (err) {
          console.log('어디일까 밑인가?', err);
        }
        res.send(row);
      },
    );
  }

  console.log(req.body);
});

app.post('/api/detailpage/recomment/list/change', (req, res) => {
  const { commentId, authId, recommentId, on, reCommentValue } = req.body;

  if (on) {
    connection.query(
      'UPDATE  post_recomment SET recomment=? WHERE id = ? AND comment_id = ?;',
      [reCommentValue, Number(recommentId), Number(commentId)],
      (err, row) => {
        if (err) {
          console.log('어디지?', err);
        }
        res.send(row);
      },
    );
  } else {
    connection.query(
      'UPDATE post_comment SET content=? WHERE comment_id = ? AND auth_id = ?;',
      [reCommentValue, Number(commentId), Number(authId)],
      (err, row) => {
        if (err) {
          console.log('어디일까 밑인가?', err);
        }
        res.send(row);
      },
    );
  }
});

app.post('/api/detailpage/heart', (req, res) => {
  const { postId } = req.body;

  connection.query('SELECT * FROM post_heartbox WHERE post_id = ?', [postId], (err, row) => {
    if (err) {
      console.log(err);
    }
    res.json({ count: row.length });
  });
});

app.post('/api/detailpage/hearted', (req, res) => {
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

app.post('/api/detailpage/heart/add', (req, res) => {
  const { postId, auth } = req.body;

  connection.query('INSERT INTO post_heartbox VALUES (null,?,?,NOW(),NOW())', [auth, postId], (err, row) => {
    if (err) {
      console.log(err);
    }
    res.send(true);
  });
});

app.post('/api/detailpage/heart/addCount', (req, res) => {
  const { postId } = req.body;

  connection.query('UPDATE post SET heart=heart+1 WHERE post_id=?;', [postId], (err, row) => {
    if (err) {
      console.log(err);
    }
    res.send(true);
  });
});

app.post('/api/detailpage/heart/remove', (req, res) => {
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

app.post('/api/detailpage/heart/removeCount', (req, res) => {
  const { postId } = req.body;

  connection.query('UPDATE post SET heart=heart-1 WHERE post_id=?;', [postId], (err, row) => {
    if (err) {
      console.log(err);
    }
    res.send(false);
  });
});

app.post('/api/notice/list', (req, res) => {
  const { board } = req.body;

  let category;
  if (board === 'board' || board === '주요소식') {
    category = '주요소식';
  } else if (board === 'free' || board === '자유게시판') {
    category = '자유게시판';
  } else if (board === 'video' || board === '영상콘텐츠') {
    category = '영상콘텐츠';
  }

  connection.query(
    'SELECT post_id,count,heart,name,title,content,post.createdAt,category,bracket,views FROM post INNER JOIN auth ON post.auth_id = auth.id WHERE category = ? ORDER BY post_id DESC',
    [category],
    (err, row) => {
      if (err) {
        console.log('게시판리스트 에러입니다.', err);
      }
      res.send(row);
    },
  );
});

// -------------------------------------- 추천게시판 api -------------------------------------------------

app.get('/api/share/categories', (req, res) => {
  connection.query('SELECT coffee_category FROM coffee_categories', (err, row) => {
    if (err) {
      console.log('카테고리 가져오기 에러');
    }
    res.send(row);
  });
});

app.get('/api/share/list/:pages/:reqCategory', (req, res) => {
  console.log('몇번찍히나요?,커피아이템');
  const { pages, reqCategory } = req.params;
  const list = [];

  let category;
  if (reqCategory === 'Latte') {
    category = 'Latte';
  } else if (reqCategory === 'Ccino') {
    category = 'Ccino';
  } else if (reqCategory === 'Sparkling') {
    category = 'Sparkling';
  } else if (reqCategory === 'Coffee') {
    category = 'Coffee';
  } else if (reqCategory === 'FruitDrink') {
    category = 'FruitDrink';
  } else if (reqCategory === 'Tea') {
    category = 'Tea';
  } else {
    category = 'All';
  }

  if (category === 'All') {
    connection.query('SELECT * FROM coffee_item', [category], (err, row) => {
      for (let i = Number(pages) * 10; i < Number(pages) * 10 + 10; i++) {
        if (row[i]) {
          list.push(row[i]);
        } else {
          break;
        }
      }

      res.send(list);
    });
  } else {
    connection.query('SELECT * FROM coffee_item WHERE coffee_category = ?', [category], (err, row) => {
      for (let i = Number(pages) * 10; i < Number(pages) * 10 + 10; i++) {
        if (row[i]) {
          list.push(row[i]);
        } else {
          break;
        }
      }

      res.send(list);
    });
  }
});

app.get('/api/share/heart/:userId', (req, res) => {
  const { userId } = req.params;
  connection.query('SELECT coffee_id FROM coffee_heartbox WHERE auth_id = ?', [Number(userId)], (err, row) => {
    if (err) {
      console.log('여기여기 법에 의한 에러', err);
    }
    res.send(row);
  });
});

app.post('/api/share/list/heart', (req, res) => {
  const { userId, coffeeId } = req.body;

  connection.query(
    'SELECT * FROM coffee_heartbox WHERE auth_id = ? AND coffee_id = ?',
    [Number(userId), Number(coffeeId)],
    (err, row) => {
      if (row.length <= 0) {
        connection.query(
          'INSERT INTO coffee_heartbox VALUES (null,?,?,NOW(),NOW())',
          [Number(userId), Number(coffeeId)],
          (err, row) => {
            if (err) {
              console.log('리스트하트에러', err);
            }
            res.send(row);
          },
        );
      } else {
        connection.query(
          'DELETE FROM coffee_heartbox WHERE auth_id = ? AND coffee_id = ?',
          [Number(userId), Number(coffeeId)],
          (err, row) => {
            if (err) {
              console.log('리스트하트딜리트에러', err);
            }
            res.send(row);
          },
        );
      }
    },
  );
});

// -------------------------------------- 마이페이지 api -------------------------------------------------

app.get('/api/mypage/list/:id/:value', (req, res) => {
  const { id, value } = req.params;
  let category;

  if (value === '작성글') {
    category = 'post';
  } else if (value === '댓글 단 글') {
    category = 'post_comment';
  } else if (value === '좋아요 한 글') {
    category = 'post_heartbox';
  } else if (value === '좋아요 한 커피메뉴') {
    category = 'coffee_heartbox';
  }

  if (category === 'post') {
    connection.query(`SELECT * FROM ${category} WHERE auth_id = ?`, [Number(id)], (err, row) => {
      if (err) {
        console.log('마이페이지 리스트', err);
      }
      res.send(row);
    });
  } else if (category === 'coffee_heartbox') {
    connection.query(
      `SELECT * FROM ${category} INNER JOIN coffee_item ON coffee_item.id_coffee_item = coffee_heartbox.coffee_id WHERE auth_id = ?;`,
      [Number(id)],
      (err, row) => {
        if (err) {
          console.log('좋아요한 커피', err);
        }
        res.send(row);
      },
    );
  } else if (category === 'post_comment') {
    connection.query(
      `SELECT * FROM ${category} INNER JOIN post ON post.post_id = ${category}.post_id WHERE ${category}.auth_id = ? GROUP BY ${category}.post_id;`,
      [Number(id)],
      (err, row) => {
        if (err) {
          console.log('작성댓글', err);
        }
        res.send(row);
      },
    );
  } else {
    connection.query(
      `select * from ${category} inner join post on post.post_id = ${category}.post_id WHERE ${category}.auth_id = ?;`,
      [Number(id)],
      (err, row) => {
        if (err) {
          console.log('좋아요 한 글', err);
        }
        res.send(row);
      },
    );
  }
});

app.get('/api/mypage/:id', (req, res) => {
  const { id } = req.params;
  connection.query('SELECT * FROM auth WHERE id = ?', [Number(id)], (err, row) => {
    if (err) {
      console.log('마이페이지 유저 에러', err);
    }
    res.send(row);
  });
});

app.get('/api/mypage/:id/content', (req, res) => {
  const { id } = req.params;
  connection.query('SELECT * FROM post WHERE auth_id = ?', [Number(id)], (err, row) => {
    if (err) {
      console.log('마이페이지 카운터 에러', err);
    }
    res.send(row);
  });
});

app.get('/api/mypage/:id/comment', (req, res) => {
  const { id } = req.params;
  connection.query('SELECT * FROM post_comment WHERE auth_id = ?', [Number(id)], (err, row) => {
    if (err) {
      console.log('마이페이지 카운터 에러', err);
    }
    res.send(row);
  });
});

app.get('/api/mypage/:id/heart', (req, res) => {
  const { id } = req.params;
  connection.query('SELECT * FROM post_heartbox WHERE auth_id = ?', [Number(id)], (err, row) => {
    if (err) {
      console.log('마이페이지 카운터 에러', err);
    }
    res.send(row);
  });
});

app.get('/api/mypage/:id/coffeeheart', (req, res) => {
  const { id } = req.params;
  connection.query('SELECT * FROM coffee_heartbox WHERE auth_id = ?', [Number(id)], (err, row) => {
    if (err) {
      console.log('마이페이지 카운터 에러', err);
    }
    res.send(row);
  });
});

app.put('/api/mypage/profile', upload.single('image'), (req, res) => {
  const { name, id } = req.body;

  const image = req.file ? `/api/image/${req.file?.filename}` : req.body.image;
  const nickname = name ? name : req.body.name;

  connection.query(
    'UPDATE auth SET profileImg = ? , name = ? WHERE id = ?;',
    [image, nickname, Number(id)],
    (err, row) => {
      if (err) {
        console.log('프로필업데이트 실패', err);
      }
      req.session.user_profileImg = image;
      req.session.user_name = nickname;
      res.send('성공');
    },
  );
});

// -------------------------------------- 결과창 api -------------------------------------------------
app.get('/api/foodgame/:category', (req, res) => {
  const { category } = req.params;
  console.log(category);

  connection.query('SELECT * FROM coffee_item WHERE coffee_category = ? limit 8;', [category], (err, row) => {
    if (err) {
      console.log('게임결과창 에러', err);
    }
    res.send(row);
  });
});

// 유저 로직-*-----*-*--------------------

app.get('/api/loginCheck', (req, res) => {
  if (req.session.isLogin) {
    res.send({
      checkLogin: true,
      username: req.session.user_name,
      userProfileImg: req.session.user_profileImg,
      userId: req.session.user_id,
      user: req.session.user,
    });
  } else {
    res.send({ checkLogin: false });
  }
});

app.get('/api/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

app.post('/api/user/login', (req, res) => {
  connection.query('select * from auth where username=?', [req.body.user_name], (err, rows) => {
    if (err) {
      throw err;
    } else {
      const authPwd = rows.filter((user) => {
        return req.body.user_pwd === user.password;
      })[0];

      const authPwdObj = {
        bDay: authPwd.bDay,
        bMonth: authPwd.bMonth,
        bYear: authPwd.bYear,
        gender: authPwd.gender,
        username: authPwd.username,
      };

      if (rows[0].password === req.body.user_pwd) {
        req.session.isLogin = true;
        req.session.user_name = authPwd.name;
        req.session.user_profileImg = authPwd.profileImg;
        req.session.user_id = authPwd.id;
        req.session.user = authPwdObj;
        res.send({ checkLogin: true, nickname: req.body.user_name, reLogin: false });
      } else {
        res.send({ checkLogin: false, reLogin: true });
      }
    }
  });
});

app.post('/api/auth/join', (req, res) => {
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

app.post('/api/auth/username', (req, res) => {
  connection.query('select username from auth', (err, rows, fields) => {
    if (err) {
      throw err;
    } else {
      const authUsername = rows.filter((user) => {
        return user.username === req.body.username;
      })[0];

      if (authUsername) {
        res.send({ repeat: true });
      } else {
        res.send({ repeat: false });
      }
    }
  });
});

// video 로직

app.get('/api/video/data', (req, res) => {
  connection.query('select * from video', (err, rows) => {
    if (err) {
      console.log('err');
    } else {
      res.send(rows);
    }
  });
});

if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static(path.join(__dirname, '../', 'build')));

  // index.html for all page routes
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../', 'build', 'index.html'));
  });
}

app.listen(port, () => {
  console.log(`서버 ${port}가 열렸습니다.`);
});
