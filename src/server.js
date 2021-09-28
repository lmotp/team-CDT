const express = require('express');
const port = process.env.PORT || 5000;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.post('/user/login', (req, res) => {
  if (req.body.user_name === 'abc' && req.body.user_pwd === '1111') {
    console.log('success login');
    res.send({ checkLogin: true, nickname: req.body.user_name });
  } else {
    res.send({ checkLogin: false, reLogin: false });
  }
});

app.listen(port, () => {
  console.log('hio');
});
