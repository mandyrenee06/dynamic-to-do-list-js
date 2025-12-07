document.addEventListener('DOMContentLoaded', function() {
    
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');
    
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => {
            createTaskElement(taskText, false);
        });
    }
    
    function createTaskElement(taskText, saveToStorage = true) {
        const listItem = document.createElement('li');
        listItem.textContent = taskText;
        
        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove";
        removeButton.classList.add('remove-btn');
        
        removeButton.onclick = function() {
            taskList.removeChild(listItem);
            updateLocalStorage();
        };
        
        listItem.appendChild(removeButton);
        taskList.appendChild(listItem);
        
        if (saveToStorage) {
            updateLocalStorage();
        }
    }
    
    function updateLocalStorage() {
        const tasks = [];
        const listItems = taskList.querySelectorAll('li');
        listItems.forEach(item => {
            const taskText = item.textContent.replace('Remove', '').trim();
            tasks.push(taskText);
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    
    function addTask() {
        const taskText = taskInput.value.trim();
        
        if (taskText === "") {
            alert("Please enter a task!");
            return;
        }
        
        createTaskElement(taskText, true);
        
        taskInput.value = '';
        taskInput.focus();
    }
    
    addButton.addEventListener('click', addTask);
    
    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });
    
    loadTasks();
});
