const express = require('express');
const app = express();
const PORT = 3095;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post('/uploadform', (req, res) => {
  const value = req.body;
  res.send(value);
});

app.listen(PORT, () => {
  console.log(`서버 ${PORT}가 열렸습니다.`);
});
