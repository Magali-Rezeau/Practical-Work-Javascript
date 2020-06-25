import "./style.css";

const ul = document.querySelector('ul');
const form = document.querySelector('form');
const input = document.querySelector('input');

const todos = [
  {
    text: "Je suis une todo",
    done: false,
    editMode: true
  },
  {
    text: "Je suis une autre todo",
    done: true,
    editMode: false
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
    console.log(todo.editMode);
    if(todo.editMode) {
      return createTodoEditElement(todo, index);
    }else {
      return createTodoElement(todo, index);
      console.log(todo);
    }
  });
  ul.innerHTML = "";
  ul.append(...todoNode);
};

const createTodoElement = (todo, index) => {
  const li = document.createElement('li');
  const deleteButton = document.createElement('button');
  const editButton = document.createElement('button');
  deleteButton.innerHTML = "Supprimer";
  editButton.innerHTML = "Editer";

  deleteButton.addEventListener("click", event => {
    event.stopPropagation();
    deleteTodo(index);
  });
  editButton.addEventListener("click", event => {
    event.stopPropagation();
    toggleEditMode(index);
  });

  li.innerHTML = `
    <span class="todo${ todo.done ? " done" : ""}"></span>
    <p>${ todo.text }</p>
  `;
  li.append(deleteButton, editButton);

  li.addEventListener("click", event => {
    toggleTodo(index);
  });

  return li;
};

const createTodoEditElement = (todo, index) => {
  const li = document.createElement('li');
  const input = document.createElement('input');
  input.type = "text";
  input.value = todo.text;
  const saveButton = document.createElement('button');
  saveButton.innerHTML = "Save";
  const cancelButton = document.createElement('button');
  cancelButton.innerHTML = "Cancel";

  saveButton.addEventListener("click", event => {
    event.stopPropagation();
    editTodo(index, input);
  });

  cancelButton.addEventListener("click", event => {
    event.stopPropagation();
    toggleEditMode(index);
  });

  li.append(input, saveButton, cancelButton);

  return li;
};

const addTodo = text => {
  todos.push(
    {
      text,
      done: false
    }
  );
  displayTodo();
};

const deleteTodo = index => {
  todos.splice(index, 1);
  displayTodo();
};

const toggleTodo = index => {
  todos[index].done = !todos[index].done;
  displayTodo();
};

const editTodo = (index, input) => {
  const value = input.value;
  todos[index].text = value;
  todos[index].editMode = !todos[index].editMode;
  displayTodo();
};

const toggleEditMode = index => {
  todos[index].editMode = !todos[index].editMode;
  displayTodo();
}

displayTodo();