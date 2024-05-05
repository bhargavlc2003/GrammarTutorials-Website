const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path'); // Import the 'path' module

const app = express();
const port = 3000;
// Set the view engine to EJS
app.set('view engine', 'ejs');

app.set('english', path.join(__dirname, 'english'));

//for static pages:
app.use(express.static('public'));
app.use(express.static('views'));
// Set up MongoDB connection
mongoose.connect('mongodb://localhost:27017/englishlearn', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Define a schema and model for your data
const dataSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: String,
  purpose: String
});
const Data = mongoose.model('Data', dataSchema);

// Set up body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));


// Route to render index.html
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/Views/userdetails.html');
});


// Define routes
//app.get('/form', (req, res) => {
  //res.sendFile(__dirname + '/Views/index2.html');
//});


app.post('/submit', (req, res) => {
  const newData = new Data({
    name: req.body.name,
    email: req.body.email,
    age: req.body.age,
    purpose: req.body.purpose

  });

  newData.save()
  .then(() => {
    res.redirect('/select.html');
  })
  .catch((err) => {
    console.error(err);
    res.redirect('/');
  });

});
// app.post('/submit', (req, res) => {
//   const { name, email, age } = req.body;
//   const newUser = new User({ name, email, age });
//   newUser.save()
//       .then(() => {
//           res.redirect('/select.html'); // Redirect to select.html
//       })
//       .catch(err => {
//           console.error(err);
//           res.status(500).send('Internal Server Error');
//       });
// });
 app.get('/data', (req, res) => {
   Data.find({})
     .then(data => {
       res.render('data', { data: data });
     })
     .catch(err => {
       console.error(err);
       // Handle error appropriately, e.g., render an error page
       res.status(500).send('Internal Server Error');
     });
 });

// Set up server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
