const express = require('express');
const multer = require('multer');
const port = process.env.PORT || 5000;
const app = express();

const auth = [];

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

app.use('/image', express.static('./uploads'));

app.post('/test', upload.single('image'), (req, res) => {
  const image = `/image/${req.file.filename}`;
  res.send(image);
});

app.post('/user/login', (req, res) => {
  if (req.body.user_name === 'abc' && req.body.user_pwd === '1111') {
    console.log('success login');
    res.send({ checkLogin: true, nickname: req.body.user_name });
  } else if (auth.length !== 0 || (req.body.user_name === auth[0].username && req.body.user_pwd === auth[0].pwd)) {
    res.send({ checkLogin: true, nickname: req.body.user_name });
  } else {
    res.send({ checkLogin: false, reLogin: false });
  }
});

app.post('/auth/join', (req, res) => {
  console.log(req.body);
  auth.push(req.body);
  res.send(auth[0]);
});

app.listen(port, () => {
  console.log(`서버 ${port}가 열렸습니다.`);
});
