const express = require('express');
const bodyparser = require('body-parser');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const Student = require('./models/student');

const app = express();
const port = 5000;

app.set('view engine', 'ejs');
app.use(bodyparser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

mongoose.connect('mongodb://localhost:27017/studentDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Combined form + list
app.get('/', async (req, res) => {
  const students = await Student.find();
  const editStudent = req.query.edit
    ? await Student.findById(req.query.edit)
    : null;
  res.render('index', { students, editStudent });
});

// Create
app.post('/save', async (req, res) => {
  await new Student(req.body).save();
  res.redirect('/');
});

// Update
app.put('/students/:id', async (req, res) => {
  await Student.findByIdAndUpdate(req.params.id, req.body);
  res.redirect('/');
});

// Delete
app.delete('/students/:id', async (req, res) => {
  await Student.findByIdAndDelete(req.params.id);
  res.redirect('/');
});

app.listen(port, () =>
  console.log(`Server is running on http://localhost:${port}`)
);
