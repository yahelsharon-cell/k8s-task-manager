const express = require('express');
const mongoose = require('mongoose');
const app = express();

// 1. The Magic Line: It looks for 'DB_HOST' environment variable
// If it doesn't find it, it defaults to localhost (for testing on your laptop)
const mongoUrl = process.env.DB_HOST || 'mongodb://localhost:27017/mydb';

// 2. Connect to MongoDB
mongoose.connect(mongoUrl)
  .then(() => console.log('Connected to DB!'))
  .catch(err => console.error('Failed to connect to DB:', err));

// 3. Define a simple "Task" model
const Task = mongoose.model('Task', { name: String });

app.use(express.json());

// Endpoint 1: Get all tasks
app.get('/', async (req, res) => {
  const tasks = await Task.find();
  res.send(`
    <h1>Task List</h1>
    <ul>${tasks.map(t => `<li>${t.name}</li>`).join('')}</ul>
    <form action="/create" method="POST">
      <input type="text" name="name" placeholder="New Task">
      <button type="submit">Add</button>
    </form>
  `);
});

// Endpoint 2: Save a new task
// Note: using simple query param for ease of testing in browser
app.use(express.urlencoded({ extended: true }));
app.post('/create', async (req, res) => {
  const newTask = new Task({ name: req.body.name });
  await newTask.save();
  res.redirect('/');
});

// Start the server
app.listen(3000, () => {
  console.log('Server running on port 3000');
});