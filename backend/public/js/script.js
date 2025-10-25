const addTodoForm = document.getElementById('addTodoForm');
const todoInput = document.getElementById('todoInput');
const editModal = document.getElementById('editModal');
const editForm = document.getElementById('editForm');
const editTask = document.getElementById('editTask');
const editPriority = document.getElementById('editPriority');

if (addTodoForm) {
    addTodoForm.addEventListener('submit', function(e) {
        const inputValue = todoInput.value.trim();
        if (!inputValue) {
            e.preventDefault();
            showAlert('Please enter a task before adding!', 'error');
            todoInput.focus();
            return false;
        }
        if (inputValue.length < 3) {
            e.preventDefault();
            showAlert('Task must be at least 3 characters long!', 'error');
            todoInput.focus();
            return false;
        }
        if (inputValue.length > 200) {
            e.preventDefault();
            showAlert('Task must not exceed 200 characters!', 'error');
            todoInput.focus();
            return false;
        }
    });
}

if (todoInput) {
    todoInput.addEventListener('input', function() {
        const value = this.value.trim();
        removeValidationMessage();
        if (value.length > 0 && value.length < 3) {
            showValidationMessage('Task must be at least 3 characters', 'warning');
        } else if (value.length > 200) {
            showValidationMessage('Task exceeds 200 characters limit', 'error');
        }
    });
}

function editTodo(id, task, priority) {
    editForm.action = `/edit/${id}`;
    editTask.value = task;
    editPriority.value = priority;
    editModal.classList.add('active');
    editTask.focus();
}

function closeEditModal() {
    editModal.classList.remove('active');
    editForm.reset();
}

if (editForm) {
    editForm.addEventListener('submit', function(e) {
        const inputValue = editTask.value.trim();
        if (!inputValue) {
            e.preventDefault();
            showAlert('Task cannot be empty!', 'error');
            editTask.focus();
            return false;
        }
        if (inputValue.length < 3) {
            e.preventDefault();
            showAlert('Task must be at least 3 characters long!', 'error');
            editTask.focus();
            return false;
        }
        if (inputValue.length > 200) {
            e.preventDefault();
            showAlert('Task must not exceed 200 characters!', 'error');
            editTask.focus();
            return false;
        }
    });
}

if (editModal) {
    editModal.addEventListener('click', function(e) {
        if (e.target === editModal) {
            closeEditModal();
        }
    });
}

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && editModal.classList.contains('active')) {
        closeEditModal();
    }
});

function showAlert(message, type = 'error') {
    const existingAlerts = document.querySelectorAll('.alert');
    existingAlerts.forEach(alert => alert.remove());
    const alert = document.createElement('div');
    alert.className = `alert alert-${type}`;
    const icon = type === 'error' ? '<i class="fas fa-exclamation-circle"></i>' : '<i class="fas fa-check-circle"></i>';
    alert.innerHTML = `${icon}<span>${message}</span><button class="alert-close" onclick="this.parentElement.remove()"><i class="fas fa-times"></i></button>`;
    const mainContent = document.querySelector('.main-content .container');
    if (mainContent) {
        mainContent.insertBefore(alert, mainContent.firstChild);
        setTimeout(() => { alert.remove(); }, 5000);
    }
}

function showValidationMessage(message, type) {
    removeValidationMessage();
    const validationDiv = document.createElement('div');
    validationDiv.className = `validation-message validation-${type}`;
    validationDiv.textContent = message;
    validationDiv.style.cssText = `font-size: 0.875rem; margin-top: 0.5rem; color: ${type === 'error' ? '#ef4444' : '#f59e0b'}; font-weight: 500;`;
    todoInput.parentElement.appendChild(validationDiv);
}

function removeValidationMessage() {
    const existingMessage = document.querySelector('.validation-message');
    if (existingMessage) existingMessage.remove();
}

document.addEventListener('DOMContentLoaded', function() {
    const alerts = document.querySelectorAll('.alert');
    alerts.forEach(alert => {
        setTimeout(() => {
            alert.style.opacity = '0';
            alert.style.transform = 'translateY(-20px)';
            setTimeout(() => alert.remove(), 300);
        }, 5000);
    });
});

const filterButtons = document.querySelectorAll('.btn-filter');
filterButtons.forEach(button => {
    button.addEventListener('click', function(e) {
        const originalText = this.innerHTML;
        this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
        setTimeout(() => { this.innerHTML = originalText; }, 1000);
    });
});

const deleteButtons = document.querySelectorAll('.btn-delete');
deleteButtons.forEach(button => {
    button.addEventListener('click', function(e) {
        const confirmed = confirm('Are you sure you want to delete this task?');
        if (!confirmed) { e.preventDefault(); return false; }
    });
});

const todoItems = document.querySelectorAll('.todo-item');
todoItems.forEach((item, index) => { item.style.animationDelay = `${index * 0.1}s`; });

document.addEventListener('keydown', function(e) {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') { e.preventDefault(); todoInput.focus(); }
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        if (document.activeElement === todoInput) addTodoForm.submit();
        else if (document.activeElement === editTask) editForm.submit();
    }
});

if (todoInput) {
    const counterDiv = document.createElement('div');
    counterDiv.className = 'character-counter';
    counterDiv.style.cssText = 'font-size: 0.75rem; color: #64748b; margin-top: 0.25rem; text-align: right;';
    todoInput.addEventListener('input', function() {
        const length = this.value.length;
        counterDiv.textContent = `${length}/200 characters`;
        counterDiv.style.color = length > 200 ? '#ef4444' : length > 180 ? '#f59e0b' : '#64748b';
    });
    todoInput.parentElement.appendChild(counterDiv);
}

if (todoInput) {
    const draft = localStorage.getItem('todoDraft');
    if (draft) todoInput.value = draft;
    todoInput.addEventListener('input', function() { localStorage.setItem('todoDraft', this.value); });
    addTodoForm.addEventListener('submit', function() { localStorage.removeItem('todoDraft'); });
}

const statCards = document.querySelectorAll('.stat-card');
const observerOptions = { threshold: 0.5, rootMargin: '0px 0px -100px 0px' };
const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '0';
            entry.target.style.transform = 'translateY(20px)';
            setTimeout(() => {
                entry.target.style.transition = 'all 0.5s ease-out';
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, 100);
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);
statCards.forEach(card => observer.observe(card));

const prioritySelect = document.querySelector('.priority-select');
if (prioritySelect) {
    prioritySelect.addEventListener('change', function() {
        const priority = this.value;
        this.classList.remove('priority-high', 'priority-medium', 'priority-low');
        this.classList.add(`priority-${priority.toLowerCase()}`);
    });
}

function showToast(message, type = 'info', duration = 3000) {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.style.cssText = 'position: fixed; bottom: 2rem; right: 2rem; background: white; padding: 1rem 1.5rem; border-radius: 0.5rem; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1); display: flex; align-items: center; gap: 0.75rem; z-index: 1000; animation: slideInRight 0.3s ease-out;';
    const icon = type === 'success' ? '<i class="fas fa-check-circle" style="color: #10b981;"></i>' : type === 'error' ? '<i class="fas fa-exclamation-circle" style="color: #ef4444;"></i>' : '<i class="fas fa-info-circle" style="color: #3b82f6;"></i>';
    toast.innerHTML = `${icon}<span>${message}</span>`;
    document.body.appendChild(toast);
    setTimeout(() => {
        toast.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => toast.remove(), 300);
    }, duration);
}

const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    .priority-high { border-color: #ef4444 !important; }
    .priority-medium { border-color: #f59e0b !important; }
    .priority-low { border-color: #3b82f6 !important; }
`;
document.head.appendChild(style);

console.log('%c🎯 Dynamic Todo List App', 'color: #6366f1; font-size: 20px; font-weight: bold;');
console.log('%cBuilt with Node.js, Express.js & EJS', 'color: #64748b; font-size: 12px;');
console.log('%cKeyboard Shortcuts:', 'color: #10b981; font-weight: bold;');
console.log('  • Ctrl/Cmd + K: Focus on input');
console.log('  • Ctrl/Cmd + Enter: Submit form');
console.log('  • Escape: Close modal');
