document.addEventListener('DOMContentLoaded', () => {
  const addButton = document.getElementById('add-task-btn');
  const taskInput = document.getElementById('task-input');
  const taskList = document.getElementById('task-list');

  // Load tasks from Local Storage and render them
  function loadTasks() {
    const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    storedTasks.forEach(taskText => addTask(taskText, false)); // false means don't save again
  }

  // Save tasks array to Local Storage
  function saveTasks(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  // Add a new task; save parameter determines whether to update Local Storage
  function addTask(taskText, save = true) {
    if (!taskText) {
      alert('Please enter a task.');
      return;
    }

    const li = document.createElement('li');
    li.textContent = taskText;

    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.classList.add('remove-btn');

    removeBtn.onclick = () => {
      taskList.removeChild(li);
      // Update local storage after removal
      const updatedTasks = getCurrentTasks();
      saveTasks(updatedTasks);
    };

    li.appendChild(removeBtn);
    taskList.appendChild(li);

    if (save) {
      const tasks = getCurrentTasks();
      tasks.push(taskText);
      saveTasks(tasks);
    }

    taskInput.value = '';
  }

  // Helper to get current tasks from the DOM as an array of strings
  function getCurrentTasks() {
    const tasks = [];
    taskList.querySelectorAll('li').forEach(li => {
      // Extract only the task text without the remove button text
      // The task text is the first child text node of li before the button
      // So we can get li.firstChild.textContent trimmed
      // But li.textContent includes "Remove", so better to get the text node only:
      const taskText = li.firstChild.textContent.trim();
      tasks.push(taskText);
    });
    return tasks;
  }

  // Event listeners
  addButton.addEventListener('click', () => {
    addTask(taskInput.value.trim());
  });

  taskInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      addTask(taskInput.value.trim());
    }
  });

  // Initialize the app by loading stored tasks
  loadTasks();
});
