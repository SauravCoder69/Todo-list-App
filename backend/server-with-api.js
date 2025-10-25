const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE']
}));

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

let todos = [
  { id: 1, title: 'Complete project documentation', priority: 'High' },
  { id: 2, title: 'Review code and fix bugs', priority: 'Medium' },
  { id: 3, title: 'Update README file', priority: 'Low' }
];
let nextId = 4;

app.get('/api/todos', (req, res) => {
  console.log('API GET /api/todos');
  res.json(todos);
});

app.post('/api/todos', (req, res) => {
  console.log('API POST /api/todos', req.body);
  const { title, priority } = req.body;

  if (!title || !title.trim()) {
    return res.status(400).json({ error: 'Title cannot be empty' });
  }

  const newTodo = { id: nextId++, title: title.trim(), priority: priority || 'Medium' };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

app.put('/api/todos/:id', (req, res) => {
  console.log(`API PUT /api/todos/${req.params.id}`, req.body);
  const { id } = req.params;
  const { title, priority } = req.body;

  const todoIndex = todos.findIndex(t => t.id === parseInt(id));
  if (todoIndex === -1) return res.status(404).json({ error: 'Todo not found' });

  if (title !== undefined) todos[todoIndex].title = title.trim();
  if (priority !== undefined) todos[todoIndex].priority = priority;

  res.json(todos[todoIndex]);
});

app.delete('/api/todos/:id', (req, res) => {
  console.log(`API DELETE /api/todos/${req.params.id}`);
  const { id } = req.params;
  const before = todos.length;
  todos = todos.filter(t => t.id !== parseInt(id));

  if (todos.length < before) {
    res.json({ message: 'Todo deleted successfully', id: parseInt(id) });
  } else {
    res.status(404).json({ error: 'Todo not found' });
  }
});

app.get('/', (req, res) => {
  console.log('EJS GET /');
  res.render('index', { todos, filter: 'All', error: null, success: null });
});

app.get('/filter', (req, res) => {
  const { priority } = req.query;
  console.log(`EJS GET /filter?priority=${priority}`);
  const filtered = (priority && priority !== 'All') ? todos.filter(t => t.priority === priority) : todos;
  res.render('index', { todos: filtered, filter: priority || 'All', error: null, success: null });
});

app.post('/add', (req, res) => {
  const { task, priority } = req.body;
  console.log('EJS POST /add', task);

  if (!task || !task.trim()) {
    return res.render('index', { todos, filter: 'All', error: 'Task cannot be empty!', success: null });
  }

  todos.push({ id: nextId++, title: task.trim(), priority: priority || 'Medium' });
  res.render('index', { todos, filter: 'All', error: null, success: 'Task added successfully!' });
});

app.post('/edit/:id', (req, res) => {
  const { id } = req.params;
  const { task, priority } = req.body;
  console.log(`EJS POST /edit/${id}`, task);

  const index = todos.findIndex(t => t.id === parseInt(id));
  if (index === -1) return res.render('index', { todos, filter: 'All', error: 'Task not found!', success: null });

  if (!task || !task.trim()) {
    return res.render('index', { todos, filter: 'All', error: 'Task cannot be empty!', success: null });
  }

  todos[index].title = task.trim();
  todos[index].priority = priority || todos[index].priority;
  res.render('index', { todos, filter: 'All', error: null, success: 'Task updated successfully!' });
});

app.post('/delete/:id', (req, res) => {
  const { id } = req.params;
  console.log(`EJS POST /delete/${id}`);
  const before = todos.length;
  todos = todos.filter(t => t.id !== parseInt(id));

  if (todos.length < before) {
    res.render('index', { todos, filter: 'All', error: null, success: 'Task deleted successfully!' });
  } else {
    res.render('index', { todos, filter: 'All', error: 'Task not found!', success: null });
  }
});

app.listen(PORT, () => {
  console.log('------------------------------------------');
  console.log('🚀 Todo Server is running!');
  console.log(`🌐 EJS App: http://localhost:${PORT}/`);
  console.log(`📡 API Base: http://localhost:${PORT}/api/todos`);
  console.log('------------------------------------------');
});
