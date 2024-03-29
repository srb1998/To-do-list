var addButton = document.getElementById("addButton");
var addInput = document.getElementById("itemInput");
var todoList = document.getElementById("todoList");
var listArray = [];

//addToList function
function listItemObj(content, status) {
  this.content = "";
  this.status = "incomplete";
}
var changeToComp = function () {
  var parent = this.parentElement;
  parent.className = "uncompleted well";
  this.innerText = "\u2713";
  this.removeEventListener("click", changeToComp);
  this.addEventListener("click", changeToInComp);
};

var changeToInComp = function () {
  var parent = this.parentElement;
  parent.className = "completed well";
  this.innerText = "\u2713";
  this.removeEventListener("click", changeToInComp);
  this.addEventListener("click", changeToComp);
};

var removeItem = function () {
  var parent = this.parentElement.parentElement;
  parent.removeChild(this.parentElement);

  var data = this.parentElement.firstChild.innerText;
  for (var i = 0; i < listArray.length; i++) {
    if (listArray[i].content == data) {
      listArray.splice(i, 1);
      refreshLocal();
      break;
    }
  }
};

var createItemDom = function (text, status) {
  var listItem = document.createElement("li");

  var itemLabel = document.createElement("label");

  var itemCompBtn = document.createElement("button");

  var itemIncompBtn = document.createElement("button");

  listItem.className =
    status == "incomplete" ? "completed well" : "uncompleted well";

  itemLabel.innerText = text;
  itemCompBtn.className = "btn btn-success";
  itemCompBtn.innerText = status == "\u2713" ? "\u2713" : "\u2713";
  if (status == "incomplete") {
    itemCompBtn.addEventListener("click", changeToComp);
  } else {
    itemCompBtn.addEventListener("click", changeToInComp);
  }

  itemIncompBtn.className = "btn btn-danger";
  itemIncompBtn.innerText = "\u00D7";
  itemIncompBtn.addEventListener("click", removeItem);

  listItem.appendChild(itemLabel);
  listItem.appendChild(itemCompBtn);
  listItem.appendChild(itemIncompBtn);

  return listItem;
};

var refreshLocal = function () {
  var todos = listArray;
  localStorage.removeItem("todoList");
  localStorage.setItem("todoList", JSON.stringify(todos));
};

var addToList = function () {
  var newItem = new listItemObj();
  newItem.content = addInput.value;
  listArray.push(newItem);

  refreshLocal();

  var item = createItemDom(addInput.value, "incomplete");
  todoList.appendChild(item);
  addInput.value = "";
};

//function to clear todo list array
var clearList = function () {
  listArray = [];
  localStorage.removeItem("todoList");
  todoList.innerHTML = "";
};

window.onload = function () {
  var list = localStorage.getItem("todoList");

  if (list != null) {
    todos = JSON.parse(list);
    listArray = todos;

    for (var i = 0; i < listArray.length; i++) {
      var data = listArray[i].content;

      var item = createItemDom(data, listArray[i].status);
      todoList.appendChild(item);
    }
  }
};
//add an event binder to the button
addButton.addEventListener("click", addToList);
clearButton.addEventListener("click", clearList);
