let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

window.onload = function () {
  displayTasks(tasks);
};

function addTask() {
  let input = document.getElementById("taskInput");
  let text = input.value;

  if (text === "") return;

  let task = {
    text: text,
    status: "pending"
  };

  tasks.push(task);
  saveAndDisplay();
  input.value = "";
}

function displayTasks(taskArray) {
  let list = document.getElementById("taskList");
  list.innerHTML = "";

  taskArray.forEach((task, index) => {
    let li = document.createElement("li");

    let span = document.createElement("span");
    span.innerText = task.text;

    if (task.status === "completed") {
      span.classList.add("completed");
    }

    // ✅ Toggle complete
    span.onclick = function () {
      task.status = task.status === "pending" ? "completed" : "pending";
      saveAndDisplay();
    };

    // ✏️ Edit
    let editBtn = document.createElement("button");
    editBtn.innerText = "Edit";
    editBtn.onclick = function () {
      let newText = prompt("Edit task:", task.text);
      if (newText) {
        task.text = newText;
        saveAndDisplay();
      }
    };

    // ❌ Delete
    let deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Delete";
    deleteBtn.onclick = function () {
      tasks.splice(index, 1);
      saveAndDisplay();
    };

    li.appendChild(span);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);

    list.appendChild(li);
  });
}

// 🔍 Filter
function filterTasks(type) {
  if (type === "all") {
    displayTasks(tasks);
  } else {
    let filtered = tasks.filter(t => t.status === type);
    displayTasks(filtered);
  }
}

// 💾 Save + refresh
function saveAndDisplay() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  displayTasks(tasks);
}