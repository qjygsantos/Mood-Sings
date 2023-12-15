const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const port = 3001;
const cors = require('cors');

app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb+srv://qgsoriano1:dTFT7PvCodNQkKhf@cluster0.l4ph78c.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const User = mongoose.model('User', userSchema);

app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required.' });
  }

  // Find the user in the database
  const existingUser = await User.findOne({ username });

  if (existingUser) {
    if (existingUser.password === password) {
      return res.json({ message: 'Login successful' });
    } else {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }
  } else {
    return res.status(401).json({ message: 'User not found.' });
  }
});

app.listen(port, () => {
  console.log(`Login server is running on port ${port}`);
});