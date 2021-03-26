import express from 'express';
import path from 'path';
import url from 'url';
import multer from 'multer';
const app = express();
const port = process.env.PORT || 5000;

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

const publicDir = path.join(__dirname, 'public');
const upload = multer({ dest: path.join(publicDir, 'uploads') });

app.use(express.static(publicDir));

app.get('/', (req, res) => res.sendFile('index.html'));

app.post('/upload-profile-pic', upload.single('profile_pic'), (req, res) => {
  const { file, fileValidationError } = req;
  if (!file) return res.status(400).send('Please upload a file');
  if (fileValidationError) return res.status(400).send(fileValidationError);
  res.send(`<div>Is this your file?: <br/> <img src="uploads/${file.filename}" width="500" /></div>`);
});

app.listen(port, () => console.log(`Server running on port http://localhost:${port}`));
