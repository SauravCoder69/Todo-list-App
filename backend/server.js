
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;


app.set('view engine', 'ejs');

// Set the directory where EJS templates are stored
app.set('views', path.join(__dirname, 'views'));

// Parse URL-encoded bodies (for form submissions)
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (CSS, JS, images) from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));


let todos = [
  { id: 1, task: 'Complete project documentation', priority: 'High' },
  { id: 2, task: 'Review code and fix bugs', priority: 'Medium' },
  { id: 3, task: 'Update README file', priority: 'Low' }
];

// Counter for generating unique IDs for new todos
let nextId = 4;

// Routes

// ============================================
// ROUTES - GET REQUESTS
// ============================================

/**
 * GET / - Display all todos
 * Renders the main page with all tasks
 */
app.get('/', (req, res) => {
  res.render('index', { 
    todos: todos,           // Pass all todos to the view
    filter: 'All',          // Current filter status
    error: null,            // Error message (if any)
    success: null           // Success message (if any)
  });
});


app.get('/filter', (req, res) => {
  const { priority } = req.query;  // Get priority from query string
  let filteredTodos = todos;
  
  // Filter todos if priority is specified and not 'All'
  if (priority && priority !== 'All') {
    filteredTodos = todos.filter(todo => todo.priority === priority);
  }
  
  // Render the page with filtered todos
  res.render('index', { 
    todos: filteredTodos,
    filter: priority || 'All',
    error: null,
    success: null
  });
});


 
app.post('/add', (req, res) => {
  const { task, priority } = req.body;
  
  // Validation: Check if task is empty
  if (!task || task.trim() === '') {
    return res.render('index', { 
      todos: todos, 
      filter: 'All',
      error: 'Task cannot be empty! Please enter a task.',
      success: null
    });
  }
  
  // Validation: Check for duplicate tasks
  const isDuplicate = todos.some(todo => 
    todo.task.toLowerCase() === task.trim().toLowerCase()
  );
  
  if (isDuplicate) {
    return res.render('index', { 
      todos: todos, 
      filter: 'All',
      error: 'This task already exists!',
      success: null
    });
  }
  
  // Create new todo object
  const newTodo = {
    id: nextId++,                    // Auto-increment ID
    task: task.trim(),               // Remove extra whitespace
    priority: priority || 'Medium'   // Default to Medium if not specified
  };
  
  // Add new todo to the array
  todos.push(newTodo);
  
  // Render page with success message
  res.render('index', { 
    todos: todos, 
    filter: 'All',
    error: null,
    success: 'Task added successfully!'
  });
});


app.post('/edit/:id', (req, res) => {
  const { id } = req.params;              // Get ID from URL
  const { task, priority } = req.body;    // Get updated data from form
  
  // Find the index of the todo to edit
  const todoIndex = todos.findIndex(todo => todo.id === parseInt(id));
  
  // Check if todo exists
  if (todoIndex !== -1) {
    // Validation: Check if task is empty
    if (!task || task.trim() === '') {
      return res.render('index', { 
        todos: todos, 
        filter: 'All',
        error: 'Task cannot be empty!',
        success: null
      });
    }
    
    // Validation: Check for duplicates (excluding current todo)
    const isDuplicate = todos.some((todo, index) => 
      index !== todoIndex && 
      todo.task.toLowerCase() === task.trim().toLowerCase()
    );
    
    if (isDuplicate) {
      return res.render('index', { 
        todos: todos, 
        filter: 'All',
        error: 'This task already exists!',
        success: null
      });
    }
    
    // Update the todo
    todos[todoIndex].task = task.trim();
    todos[todoIndex].priority = priority || todos[todoIndex].priority;
    
    // Render page with success message
    res.render('index', { 
      todos: todos, 
      filter: 'All',
      error: null,
      success: 'Task updated successfully!'
    });
  } else {
    // Todo not found
    res.render('index', { 
      todos: todos, 
      filter: 'All',
      error: 'Task not found!',
      success: null
    });
  }
});



app.post('/delete/:id', (req, res) => {
  const { id } = req.params;
  const initialLength = todos.length;
  
  // Filter out the todo with the specified ID
  todos = todos.filter(todo => todo.id !== parseInt(id));
  
  // Check if deletion was successful
  if (todos.length < initialLength) {
    res.render('index', { 
      todos: todos, 
      filter: 'All',
      error: null,
      success: 'Task deleted successfully!'
    });
  } else {
    // Todo not found
    res.render('index', { 
      todos: todos, 
      filter: 'All',
      error: 'Task not found!',
      success: null
    });
  }
});


app.listen(PORT, () => {
  console.log(`📍 Server running at: http://localhost:${PORT}`);
});
