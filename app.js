const API_URL = 'http://localhost:5000/api';

document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const response = await fetch(${API_URL}/auth/register, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });
    if (response.ok) alert('Registered successfully');
});

document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const response = await fetch(${API_URL}/auth/login, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });
    const data = await response.json();
    if (data.token) {
        localStorage.setItem('token', data.token);
        document.getElementById('auth').style.display = 'none';
        document.getElementById('taskManager').style.display = 'block';
    }
});

async function fetchTasks() {
    const token = localStorage.getItem('token');
    const response = await fetch(${API_URL}/tasks, {
        headers: { 'Authorization': token }
    });
    const tasks = await response.json();
    displayTasks(tasks);
}

// More code for task creation, display, filtering...
