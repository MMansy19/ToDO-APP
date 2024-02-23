// Toggle classes of night-day theme by button press
const themeButton = document.getElementById("theme-button");
themeButton.addEventListener("click", toggleTheme);

function toggleTheme() {
  const body = document.querySelector("body");
  body.classList.toggle("night-theme");

  const main = body.querySelector("main");
  main.classList.toggle("night-theme");
  toggleButton();
}

function toggleButton() {
  const themeBtnImg = themeButton.querySelector("img");

  if (themeBtnImg.src.includes("icon-moon.svg")) {
    themeBtnImg.src = "./images/icon-sun.svg";
  } else {
    themeBtnImg.src = "./images/icon-moon.svg";
  }
}

// Toggle division of sort buttons from rest of action bar depending on screen width (on load and on resize)
function mobileActionsBar() {
  const sortButtons = document.querySelector("#middle-sort");
  const actionBar = document.querySelector("#actions-bar");
  const main = document.querySelector("main");

  let screenWidth = window.innerWidth;
  if (screenWidth <= 460 && actionBar.querySelector("#middle-sort")) {
    actionBar.removeChild(sortButtons);
    main.appendChild(sortButtons);
    sortButtons.classList.add("srt-bar");
  } else if (screenWidth > 460 && !actionBar.querySelector("#middle-sort")) {
    main.removeChild(sortButtons);
    actionBar.insertBefore(sortButtons, actionBar.querySelector("button"));
    sortButtons.classList.remove("srt-bar");
  }
}

window.addEventListener("resize", mobileActionsBar);
mobileActionsBar();

// Initialize arrays of tasks
const completedTasks = [];
const incompleteTasks = [];
const existingTasks = [completedTasks, incompleteTasks];

// Constructor of task class
class Task {
  constructor(title) {
    this.title = title;
    this.id = Math.random();
    this.isComplete = false;
  }

  changeTaskStatus() {
    this.isComplete = !this.isComplete;

    if (this.isComplete) {
      incompleteTasks.splice(incompleteTasks.indexOf(this), 1);
      completedTasks.push(this);
    } else {
      completedTasks.splice(completedTasks.indexOf(this), 1);
      incompleteTasks.push(this);
    }
  }
}

// Listen for enter key pressed - if new task has value -> add the task to the list of tasks
addEventListener("keydown", function addNewTask(event) {
  const newTaskInput = document.getElementById("new-task-input");
  if (newTaskInput.value && event.key === "Enter") {
    addTasktoList(newTaskInput);
  }
});

// Create new task instance based on the given name
function addTasktoList(inputField) {
  let newTask = new Task(inputField.value);
  incompleteTasks.push(newTask);
  console.log(existingTasks)
  // Add instance to array of incompleteTasks

  // Create new li.task element that is assigned the id and title of corresponding object
  const list = document.getElementById("task-list");
  const newListItem = document.createElement("li");
  newListItem.classList.add("task-left");
  newListItem.classList.add("draggable");
  newListItem.dataset.id = newTask.id;
  newListItem.draggable = true;
  newListItem.ondrop = dropHandler;
  newListItem.ondragover = dragOverHandler;
  newListItem.ondragstart = dragStartHandler;
  newListItem.innerHTML = `
        <label class="custom-radio"></label>
        <p class="task-name">${inputField.value}</p>
    `;
  newListItem.classList.add("task");
  list.appendChild(newListItem);

  inputField.value = "";
  updateLeftItemsNumber();
}

// Update the 'left-items' line as tasks are complete or added
function updateLeftItemsNumber() {
  const leftItemsNum = document.getElementById("items-left");
  leftItemsNum.innerText = `${incompleteTasks.length} items left`;
}


// Define task as completed, by click on task p,label,check img
const taskList = document.querySelector("ul");
taskList.addEventListener("click", function markAsDone(event){
  const label = event.target.parentElement.firstElementChild;
  const checkImgEl = document.createElement("img");
  checkImgEl.src = "./images/icon-check.svg";

  if (
    event.target.tagName.toLowerCase() === "label" ||
    event.target.tagName.toLowerCase() === "img" ||
    event.target.tagName.toLowerCase() === "p"
  ) {
    event.target.closest('li').classList.toggle("completed");
    if (!label.querySelector("img")) {
      label.appendChild(checkImgEl);
    } else {
      const img = label.querySelector("img");
      label.removeChild(img);
    }

    // With every click - change the clicked tasks status & list
    changeLists(label.parentElement);
    updateLeftItemsNumber();
  }
});

// On task click - pass the li element into this function that 
// removes/adds the task to the correct list
function changeLists(li) {
  if (
    li.classList.contains("completed") &&
    completedTasks.findIndex((task) => task.id == li.dataset.id) === -1
  ) {
    let taskToMove = incompleteTasks.find((task) => task.id == li.dataset.id);
    taskToMove.changeTaskStatus();
  } else if (
    !li.classList.contains("completed") &&
    incompleteTasks.findIndex((task) => task.id == li.dataset.id) === -1
  ) {
    let taskToMove = completedTasks.find((task) => task.id == li.dataset.id);
    taskToMove.changeTaskStatus();
  }
}

// Sorting buttons 
const allBtn = document.getElementById("all");
const activeBtn = document.getElementById("active");
const completedBtn = document.getElementById("completed");

activeBtn.addEventListener("click", () => {
  const allTasks = taskList.querySelectorAll("li");

  if (
    allBtn.classList.contains("pressed") ||
    completedBtn.classList.contains("pressed")
  ) {
    allBtn.classList.remove("pressed");
    completedBtn.classList.remove("pressed");
    activeBtn.classList.add("pressed");
  }

  for (const task of allTasks) {
    if (task.classList.contains("completed")) {
      task.style.display = "none";
    } else {
      task.style.display = "flex";
    }
  }
});

completedBtn.addEventListener("click", () => {
  const allTasks = taskList.querySelectorAll("li");

  if (
    allBtn.classList.contains("pressed") ||
    activeBtn.classList.contains("pressed")
  ) {
    allBtn.classList.remove("pressed");
    activeBtn.classList.remove("pressed");
    completedBtn.classList.add("pressed");
  }

  for (const task of allTasks) {
    if (task.classList.contains("completed")) {
      task.style.display = "flex";
    } else {
      task.style.display = "none";
    }
  }
});

allBtn.addEventListener("click", () => {
  const allTasks = taskList.querySelectorAll("li");

  if (
    activeBtn.classList.contains("pressed") ||
    completedBtn.classList.contains("pressed")
  ) {
    activeBtn.classList.remove("pressed");
    completedBtn.classList.remove("pressed");
    allBtn.classList.add("pressed");
  }

  for (const task of allTasks) {
    if ((task.style.display = "none")) {
      task.style.display = "flex";
    }
  }
});

const clearCompletedBtn = document.getElementById("clear-completed");
clearCompletedBtn.addEventListener("click", () => {
  const allTasks = taskList.querySelectorAll("li");
  for (const task of allTasks) {
    if (task.classList.contains("completed")) {
      task.remove();
    }
  }
  completedTasks.splice(0);
});

// Drag and drop event handlers
let hoveredOverElement;
let draggedObj;
let insertBefore;

function dragStartHandler() {
  draggedObj = event.target;
}

function dropHandler() {
  if (insertBefore) {
    taskList.insertBefore(draggedObj, hoveredOverElement);
  } else {
    hoveredOverElement.insertAdjacentElement("afterend", draggedObj);
  }
}

function dragOverHandler() {
  event.preventDefault();

  hoveredOverElement = event.target;
  let hoveredOverDim = hoveredOverElement.getBoundingClientRect();
  let hoveredOverElBottom = hoveredOverDim.bottom;
  let hoveredOverElTop = hoveredOverDim.top;
  let hoveredOverElHeight = hoveredOverDim.height;
  let hoveredOverElMiddle = hoveredOverElBottom - hoveredOverElHeight / 2;
  if (event.clientY < hoveredOverElMiddle && event.clientY > hoveredOverElTop) {
    insertBefore = true;
  } else {
    insertBefore = false;
  }
}