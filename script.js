function addTask() {
    let input = document.getElementById("taskInput");
    let taskText = input.value;

    if (taskText === "") return;

    let li = document.createElement("li");

    li.innerHTML = `
        <span class="task-text">${taskText}</span>
        <button class="edit-btn">Edit</button>
    `;

    document.getElementById("taskList").appendChild(li);

    input.value = "";
}


// EDIT TASK FEATURE
document.addEventListener("click", function(e) {

    if (e.target.classList.contains("edit-btn")) {

        let taskItem = e.target.parentElement;

        let taskText = taskItem.querySelector(".task-text");

        let currentText = taskText.innerText;

        let newText = prompt("Edit your task:", currentText);

        if (newText !== null && newText !== "") {
            taskText.innerText = newText;
        }
    }

});