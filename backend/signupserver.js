const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const port = 3000;
const cors = require('cors');

app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb+srv://qgsoriano1:dTFT7PvCodNQkKhf@cluster0.l4ph78c.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define a user schema and model
const userSchema = new mongoose.Schema({
  firstName: String, // Add firstName and lastName fields
  lastName: String,
  username: String,
  password: String,
});

const User = mongoose.model('User', userSchema);

// API endpoint for user signup
app.post('/signup', async (req, res) => {
  const { firstName, lastName, username, password } = req.body;

  if (!firstName || !lastName || !username || !password) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  // Check if the user already exists
  const existingUser = await User.findOne({ username });

  if (existingUser) {
    return res.status(400).json({ message: 'Username already exists.' });
  }

  // Create a new user and save it to the database
  const newUser = new User({
    firstName,
    lastName,
    username,
    password,
  });

  await newUser.save();

  res.json({ message: 'Signup successful' });
});

app.listen(port, () => {
  console.log(`Signup server is running on port ${port}`);
});