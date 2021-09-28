const express = require('express');
const mysql = require('mysql');
const multer = require('multer');
const app = express();
const PORT = 3095 || process.env.DB_PORT;

require('dotenv').config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

const upload = multer({
  storage: multer.diskStorage({
    destination: './uploads',
    filename: function (req, file, cb) {
      cb(null, new Date().valueOf() + '-' + file.originalname);
    },
  }),
});

connection.connect();

app.use('/image', express.static('./uploads'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post('/test', upload.single('image'), (req, res) => {
  const image = `/image/${req.file.filename}`;
  res.send(image);
});

app.listen(PORT, () => {
  console.log(`서버 ${PORT}가 열렸습니다.`);
});
