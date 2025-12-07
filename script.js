document.addEventListener('DOMContentLoaded', () => {
  const addButton = document.getElementById('add-task-btn');
  const taskInput = document.getElementById('task-input');
  const taskList = document.getElementById('task-list');

  let tasks = [];


  function saveTasksToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  /**
   * Create a single task DOM element and append it to the list.
   * @param {{id: string, text: string}} taskObj
   */
  function createTaskElement(taskObj) {
    const li = document.createElement('li');
    li.textContent = taskObj.text;
    li.setAttribute('data-id', taskObj.id);

    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.className = 'remove-btn';

    removeBtn.addEventListener('click', () => {
      taskList.removeChild(li);

      tasks = tasks.filter(t => t.id !== taskObj.id);

      saveTasksToLocalStorage();
    });

    li.appendChild(removeBtn);
    taskList.appendChild(li);
  }

  /**
   * Add a new task.
   * If called without arguments, reads from the input field.
   * @param {string} [taskTextParam] - Optional task text to add (used when loading from storage)
   * @param {boolean} [save=true] - Whether to save to Local Storage (pass false when loading initial tasks)
   */
  function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task");
        return;
    }

    const li = document.createElement('li');
    li.textContent = taskText;

    const removeBtn = document.createElement('button');
    removeBtn.textContent = "Remove";
    removeBtn.className = "remove-btn";

    removeBtn.onclick = function () {
        taskList.removeChild(li);
    };

    li.appendChild(removeBtn);

    taskList.appendChild(li);

    taskInput.value = "";
  }
}


  function loadTasks() {
    const stored = JSON.parse(localStorage.getItem('tasks') || '[]');
    if (Array.isArray(stored)) {
      tasks = stored;
      tasks.forEach(taskObj => {
        createTaskElement(taskObj);
      });
    }
  }

  
  addButton.addEventListener('click', () => {
    addTask(); 
  });

  taskInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      addTask();
    }
  });

  loadTasks();
});
