# Dynamic Todo List Application

A feature-rich, responsive Todo List web application built with **Node.js**, **Express.js**, and **EJS** templating engine. This application provides a seamless user experience for managing tasks with priority levels, filtering options, and real-time updates.

## 🚀 Features

### Core Functionality
- ✅ **Add Tasks**: Create new todos with custom text and priority levels
- ✏️ **Edit Tasks**: Modify existing tasks inline with a modal interface
- 🗑️ **Delete Tasks**: Remove completed or unwanted tasks
- ✔️ **Toggle Completion**: Mark tasks as complete/incomplete
- 🔍 **Filter by Priority**: View tasks filtered by High, Medium, or Low priority
- 📊 **Task Statistics**: Real-time display of total, completed, and pending tasks

### User Interface
- 🎨 **Modern Design**: Beautiful gradient backgrounds and smooth animations
- 📱 **Fully Responsive**: Optimized for desktop, tablet, and mobile devices
- 🌈 **Priority Color Coding**: Visual indicators for task priority levels
- ⚡ **Real-time Validation**: Client-side form validation with instant feedback
- 🔔 **Alert System**: Success and error notifications for user actions
- ⌨️ **Keyboard Shortcuts**: Enhanced productivity with keyboard navigation

### Technical Features
- 💾 **In-Memory Storage**: Array-based data storage (easily upgradable to database)
- 🔄 **Dynamic Updates**: EJS templates for server-side rendering
- ✅ **Input Validation**: Both client-side and server-side validation
- 🎯 **RESTful Routes**: Proper HTTP methods (GET, POST) for different operations
- 🎭 **Modal Dialogs**: Clean edit interface with modal windows
- 📝 **Draft Auto-save**: Local storage for preserving unsaved work

## 📋 Project Requirements Met

✅ **Header and Footer**: Professional header with branding and footer with credits  
✅ **Todo Creation Box**: Input field with priority selector and add button  
✅ **Empty Field Alert**: Validation prevents empty task submission  
✅ **Edit and Delete**: Full CRUD operations on todos  
✅ **Priority Filter**: Filter tasks by All, High, Medium, or Low priority  
✅ **Responsive Design**: Mobile-first approach with breakpoints for all devices  
✅ **HTTP Methods**: Correct use of GET for viewing, POST for modifications  
✅ **Array Database**: In-memory array storage for todos  
✅ **Dynamic Updates**: EJS templates render updates in real-time  

## 🛠️ Technology Stack

- **Backend**: Node.js, Express.js
- **Template Engine**: EJS (Embedded JavaScript)
- **Styling**: Custom CSS3 with CSS Variables
- **Icons**: Font Awesome 6.4.0
- **Validation**: Client-side JavaScript + Server-side validation

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Todo-Crud-App/backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the server**
   ```bash
   # Development mode with auto-restart
   npm run dev

   # Production mode
   npm start
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

## 📁 Project Structure

```
backend/
├── public/
│   ├── css/
│   │   └── style.css          # Main stylesheet with responsive design
│   └── js/
│       └── script.js          # Client-side validation and interactivity
├── views/
│   ├── partials/
│   │   ├── header.ejs         # Reusable header component
│   │   └── footer.ejs         # Reusable footer component
│   └── index.ejs              # Main todo list page
├── server.js                  # Express server and routes
├── package.json               # Project dependencies
└── README.md                  # Project documentation
```

## 🔌 API Routes

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/` | Display all todos |
| GET | `/filter/:priority` | Filter todos by priority (All, High, Medium, Low) |
| POST | `/add` | Add a new todo |
| POST | `/edit/:id` | Edit an existing todo |
| POST | `/delete/:id` | Delete a todo |
| POST | `/toggle/:id` | Toggle todo completion status |

## 🎨 Features in Detail

### Priority Levels
- **High Priority**: Red color coding for urgent tasks
- **Medium Priority**: Yellow/Orange for moderate importance
- **Low Priority**: Blue for less urgent tasks

### Validation Rules
- Task text cannot be empty
- Minimum length: 3 characters
- Maximum length: 200 characters
- Duplicate task prevention
- Real-time character counter

### Keyboard Shortcuts
- `Ctrl/Cmd + K`: Focus on input field
- `Ctrl/Cmd + Enter`: Submit form
- `Escape`: Close modal

### Responsive Breakpoints
- **Desktop**: > 768px (Full layout with grid)
- **Tablet**: 481px - 768px (Adjusted grid)
- **Mobile**: ≤ 480px (Stacked layout)

## 🎯 Usage Examples

### Adding a Task
1. Enter task description in the input field
2. Select priority level (High, Medium, or Low)
3. Click "Add Task" button or press Ctrl+Enter
4. Task appears in the list with appropriate color coding

### Editing a Task
1. Click the edit icon (pencil) on any task
2. Modal opens with current task details
3. Modify text and/or priority
4. Click "Save Changes" to update

### Filtering Tasks
1. Use the filter buttons to view specific priority tasks
2. Click "All Tasks" to view everything
3. Active filter is highlighted

### Deleting a Task
1. Click the delete icon (trash) on any task
2. Confirm deletion in the dialog
3. Task is removed from the list

## 🔧 Configuration

### Port Configuration
Default port is 3000. Change in `server.js`:
```javascript
const PORT = process.env.PORT || 3000;
```

### Initial Sample Data
Modify the initial todos array in `server.js`:
```javascript
let todos = [
  { id: 1, text: 'Your task', priority: 'High', completed: false }
];
```

## 🚀 Future Enhancements

- [ ] Database integration (MongoDB/PostgreSQL)
- [ ] User authentication and authorization
- [ ] Task categories and tags
- [ ] Due dates and reminders
- [ ] Search functionality
- [ ] Drag-and-drop reordering
- [ ] Export tasks (CSV, JSON)
- [ ] Dark mode theme
- [ ] Task sharing and collaboration

## 🐛 Known Issues

- Data is stored in memory and will be lost on server restart
- No user authentication (single-user mode)
- No data persistence across sessions

## 📝 License

MIT License - Feel free to use this project for learning and development.

## 👨‍💻 Author

Built with ❤️ using Node.js, Express.js, and EJS

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📞 Support

For support, please open an issue in the repository.

---

**Happy Task Managing! 🎯**
