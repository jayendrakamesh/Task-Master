document.addEventListener('DOMContentLoaded', async () => {
  let titles = await window.api.getTitles();
  let menu = document.getElementById("edit-select");
  titles.forEach((title) => {
    let option = document.createElement("option");
    option.text = title;
    menu.add(option);
  });

  let editButton = document.getElementById("edit-submit");
  editButton.addEventListener("click", async () => {
    let editSelect = document.getElementById("edit-select");
    let title = editSelect.value.trim();
    
    const result = await window.api.editList(title);
    displayTasks(result);
    showTable();
  });
});

function createAddItemRow() {
  let row = document.createElement("tr");

  let addCell = document.createElement("td");
  addCell.colSpan = 5; // Span the cell across all columns
  let addButton = document.createElement("button");
  addButton.textContent = "Add item";
  addButton.id = "add-item-button";
  let editSelect = document.getElementById("edit-select");
  let title = editSelect.value.trim();
  addButton.addEventListener("click", () => {
    handleAddItem(title);
  });
  addCell.appendChild(addButton);
  row.appendChild(addCell);

  return row;
}


function showTable() {
  let tableContainer = document.getElementById("table-container");
  tableContainer.style.display = "block";
}

function showInput() {
  let inputContainer = document.getElementById("input-div");
  inputContainer.style.display = "block";
}

function displayTasks(tasks) {
  let tableBody = document.getElementById("task-table-body");
  tableBody.innerHTML = ""; // Clear existing table rows

  tasks.forEach((task) => {
    let row = document.createElement("tr");

    let dateCell = document.createElement("td");
    dateCell.textContent = task.date;
    row.appendChild(dateCell);

    let taskNameCell = document.createElement("td");
    taskNameCell.textContent = task.task_name;
    row.appendChild(taskNameCell);

    let categoryCell = document.createElement("td");
    categoryCell.textContent = task.category;
    row.appendChild(categoryCell);

    let priorityCell = document.createElement("td");
    priorityCell.textContent = task.priority;
    row.appendChild(priorityCell);

    let actionCell = document.createElement("td");
    let deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => {
      handleDelete(task.task_name); // Pass task ID to handleDelete
    });
    deleteButton.id = `delete-button-${task.id}`; // Assign an ID to the delete button
    actionCell.appendChild(deleteButton);
    row.appendChild(actionCell);

    tableBody.appendChild(row);

  });
  let addItemRow = createAddItemRow();
  tableBody.appendChild(addItemRow);
}

async function handleDelete(taskName) {
  window.api.handleDelete(taskName);
  let editSelect = document.getElementById("edit-select");
  let title = editSelect.value.trim();
    
  const result = await window.api.editList(title);
  displayTasks(result);
}

function handleAddItem(title) {
  showInput();
  let i1 = document.getElementById("task-name");
  let i2 = document.getElementById("category");
  let i3 = document.getElementById("priority");
  let okButton = document.getElementById("ok-button");
  console.log(title, i1.value.trim(), i2.value.trim(), i3.value.trim());

  okButton.addEventListener("click", () => {
    let taskName = i1.value.trim();
    let category = i2.value.trim();
    let priority = i3.value.trim();
    finalFun(title, taskName, category, priority);
  });
}


async function finalFun(title, taskName, category, priority){
  window.api.finalFun(title,taskName, category, priority);
  const result = await window.api.editList(title);
  displayTasks(result);
}