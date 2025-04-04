let tasks = []; // Global variable to store tasks
// console.log(tasks);

document.getElementById('username').textContent = localStorage.getItem('username') || 'User';
document.getElementById('popupUsername').textContent = localStorage.getItem('username') || 'User';
document.getElementById('welcomeUsername').textContent = localStorage.getItem('username') || 'User';

// const now1 = new Date();
// console.log(now1);


// const now = new Date(); // Current date and time
// const dueDate = new Date("2025-03-19T23:59:00"); // Given due date
// console.log("now :", now);
// console.log("dueDate: ",dueDate);

// // Convert both to ISO string format for comparison
// const formattedNow = now.toISOString().split('.')[0]; // Remove milliseconds
// const formattedDueDate = dueDate.toISOString().split('.')[0];

// console.log("Now:", formattedNow); // 2025-03-27T03:23:06
// console.log("Due Date:", formattedDueDate); // 2025-03-19T23:59:00

// Fetch and display tasks
async function fetchTasks() {
    document.getElementById('tasks-heading').innerText = 'Your Tasks';
    const token = localStorage.getItem('jwtToken');
    if (!token) {
        document.getElementById('taskList').innerHTML = '<p>Please log in to see your tasks.</p>';
        return;
    }
    
    try {
        const response = await fetch('http://localhost:8080/home', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        });

        if (response.status === 403) {
            document.getElementById('taskList').innerHTML = '<p>Session expired. Please log in again.</p>';
            return;
        }

        if (!response.ok) {
            throw new Error('Failed to fetch tasks');
        }

        tasks = await response.json(); // Store tasks in the global variable
        console.log(tasks);
        displayTasks(tasks);
    } catch (error) {
        document.getElementById('taskList').innerHTML = '<p>Error fetching tasks. Please try again later.</p>';
        console.error(error);
    }
}

// Fetch and display completed tasks
async function fetchCompletedTasks() {
    document.getElementById('tasks-heading').innerText = 'Your Completed Tasks';
    const token = localStorage.getItem('jwtToken');
    if (!token) {
        document.getElementById('taskList').innerHTML = '<p>Please log in to see your tasks.</p>';
        return;
    }

    try {
        const response = await fetch('http://localhost:8080/home/completeness', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        });

        if (response.status === 403) {
            document.getElementById('taskList').innerHTML = '<p>Session expired. Please log in again.</p>';
            return;
        }

        if (!response.ok) {
            throw new Error('Failed to fetch completed tasks');
        }

        const completedTasks = await response.json();
        displayTasks(completedTasks); // Use the same display function
    } catch (error) {
        document.getElementById('taskList').innerHTML = '<p>Error fetching completed tasks. Please try again later.</p>';
        console.error(error);
    }
}

// Fetch and display completed tasks
async function fetchHighPriorityTasks() {
    document.getElementById('tasks-heading').innerText = 'High Priority Tasks List';
    const token = localStorage.getItem('jwtToken');
    if (!token) {
        document.getElementById('taskList').innerHTML = '<p>Please log in to see your tasks.</p>';
        return;
    }

    try {
        const response = await fetch('http://localhost:8080/home/priority', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        });

        if (response.status === 403) {
            document.getElementById('taskList').innerHTML = '<p>Session expired. Please log in again.</p>';
            return;
        }

        if (!response.ok) {
            throw new Error('Failed to fetch completed tasks');
        }

        const completedTasks = await response.json();
        displayTasks(completedTasks); // Use the same display function
    } catch (error) {
        document.getElementById('taskList').innerHTML = '<p>Error fetching completed tasks. Please try again later.</p>';
        console.error(error);
    }
}

async function fetchTodayTasks() {
    document.getElementById('tasks-heading').innerText = 'Today\'s Tasks';
    const token = localStorage.getItem('jwtToken');
    if (!token) {
        document.getElementById('taskList').innerHTML = '<p>Please log in to see your tasks.</p>';
        return;
    }

    try {
        const response = await fetch('http://localhost:8080/home/today', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        });

        if (response.status === 403) {
            document.getElementById('taskList').innerHTML = '<p>Session expired. Please log in again.</p>';
            return;
        }

        if (!response.ok) {
            throw new Error('Failed to fetch completed tasks');
        }

        const completedTasks = await response.json();
        displayTasks(completedTasks); // Use the same display function
    } catch (error) {
        document.getElementById('taskList').innerHTML = '<p>Error fetching completed tasks. Please try again later.</p>';
        console.error(error);
    }
}


const search = document.getElementById('searchBar');

// Listen for input event on the search bar
search.addEventListener("input", (e) => {
    const value = e.target.value.toLowerCase(); // Convert input to lowercase for case-insensitive search

    // Filter tasks based on the title
    const filteredTasks = tasks.filter(task => 
        task.title.toLowerCase().includes(value)
    );

    // Display only the filtered tasks
    displayTasks(filteredTasks);

    // If search is cleared, show all tasks again
    if (value === "") {
        displayTasks(tasks);
    }
});




// Display tasks in grid format
function displayTasks(tasks) {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    if (tasks.length === 0) {
    const emptyTasksDiv = document.createElement('div');
    emptyTasksDiv.className = 'empty-tasks-container';
    const emptyTasksImage = document.createElement('img');
    emptyTasksImage.src = 'images/to-do-list-image.jpeg'; // Path to your image
    emptyTasksImage.alt = 'No tasks';
    emptyTasksImage.className = 'empty-tasks-image';
    const emptyTasksMessage = document.createElement('p');
    emptyTasksMessage.innerHTML = 'You have no tasks here. Come back tomorrow!<br> If you have tasks to complete, go to the <a href="#" onclick="openAddTaskPopup()">"Add Task"</a> section.';
    emptyTasksDiv.appendChild(emptyTasksImage);
    emptyTasksDiv.appendChild(emptyTasksMessage);
    taskList.appendChild(emptyTasksDiv);
        //taskList.innerHTML = '<p>You have no tasks here. Come back tomorrow!<br> If you have tasks to complete, go to the "Add Task" section.</p>';
        return;
    }



    tasks.forEach(task => {
        const taskCard = document.createElement('div');
        taskCard.classList.add('task-card');
        const attachmentLink = convertToDirectGoogleDriveLink(task.attachments);

        taskCard.innerHTML = `
            <h3>${task.title}</h3>
            <p><strong>Description:</strong> ${task.description}</p>
            <p><strong>Due Date:</strong> ${new Date(task.dueDate).toLocaleDateString()}</p>
            <p><strong>Priority:</strong> <span class="priority-${task.priority.toLowerCase()}">${task.priority}</span></p>
            <p><strong>Status:</strong> <span class="status-${task.status.toLowerCase().replace(' ', '-')}">${getStatusEmoji(task.status)}</span></p>
            <p><strong>Attachments:</strong> <a href="${attachmentLink}" download>Download</a></p>
            <div class="task-actions">
                <button onclick="updateTask('${task.id}')"><i class="fas fa-pencil-alt"></i></button>
                <button onclick="deleteTask('${task.id}')"><i class="fas fa-trash"></i></button>
            </div>
        `;
        taskList.appendChild(taskCard);
        console.log(task.dueDate);
    });
}

// it will covert the google drive link to dowload file
function convertToDirectGoogleDriveLink(url) {
    const driveRegex = /https:\/\/drive\.google\.com\/(?:file\/d\/|open\?id=|uc\?id=)([a-zA-Z0-9_-]+)/;
    const match = url.match(driveRegex);

    if (match && match[1]) {
        return `https://drive.google.com/uc?export=download&id=${match[1]}`;
    }
    return url; // If it's not a Google Drive link, return the original URL
}


// Helper function to get status emoji
function getStatusEmoji(status) {
    switch (status) {
        case 'PENDING': return '🟠';
        case 'IN_PROGRESS': return '🔵';
        case 'COMPLETED': return '✅';
        default: return '';
    }
}




// Open settings popup
function openSettings() {
    document.getElementById('settingsPopup').style.display = 'flex';
}

// Close settings popup
function closeSettings() {
    document.getElementById('settingsPopup').style.display = 'none';
}


function editUsername() {
    const usernameInput = document.getElementById('usernameInput');
    usernameInput.removeAttribute('readonly');
    usernameInput.focus();
}

function editPassword() {
    const passwordInput = document.getElementById('passwordInput');
    passwordInput.removeAttribute('readonly');
    passwordInput.focus();
}
function closeSettings() {
    document.getElementById('settingsPopup').style.display = 'none';
}
async function changeUsername() {
    const newUsername = document.getElementById('newUsernameInput').value;
    if (!newUsername) {
        alert('Please enter a new username.');
        return;
    }

    const token = localStorage.getItem('jwtToken');
    console.log(token);
    if (!token) {
        alert('You are not logged in.');
        return;
    }

    try {
        console.log('Using token:', token);  // Debugging: Check if the token is being retrieved

        const response = await fetch(`http://localhost:8080/api/auth/changename/${newUsername}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        console.log
        if (response.status === 403) {
            throw new Error('Forbidden - Your session may have expired. Please log in again.');
        }

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        
        if (data.token) {
            localStorage.setItem('jwtToken', data.token); 
            localStorage.setItem("username", newUsername); // Update token if returned
            document.getElementById('popupUsername').innerText = newUsername;
            alert('Username changed successfully!');
        } else {
            alert('Failed to change username.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert(error.message);
    }
    window.location.href = 'home.html';
}

function changePassword() {
    const newPassword = document.getElementById('newPasswordInput').value;
    const token = localStorage.getItem('jwtToken'); // Retrieve token from local storage

    if (!newPassword) {
        alert('Please enter a new password.');
        return;
    }

    if (!token) {
        alert('Authentication failed. Please log in again.');
        return;
    }

    fetch(`http://localhost:8080/api/auth/changePassword/${newPassword}`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,  // Include token for authentication
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            alert('Password changed successfully!');
        } else {
            throw new Error('Failed to change password.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert(error.message);
    });
    window.location.href = 'home.html';
}


//logout function
function logout() {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('username');
    window.location.href = 'login.html';
}


function openLoginpage(){
   if(tasks.length==0){
    window.location.href = 'login.html';
   }     
}

document.addEventListener('DOMContentLoaded', function () {
    const loginButton = document.getElementById('loginButton');
    if (loginButton && localStorage.getItem('jwtToken')) {
        loginButton.style.display = 'none';
    }
});


// Open Add Task Popup
function openAddTaskPopup() {
    document.getElementById('addTaskPopup').style.display = 'flex';
}

// Close Add Task Popup
function closeAddTaskPopup() {
    document.getElementById('addTaskPopup').style.display = 'none';
}

// Handle Add Task Form Submission
document.getElementById('addTaskForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const taskData = {
        title: document.getElementById('taskTitle').value,
        description: document.getElementById('taskDescription').value,
        dueDate: document.getElementById('taskDueDate').value + ':00', // Add seconds
        priority: document.getElementById('taskPriority').value,
        status: document.getElementById('taskStatus').value,
        reminder: document.getElementById('taskReminder').value + ':00', // Add seconds
        attachments: document.getElementById('taskAttachments').value,
    };

     // ✅ Validate attachment (Google Drive & Dropbox only)
     if (taskData.attachments && !isValidAttachmentLink(taskData.attachments)) {
        alert('Invalid attachment URL! Please enter a valid Google Drive or Dropbox link.');
        return;
    }

    try {
        const token = localStorage.getItem('jwtToken');
        if (!token) {
            alert('Please log in to add a task.');
            return;
        }

        const response = await fetch('http://localhost:8080/home/add', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(taskData),
        });

        if (!response.ok) {
            throw new Error('Failed to add task');
        }

        alert('Task added successfully!');
        closeAddTaskPopup();
        fetchTasks(); // Refresh the task list
    } catch (error) {
        console.error(error);
        alert('Error adding task. Please try again.');
    }
});

function isValidAttachmentLink(url) {
    const googleDrivePattern = /^https?:\/\/drive\.google\.com\/(file\/d\/|open\?id=)[\w-]+/;
    const dropboxPattern = /^https?:\/\/(www\.)?dropbox\.com\/s\/[\w\d]+\/.+/;
    return googleDrivePattern.test(url) || dropboxPattern.test(url);
}


// Update the "Add Task" button to open the popup
document.querySelector('.add-task-btn').addEventListener('click', openAddTaskPopup);

// Delete Task Function
async function deleteTask(taskId) {
    const confirmDelete = confirm('Are you sure you want to delete this task?');
    if (!confirmDelete) return;

    try {
        const token = localStorage.getItem('jwtToken');
        if (!token) {
            alert('Please log in to delete a task.');
            return;
        }

        const response = await fetch(`http://localhost:8080/home/tasks/delete/${taskId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to delete task');
        }

        alert('Task deleted successfully!');
        fetchTasks(); // Refresh the task list
    } catch (error) {
        console.error(error);
        alert('Error deleting task. Please try again.');
    }
}

// Open Update Task Popup
function openUpdateTaskPopup(taskId) {
    console.log(taskId);
    // Find the task in the global tasks array
    const task = tasks.find(task => task.id == taskId);
    console.log(typeof(taskId));
    console.log(typeof(task));
    console.log(task);
    console.log(tasks);

    if (!task) {
        alert('Task not found.');
        return;
    }

    // Populate the form fields
    document.getElementById('updateTaskId').value = task.id;
    document.getElementById('updateTaskTitle').value = task.title;
    document.getElementById('updateTaskDescription').value = task.description;
    document.getElementById('updateTaskDueDate').value = task.dueDate.replace('Z', '');
    document.getElementById('updateTaskPriority').value = task.priority;
    document.getElementById('updateTaskStatus').value = task.status;
    document.getElementById('updateTaskReminder').value = task.reminder ? task.reminder.replace('Z', '') : '';
    document.getElementById('updateTaskAttachments').value = task.attachments;

    // Show the popup
    document.getElementById('updateTaskPopup').style.display = 'flex';
}

// Close Update Task Popup
function closeUpdateTaskPopup() {
    document.getElementById('updateTaskPopup').style.display = 'none';
}

// Handle Update Task Form Submission
document.getElementById('updateTaskForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const taskData = {
        id: document.getElementById('updateTaskId').value,
        title: document.getElementById('updateTaskTitle').value,
        description: document.getElementById('updateTaskDescription').value,
        dueDate: document.getElementById('updateTaskDueDate').value + ':00', // Add seconds
        priority: document.getElementById('updateTaskPriority').value,
        status: document.getElementById('updateTaskStatus').value,
        reminder: document.getElementById('updateTaskReminder').value + ':00', // Add seconds
        attachments: document.getElementById('updateTaskAttachments').value.trim(),
    };

    // ✅ Validate attachment (Google Drive & Dropbox only)
    if (taskData.attachments && !isValidAttachmentLink(taskData.attachments)) {
        alert('Invalid attachment URL! Please enter a valid Google Drive or Dropbox link.');
        return;
    }

    try {
        const token = localStorage.getItem('jwtToken');
        if (!token) {
            alert('Please log in to update a task.');
            return;
        }

        const response = await fetch('http://localhost:8080/home/update', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(taskData),
        });

        if (!response.ok) {
            throw new Error('Failed to update task');
        }

        alert('Task updated successfully!');
        closeUpdateTaskPopup();
        fetchTasks(); // Refresh the task list
    } catch (error) {
        console.error(error);
        alert('Error updating task. Please try again.');
    }
});







document.addEventListener('DOMContentLoaded', async function () {
    await fetchTasks(); 
    checkOverdueTasks(); 
});

let overdueTasksQueue = []; // Store overdue tasks

document.addEventListener('DOMContentLoaded', async function () {
    await fetchTasks(); // Wait for tasks to load
    checkOverdueTasks();
});

function checkOverdueTasks() {
    const now = new Date().toISOString().split('.')[0]; 
    const nowDate = new Date(now);

    overdueTasksQueue = tasks.filter(task => 
        new Date(task.dueDate) < nowDate && task.status !== "COMPLETED"
    );

    console.log("Overdue tasks:", overdueTasksQueue);

    if (overdueTasksQueue.length > 0) {
        showNextOverdueTask();
    }
}

function showNextOverdueTask() {
    if (overdueTasksQueue.length === 0) return;

    const task = overdueTasksQueue[0]; // Get the first overdue task

    document.getElementById("overdueTaskMessage").innerText = 
        `Task "${task.title}" is overdue! What do you want to do?`;

    document.getElementById("taskOverduePopup").style.display = "flex"; // Show popup
}

// Handle user action for the current task
function handleTaskAction(action) {
    console.log("action :", action);
    if (overdueTasksQueue.length === 0) return;

    const task = overdueTasksQueue.shift(); // Remove the first task

    if (action === "completed") {
        console.log("action :", action);
        updateTaskStatus(task.id, "COMPLETED");
    } else if (action === "extend") {
        extendDueDate(task.id);
    } else if (action === "delete") {
        deleteTask(task.id);
    }

    if (overdueTasksQueue.length > 0) {
        showNextOverdueTask(); // Show the next task
    } else {
        closePopup(); // Close popup when all tasks are handled
    }
}

// Update task status to "Completed"
function updateTaskStatus(taskId, status) {
    fetch(`http://localhost:8080/home/update/${taskId}`, {
        method: 'PUT',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('jwtToken'),
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: status })
    })
    .then(response => response.json())
    .then(() => {
        alert('Task updated successfully!');
        fetchTasks(); // Refresh task list
    })
    .catch(error => console.error('Error updating task:', error));
}

// Extend the due date by 1 day
function extendDueDate(taskId) {
    const updatedDueDate = new Date();
    updatedDueDate.setDate(updatedDueDate.getDate() + 1);

    fetch(`http://localhost:8080/home/update/date/${taskId}`, {
        method: 'PUT',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('jwtToken'),
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ dueDate: updatedDueDate.toISOString().split('T')[0] })
    })
    .then(response => response.json())
    .then(() => {
        alert('Due date extended by 1 day!');
        fetchTasks();
    })
    .catch(error => console.error('Error updating task:', error));
}


function closePopup() {
    document.getElementById("taskOverduePopup").style.display = "none";
}



















let selectedFile = null; // Variable to store the selected file

// Handle File Selection
document.getElementById('profilePictureInput').addEventListener('change', (e) => {
    selectedFile = e.target.files[0];
    if (selectedFile) {
        alert(`Selected file: ${selectedFile.name}`);
    }
    document.getElementById('Choose-file-btn').innerText=selectedFile.name;
});

// Handle Profile Picture Upload
function uploadProfilePicture() {
    // Access the file input element
    const fileInput = document.getElementById('profilePictureInput');

    // Check if a file is selected
    if (!fileInput || !fileInput.files || fileInput.files.length === 0) {
        alert('Please select a file to upload.');
        return;
    }

    // Get the selected file
    const file = fileInput.files[0];
    console.log('Selected file:', file); // Debugging

    // Validate file size (e.g., 10MB limit)
    const maxSize = 10 * 1024 * 1024; // 10MB in bytes
    if (file.size > maxSize) {
        alert('File size exceeds the maximum allowed limit (10MB).');
        return;
    }

    // Prepare the form data
    const formData = new FormData();
    formData.append('file', file);

    // Send the file to the server
    fetch('http://localhost:8080/api/auth/upload-profile-pic', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('jwtToken')
        },
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.text(); // Handle plain text response
    })
    .then(data => {
        alert(data); // Display the plain text response
        fetchProfilePicture(); // Refresh the profile picture
    })
    .catch(error => {
        console.error('Error uploading profile picture:', error);
        alert('Error uploading profile picture.');
    });
}

// Open Profile Picture Popup
function openProfilePopup() {
    const profileImage = document.getElementById("profileImage");
    const popupProfileImage = document.getElementById("popupProfileImage");
    const profilePopup = document.getElementById("profilePopup");

    popupProfileImage.src = profileImage.src; // Set the image source
    profilePopup.classList.add("show"); // Show the popup with transition
}

// Close Profile Picture Popup
function closeProfilePopup() {
    document.getElementById("profilePopup").classList.remove("show");
}



// Fetch and Display Profile Picture
function fetchProfilePicture() {
    fetch('http://localhost:8080/api/auth/profile-picture', {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('jwtToken')
        }
    })
    .then(response => {
        if (response.ok) {
            return response.blob();
        } else {
            throw new Error('Profile picture not found');
        }
    })
    .then(blob => {
        const imageUrl = URL.createObjectURL(blob);
        document.getElementById('profileImage').src = imageUrl;
        document.getElementById('profileImagePopup').src = imageUrl;
    })
    .catch(error => {
        console.error('Error fetching profile picture:', error);
        document.getElementById('profileImage').src = 'images/profileimg.png'; // Default image
        document.getElementById('profileImagePopup').src = 'images/profileimg.png'; // Default image
    });
}


// Update the pencil button to open the update popup
function updateTask(taskId) {
    openUpdateTaskPopup(taskId);
}

// Update the "Your Tasks" button to fetch and display all tasks
document.querySelector('li[onclick*="fetchTasks"]').addEventListener('click', fetchTasks);

// Update the "Completed Tasks" button to fetch and display completed tasks
document.querySelector('li[onclick*="completed-tasks"]').addEventListener('click', fetchCompletedTasks);
document.querySelector('li[onclick*="high-priority"]').addEventListener('click',fetchHighPriorityTasks);
document.querySelector('li[onclick*="today-tasks"]').addEventListener('click',fetchTodayTasks);

// fetch the profile pic from the database  on page reload
fetchProfilePicture();
// Load tasks on page load
fetchTasks();