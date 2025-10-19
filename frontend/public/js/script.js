// Edit Todo Function with smooth animation
function editTodo(id, text, priority) {
    const modal = document.getElementById('editModal');
    const form = document.getElementById('editForm');
    const textInput = document.getElementById('editText');
    const prioritySelect = document.getElementById('editPriority');
    
    // Set form action
    form.action = `/edit/${id}`;
    
    // Set current values
    textInput.value = text;
    prioritySelect.value = priority;
    
    // Show modal with animation
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Focus on input with delay for smooth animation
    setTimeout(() => {
        textInput.focus();
        textInput.select();
    }, 100);
}

// Close Edit Modal with animation
function closeEditModal() {
    const modal = document.getElementById('editModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('editModal');
    if (event.target === modal) {
        closeEditModal();
    }
}

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeEditModal();
    }
});

// Auto-hide alerts after 5 seconds with smooth animation
document.addEventListener('DOMContentLoaded', function() {
    const alerts = document.querySelectorAll('.alert');
    alerts.forEach(alert => {
        setTimeout(() => {
            alert.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
            alert.style.opacity = '0';
            alert.style.transform = 'translateY(-20px)';
            setTimeout(() => {
                alert.remove();
            }, 500);
        }, 5000);
    });
    
    // Add smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Add entrance animations to todo items
    const todoItems = document.querySelectorAll('.todo-item');
    todoItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.05}s`;
    });
});

// Form validation
document.getElementById('addTodoForm')?.addEventListener('submit', function(e) {
    const input = document.getElementById('todoInput');
    if (!input.value.trim()) {
        e.preventDefault();
        input.focus();
        input.style.borderColor = 'var(--danger-color)';
        setTimeout(() => {
            input.style.borderColor = '';
        }, 2000);
    }
});

// Smooth scroll to top when adding/editing
window.addEventListener('load', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Add fade-in effect to main content
    const mainContent = document.querySelector('.main-content');
    if (mainContent) {
        mainContent.style.opacity = '0';
        mainContent.style.transform = 'translateY(20px)';
        setTimeout(() => {
            mainContent.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            mainContent.style.opacity = '1';
            mainContent.style.transform = 'translateY(0)';
        }, 100);
    }
});

// Add ripple effect to buttons
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('btn') || e.target.closest('.btn')) {
        const button = e.target.classList.contains('btn') ? e.target : e.target.closest('.btn');
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple-effect');
        
        button.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    }
});
