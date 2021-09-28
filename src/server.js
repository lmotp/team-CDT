const express = require('express');
const port = process.env.PORT || 5000;
const app = express();

const auth = [];

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

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
  console.log('hio');
});
