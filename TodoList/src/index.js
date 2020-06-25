import "./style.css";

const ul = document.querySelector('ul');
const todos = [
  {
    text: "Je suis une todo",
    done: true
  },
  {
    text: "Je suis une autre todo",
    done: false
  }
];

const displayTodo = (todo, index) => {
  const todoNode = todos.map((todo, index) => {
    return createTodoElement(todo, index);
  });
  ul.innerHTML = "";
  ul.append(...todoNode);
};

const createTodoElement = (todo, index) => {
  const li = document.createElement('li');
  li.innerHTML = `
    <span class="todo${ todo.done ? " done" : ""}"></span>
    <p>${ todo.text }</p>
    <button>Supprimer</button>
  `;
  return li;
};
displayTodo();

