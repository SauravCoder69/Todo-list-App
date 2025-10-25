const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

let todos = [
  { id: 1, task: 'Complete project documentation', priority: 'High' },
  { id: 2, task: 'Review code and fix bugs', priority: 'Medium' },
  { id: 3, task: 'Update README file', priority: 'Low' }
];

let nextId = 4;

app.get('/', (req, res) => {
  res.render('index', { todos: todos, filter: 'All', error: null, success: null });
});

app.get('/filter', (req, res) => {
  const { priority } = req.query;
  let filteredTodos = todos;
  if (priority && priority !== 'All') {
    filteredTodos = todos.filter(todo => todo.priority === priority);
  }
  res.render('index', { todos: filteredTodos, filter: priority || 'All', error: null, success: null });
});

app.post('/add', (req, res) => {
  const { task, priority } = req.body;
  if (!task || task.trim() === '') {
    return res.render('index', { todos: todos, filter: 'All', error: 'Task cannot be empty! Please enter a task.', success: null });
  }
  const isDuplicate = todos.some(todo => todo.task.toLowerCase() === task.trim().toLowerCase());
  if (isDuplicate) {
    return res.render('index', { todos: todos, filter: 'All', error: 'This task already exists!', success: null });
  }
  const newTodo = { id: nextId++, task: task.trim(), priority: priority || 'Medium' };
  todos.push(newTodo);
  res.render('index', { todos: todos, filter: 'All', error: null, success: 'Task added successfully!' });
});

app.post('/edit/:id', (req, res) => {
  const { id } = req.params;
  const { task, priority } = req.body;
  const todoIndex = todos.findIndex(todo => todo.id === parseInt(id));
  if (todoIndex !== -1) {
    if (!task || task.trim() === '') {
      return res.render('index', { todos: todos, filter: 'All', error: 'Task cannot be empty!', success: null });
    }
    const isDuplicate = todos.some((todo, index) => index !== todoIndex && todo.task.toLowerCase() === task.trim().toLowerCase());
    if (isDuplicate) {
      return res.render('index', { todos: todos, filter: 'All', error: 'This task already exists!', success: null });
    }
    todos[todoIndex].task = task.trim();
    todos[todoIndex].priority = priority || todos[todoIndex].priority;
    res.render('index', { todos: todos, filter: 'All', error: null, success: 'Task updated successfully!' });
  } else {
    res.render('index', { todos: todos, filter: 'All', error: 'Task not found!', success: null });
  }
});

app.post('/delete/:id', (req, res) => {
  const { id } = req.params;
  const initialLength = todos.length;
  todos = todos.filter(todo => todo.id !== parseInt(id));
  if (todos.length < initialLength) {
    res.render('index', { todos: todos, filter: 'All', error: null, success: 'Task deleted successfully!' });
  } else {
    res.render('index', { todos: todos, filter: 'All', error: 'Task not found!', success: null });
  }
});

app.listen(PORT, () => {
  console.log(`📍 Server running at: http://localhost:${PORT}`);
});
