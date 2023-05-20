import readline from "readline";

const rtl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function Task() {
  this.id = null;
  this.title = "";
  this.completed = false;
}
Task.prototype.description = "";
Task.prototype.priority = 0;
Task.prototype.date = "";

function Tasks() {
  this.counter = 1;
  this.TasksList = [];
}

Tasks.prototype.addTask = function (task) {
  console.log("adding task ...");
  task.id = this.counter++;
  this.TasksList.push(task);
  console.log("new task added successfully");
};
Tasks.prototype.listAllTasks = function () {
  if (this.TasksList.length){
    this.TasksList.map((task) => {
      console.log(task);
    });
  }else {
    console.log("there is no tasks !");
  }
};

Tasks.prototype.listCompletedTasks = function () {
  this.TasksList.filter((a) => a.completed).map((task) => {
    console.log(task);
  });
};
Tasks.prototype.markTaskDone = function (id) {
  const task = this.TasksList.find((a) => a.id == id);
  if (task) {
    task.completed = true;
  } else {
    console.log("task not found");
  }
};
Tasks.prototype.deleteTask = function (id) {
  const index = this.TasksList.findIndex((a) => a.id == id);
  if (index >= 0) {
    this.TasksList.splice(index, 1);
    console.log(`task # ${id} deleted`);
  } else {
    console.log("task not found");
  }
  
};
Tasks.prototype.sortByDate = function () {
  this.TasksList.sort(
    (a, b) => new Date(b.date) / 1000 - new Date(a.date) / 1000
  );
  this.listAllTasks();
};
Tasks.prototype.sortByPriority = function () {
  this.TasksList.sort((a, b) => b.priority - a.priority);
  this.listAllTasks();
};
Tasks.prototype.clearAllTasks = function (){
  this.TasksList.splice(0,this.TasksList.length);
  console.log("all tasks are deleted !");
};
const mainMenu = () => {
  console.log("1) Add a new task");
  console.log("2) List all tasks");
  console.log("3) List completed tasks");
  console.log("4) Mark the task as done");
  console.log("5) Delete a task");
  console.log("6) Sort tasks by the due date");
  console.log("7) Sort tasks by priority");
  console.log("8) Clear all tasks");
  console.log("0) Exit");
  return new Promise((resolve) =>
    rtl.question("Select an action :", (value) => resolve(Number(value)))
  );
};
const getId = () => {
  return new Promise((resolve) =>
    rtl.question("Please enter task id: ", (value) => resolve(Number(value)))
  );
};
const newTask = () => {
  const data = [
    { title: "enter task title :", value: null },
    { title: "enter task description :", value: null },
    { title: "enter task priority :", value: null },
    { title: "enter task date :", value: null },
  ];
  return new Promise((resolve) => {
    const newTask = new Task();
    let count = 0;

    const getData = () => {
      if (count === data.length) {
        newTask.title = data[0].value;
        newTask.description = data[1].value;
        newTask.priority = Number(data[2].value);
        newTask.date = new Date(data[3].value);
        resolve(newTask);
        rtl.close;
        return;
      }

      rtl.question(data[count].title, (value) => {
        data[count].value = value;
        count++;
        getData();
      });
    };

    getData();
  });
};

const tasksList = new Tasks();
var x = 1;
console.log("***************************");
console.log("Welcome to JS TODO-APP");
console.log("***************************");
const main = async () => {
  while (x) {
    x = await mainMenu();
    switch (x) {
      case 1:
        tasksList.addTask(await newTask());
        break;
      case 2:
        tasksList.listAllTasks();
        break;
      case 3:
        tasksList.listCompletedTasks();
        break;
      case 4:
        tasksList.markTaskDone(await getId());
        break;
      case 5:
        tasksList.deleteTask(await getId());
        break;
      case 6:
        tasksList.sortByDate();
        break;
      case 7:
        tasksList.sortByPriority();
        break;
      case 8:
        tasksList.clearAllTasks();
        break;
      case 0:
        x = 0;
        break;
      default:
        console.log("invalid choice ");
        break;
    }
  }
  rtl.close();
  console.log("Bye ... ");
};

main();
