import "./style.css";

const ul = document.querySelector('ul');
const form = document.querySelector('form');
const input = document.querySelector('input');

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

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const value = input.value;
  input.value = "";
  addTodo(value);
});

const displayTodo = () => {
  const todoNode = todos.map((todo, index) => {
    return createTodoElement(todo, index);
  });
  ul.innerHTML = "";
  ul.append(...todoNode);
};

const createTodoElement = (todo, index) => {
  const li = document.createElement('li');
  const deleteButton = document.createElement('button');
  deleteButton.innerHTML = "Supprimer";

  deleteButton.addEventListener("click", event => {
    event.stopPropagation();
    deleteTodo(index);
  });

  li.innerHTML = `
    <span class="todo${ todo.done ? " done" : ""}"></span>
    <p>${ todo.text }</p>
  `;
  li.appendChild(deleteButton);

  li.addEventListener("click", event => {
    toggleTodo(index);
  });
  
  return li;
};


const addTodo = (text) => {
  todos.push(
    {
      text,
      done: false
    }
  );
  displayTodo();
};

const deleteTodo = (index) => {
  todos.splice(index, 1);
  displayTodo();
};

const toggleTodo = (index) => {
  todos[index].done = !todos[index].done;
  displayTodo();
};

displayTodo();