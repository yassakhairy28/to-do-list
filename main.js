let container = document.querySelector(".container")
let input = document.querySelector("input");
let btnadd = document.getElementById("add");
let output = document.querySelector(".output");

let tasks;
if (JSON.parse(localStorage.getItem("tasks"))) {
  tasks = JSON.parse(localStorage.getItem("tasks"))
} else {
  tasks = [];
}

function toArray (text) {
  const task = {
    id: Date.now(),
    title: text,
    completed: false
  }
  tasks.push(task)
  toBage(tasks)
  toStorage (tasks)
}
function toBage (tasks) {

  output.innerHTML = ""

  tasks.forEach((task) => {
    let div = document.createElement("div");
    div.setAttribute("id",task.id)
    let span = document.createElement("span");
    span.append(document.createTextNode(task.title))
    div.append(span)

    let del = document.createElement("button")
    del.className = "del"
    del.append(document.createTextNode("Delete"))
    div.append(del)
    
    output.appendChild(div)

    div.onclick = function () {
      div.classList.toggle("end")
    }
  })
} 

btnadd.onclick = function () {
  if (input.value != "") {
    toArray (input.value)
    input.value = ""
  }
}

function toStorage (tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks))
}

function fromStorage () {
  let data = localStorage.getItem("tasks")
  if (data) {
    let tasks = JSON.parse(data)
    toBage (tasks)
  }
}
fromStorage ()

output.addEventListener("click" , (e) => {
  if (e.target.classList.contains("del")) {
    e.target.parentElement.remove()
    del (e.target.parentElement.getAttribute("id"))
    localStorage.setItem("tasks", JSON.stringify(tasks))
  }
})

function del (id) {
  tasks = tasks.filter((task) => task.id != id)
}

function delAll () {
  if (tasks.length > 1) {
    let btn = document.createElement("button")
    btn.append(document.createTextNode("Remove All"))
    btn.className = "delAll"
    container.append(btn)

    btn.onclick = () => {
      localStorage.clear()
      tasks.slice(0)
      location.reload()
    }
  }
}
delAll ()