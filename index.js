import express from 'express';
import jwt from 'jsonwebtoken';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 5000;
const secret = process.env.SECRET || 'SECRET';

const generateToken = data => jwt.sign(data, secret, { expiresIn: '1800s' });

// Middleware
const verifyToken = (req, res, next) => {
  const { token } = req.headers;
  jwt.verify(token, secret, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

app.use(cors({ origin: 'http://127.0.0.1:5500' }));
app.use(express.json());

app.post('/login', (req, res) => {
  const { name, lastname } = req.body;
  const token = generateToken({ name, lastname });
  // send token as cookie
  res.json({ token });
});

app.get('/me', verifyToken, (req, res) => {
  res.json({ secretInfo: req.user });
});

app.listen(port, () => console.log(`Server running on port http://localhost:${port}`));
