const express = require('express');
const mongoose = require('mongoose');
const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
const cors = require('cors');
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

app.use(cors({
    origin: 'http://localhost:3000'
}));


// MongoDB connection URI
// const mongoURI = 'mongodb+srv://girlswhocantc0de4:<cantcode4>@palendar.oeyd7.mongodb.net/?retryWrites=true&w=majority&appName=Palendar'
// // Connect to MongoDB
// mongoose.connect(mongoURI)
//   .then(() => {
//     console.log('MongoDB connected successfully');
//   })
//   .catch(err => {
//     console.error('Database connection error:', err);
//   });

const mongoURI = 'mongodb+srv://girlswhocantc0de4:pass@palendar.oeyd7.mongodb.net/?retryWrites=true&w=majority&appName=Palendar';

// Connect to MongoDB using Mongoose
mongoose.connect(mongoURI, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true,
  tlsAllowInvalidCertificates: true // Bypass SSL validation (not recommended for production)
})
  .then(() => {
    console.log('MongoDB connected successfully');
  })
  .catch(err => {
    console.error('Database connection error:', err);
  });
const conn = mongoose.connection;
const db = mongoose.connection;


db.on('error', console.error.bind(console, 'MongoDB connection error:'));

db.once('open', async () => {
  console.log('Connected to MongoDB');
});

const imageSchema = new mongoose.Schema({
  year: Number,
  month: Number,
  day: Number,
  url: String
});

const calendarSchema = new mongoose.Schema({
  name: String,
  desc: String,
  images: [imageSchema]
});

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  calendars: [calendarSchema]
});

const User = mongoose.model('User', userSchema);
const Calendar = mongoose.model('Calendar', calendarSchema);
const Image = mongoose.model('Image', imageSchema);
app.post('/checkEmail', async (req, res) => {
  console.log("Inside /checkEmail endpoint");
  const {email} = req.body;
  console.log("Inside /checkEmail endpoint with email: ", email);
  try
  {
    console.log("Inside try endpoint with email: ", email);
    const user = await User.findOne({email: email});
    console.log("Inside try after find  with email: ", email);

    if (user)
    {
      res.json({exists: true});
    }
    else
    {
      res.json({exists: false});
    }
  } 
  catch (error)
  {
    console.error(error);
    res.status(500).send('Error checking if email already exists');
  }
});

app.post('/registerUser', async (req, res) => {
  const {firstName, lastName, email, password} = req.body;
  try
  {
    const user = new User({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      calendars: []
    });

    await user.save();
    res.status(200).send('User created');
  }
  catch (error)
  {
    console.error(error);
    res.status(500).send('Error creating user');
  }
});

app.get('/test', async (req, res) => {
  try {
      await client.connect();
      const database = client.db('test');
      const collection = database.collection('test');
      const document = await collection.findOne({});
      res.json(document.test);
  } catch (error) {
      console.error(error);
      res.status(500).send('Error fetching document');
  } finally {
      await client.close();
  }
});

app.get('/doubleTest', async (req, res) => {
  try {
    const user = await User.findOne({});
    res.status(200).send(user.toObject()); // Convert to plain JavaScript object
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching user');
  }
});



// Define a basic route
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Protect the /main route
app.get('/main', (req, res) => {
  res.send('Welcome to the main page');
});

// Start the server
const PORT = process.env.PORT || 5013;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
