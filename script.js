let tasks = [];

function addTask() {
    let input = document.getElementById("taskInput");
    let taskText = input.value;

    if (taskText === "") return;

    let task = {
        text: taskText,
        status: "pending"
    };

    tasks.push(task);
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

        // ✅ Toggle complete on click
        span.onclick = function () {
            task.status = task.status === "pending" ? "completed" : "pending";
            displayTasks(tasks);
        };

        let deleteBtn = document.createElement("button");
        deleteBtn.innerText = "Delete";

        deleteBtn.onclick = function () {
            tasks.splice(index, 1);
            displayTasks(tasks);
        };

        li.appendChild(span);
        li.appendChild(deleteBtn);

        list.appendChild(li);
    });
}

// ✅ FILTER FUNCTION
function filterTasks(type) {
    if (type === "all") {
        displayTasks(tasks);
    } else {
        let filtered = tasks.filter(task => task.status === type);
        displayTasks(filtered);
    }
}