// your-javascript-file.js

document.addEventListener("DOMContentLoaded", function () {
    const addTaskBtn = document.getElementById("addTaskBtn");
    const taskList = document.getElementById("taskList");
    const progressBar = document.getElementById("progressBar");

    let completedTasks = 0;

    // Add default task on page load
    addDefaultTask();

    addTaskBtn.addEventListener("click", function () {
        const taskItem = document.createElement("li");
        taskItem.classList.add("flex", "items-center", "justify-between", "border-b", "border-gray-200", "py-2");

        const taskCheckbox = document.createElement("input");
        taskCheckbox.type = "checkbox";
        taskCheckbox.classList.add("form-checkbox", "h-5", "w-5", "text-blue-500");
        taskCheckbox.addEventListener("change", function () {
            updateProgressBar();
            updateTaskTextDecoration();
        });
        taskItem.appendChild(taskCheckbox);

        const taskText = document.createElement("span");
        taskText.textContent = "Enter task..."; // Placeholder text
        taskText.setAttribute("contenteditable", "true"); // Make the text editable
        taskText.dataset.placeholder = "Enter task..."; // Placeholder for dynamically added tasks
        taskText.addEventListener("focus", function () {
            if (taskText.textContent === taskText.dataset.placeholder) {
                taskText.textContent = "";
            }
        });
        taskText.addEventListener("blur", function () {
            if (taskText.textContent === "") {
                taskText.textContent = taskText.dataset.placeholder;
            }
        });
        taskItem.appendChild(taskText);

        const deleteBtn = document.createElement("button");
        deleteBtn.innerHTML = "&times;"; // "×" symbol for delete
        deleteBtn.classList.add("text-red-500", "ml-2", "cursor-pointer");
        deleteBtn.addEventListener("click", function () {
            taskList.removeChild(taskItem);
            updateProgressBar();
        });
        taskItem.appendChild(deleteBtn);

        taskList.appendChild(taskItem);

        updateProgressBar();
    });

    function updateProgressBar() {
        const totalTasks = taskList.children.length;
        completedTasks = 0;

        for (let i = 0; i < totalTasks; i++) {
            const taskCheckbox = taskList.children[i].querySelector("input[type='checkbox']");
            if (taskCheckbox.checked) {
                completedTasks++;
            }
        }

        const progressPercentage = (completedTasks / totalTasks) * 100;
        progressBar.style.width = `${progressPercentage}%`;
    }

    function updateTaskTextDecoration() {
        const tasks = taskList.children;

        for (let i = 0; i < tasks.length; i++) {
            const taskCheckbox = tasks[i].querySelector("input[type='checkbox']");
            const taskText = tasks[i].querySelector("span");

            if (taskCheckbox.checked) {
                taskText.style.textDecoration = "line-through";
            } else {
                taskText.style.textDecoration = "none";
            }
        }
    }

    function addDefaultTask() {
        const defaultTaskItem = document.createElement("li");
        defaultTaskItem.classList.add("flex", "items-center", "justify-between", "border-b", "border-gray-200", "py-2");

        const defaultTaskCheckbox = document.createElement("input");
        defaultTaskCheckbox.type = "checkbox";
        defaultTaskCheckbox.classList.add("form-checkbox", "h-5", "w-5", "text-blue-500");
        defaultTaskCheckbox.addEventListener("change", function () {
            updateProgressBar();
            updateTaskTextDecoration();
        });
        defaultTaskItem.appendChild(defaultTaskCheckbox);

        const defaultTaskText = document.createElement("span");
        defaultTaskText.textContent = "Default Task";
        defaultTaskText.setAttribute("contenteditable", "true"); // Make the text editable
        defaultTaskText.dataset.placeholder = "Default Task"; // Placeholder for default task
        defaultTaskText.addEventListener("focus", function () {
            if (defaultTaskText.textContent === defaultTaskText.dataset.placeholder) {
                defaultTaskText.textContent = "";
            }
        });
        defaultTaskText.addEventListener("blur", function () {
            if (defaultTaskText.textContent === "") {
                defaultTaskText.textContent = defaultTaskText.dataset.placeholder;
            }
        });
        defaultTaskItem.appendChild(defaultTaskText);

        const defaultDeleteBtn = document.createElement("button");
        defaultDeleteBtn.innerHTML = "&times;"; // "×" symbol for delete
        defaultDeleteBtn.classList.add("text-red-500", "ml-2", "cursor-pointer");
        defaultDeleteBtn.addEventListener("click", function () {
            taskList.removeChild(defaultTaskItem);
            updateProgressBar();
        });
        defaultTaskItem.appendChild(defaultDeleteBtn);

        taskList.appendChild(defaultTaskItem);

        updateProgressBar();
    }
});
