// Load tasks from localStorage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Display tasks on load
window.onload = function () {
    displayTasks(tasks);
};

function addTask() {
    let input = document.getElementById("taskInput");
    let taskText = input.value;

    if (taskText === "") return;

    let task = {
        text: taskText,
        status: "pending"
    };

    tasks.push(task);

    // Save to localStorage
    localStorage.setItem("tasks", JSON.stringify(tasks));

    input.value = "";
    displayTasks(tasks);
}

function displayTasks(taskArray) {
    let list = document.getElementById("taskList");
    list.innerHTML = "";

    taskArray.forEach((task, index) => {
        let li = document.createElement("li");

        let span = document.createElement("span");
        span.innerText = task.text + " (" + task.status + ")";

        // Toggle complete
        span.onclick = function () {
            task.status = task.status === "pending" ? "completed" : "pending";
            localStorage.setItem("tasks", JSON.stringify(tasks));
            displayTasks(tasks);
        };

        // Edit button
        let editBtn = document.createElement("button");
        editBtn.innerText = "Edit";
        editBtn.onclick = function () {
            let newText = prompt("Edit your task:", task.text);
            if (newText !== null && newText !== "") {
                task.text = newText;
                localStorage.setItem("tasks", JSON.stringify(tasks));
                displayTasks(tasks);
            }
        };

        // Delete button
        let deleteBtn = document.createElement("button");
        deleteBtn.innerText = "Delete";
        deleteBtn.onclick = function () {
            tasks.splice(index, 1);
            localStorage.setItem("tasks", JSON.stringify(tasks));
            displayTasks(tasks);
        };

        li.appendChild(span);
        li.appendChild(editBtn);
        li.appendChild(deleteBtn);
        list.appendChild(li);
    });
}

// Filter function
function filterTasks(type) {
    if (type === "all") {
        displayTasks(tasks);
    } else {
        let filtered = tasks.filter(task => task.status === type);
        displayTasks(filtered);
    }
}