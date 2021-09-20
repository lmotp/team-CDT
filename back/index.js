const express = require('express');
const app = express();
const PORT = 3095;

const multer = require('multer');
const upload = multer({
  storage: multer.diskStorage({
    destination: './uploads',
    filename: function (req, file, cb) {
      cb(null, new Date().valueOf() + '-' + file.originalname);
    },
  }),
});
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
