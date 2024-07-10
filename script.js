"use strict";
const addForm = document.querySelector(".add");
const list = document.querySelector(".todos");
const search = document.querySelector(".search input");

// Generate template for adding todo
const generateTemplate = (todo) => {
  const html = `
	<li
	class="list-group-item d-flex justify-content-between align-items-center"
>
	<span>${todo}</span>
	<ion-icon name="trash-outline" class="delete"></ion-icon>
</li>
	`;
  list.innerHTML += html;
};

// add todos
const add = () => {
  const todo = addForm.add.value.trim();
  if (todo.length) {
    generateTemplate(todo);

    updateLS();
    addForm.reset();
  }
};
addForm.addEventListener("submit", (e) => {
  e.preventDefault();
  add();
});
// checked for competed
const lispan = Array.from(list.children);
console.log(lispan);

lispan.addEventListener("click", () => {
  lispan.classList.toggle("completed");
  updateLS();
});
// / checking for local storage
const todos = JSON.parse(localStorage.getItem("todos"));

if (todos) {
  todos.forEach((todo) => generateTemplate(todo.text));
}

// delete todos
list.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    e.target.parentElement.remove();
    updateLS();
  }
});

// search todos
const filterTodos = (term) => {
  Array.from(list.children)
    .filter((todo) => !todo.textContent.toLowerCase().includes(term))
    .forEach((todo) => todo.classList.add("filtered"));
  Array.from(list.children)
    .filter((todo) => todo.textContent.toLowerCase().includes(term))
    .forEach((todo) => todo.classList.remove("filtered"));
};
// keyup event
search.addEventListener("keyup", () => {
  const term = search.value.trim().toLowerCase();
  filterTodos(term);
  updateLS();
});

// function to update the local storage
function updateLS() {
  const todosEl = document.querySelectorAll("li");
  const todos = [];
  todosEl.forEach((todoEl) => {
    todos.push({
      text: todoEl.innerText,
      completed: todoEl.classList.contains("completed"),
    });
  });
  localStorage.setItem("todos", JSON.stringify(todos));
}
