const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const posts = require('./routes/api/posts');
const profile = require('./routes/api/profile');
const users = require('./routes/api/users');

const app = express();

//BodyParser middle-wear
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// DB config
var db = require('./config/keys.js').mongoURI;

// Connect to MongoDB
mongoose.connect(db)
  .then(() => console.log('Connected to database'))
  .catch(err => console.log(err));

app.get('/', (req, res) => res.send('Hello World!!!'));

// Use Routes
app.use('/api/posts', posts);
app.use('/api/profile', profile);
app.use('/api/users', users);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is running on port ${port}`));
