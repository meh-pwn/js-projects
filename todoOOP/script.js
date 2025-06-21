class LocalStorage {
    #keyItem;

    constructor(keyItem) {
        this.#keyItem = keyItem;
    }

    get() {
        return JSON.parse(localStorage.getItem(this.#keyItem)) || [];
    }

    set(todosList) {
        localStorage.setItem(this.#keyItem, JSON.stringify(todosList));
    }
}

class DOM {
    query(selector) {
        return document.querySelector(selector);
    }

    create(elementType, text, className, id) {
        const item = document.createElement(elementType);
        item.textContent = text;
        item.classList.add(className);
        item.dataset.id = id;

        return item;
    }
}

class Item {
    constructor(id, text) {
        this.id = id;
        this.text = text;
    }
}

class TodoItem extends Item {
    constructor(id, text, completed=false) {
        super(id, text);
        this.completed = completed;
    }
}

class TodoApp {
    constructor() {
        this.dom = new DOM(); 
        this.ls = new LocalStorage("todos");
        this.todoInput = this.dom.query("[data-add-todo]");
        this.todoContainer = this.dom.query("[data-todo-container]");

        this.todoList = this.ls.get();
        this.bindEvents();
        this.render();
    }

    addTodo(text) {
        const newTodo = new TodoItem(Date.now(), text);
        this.todoList.push(newTodo);
        this.ls.set(this.todoList);
        this.render();
    }

    removeTodo(id) {
        this.todoList = this.todoList.filter(todo => todo.id !== id);
        this.ls.set(this.todoList);
        this.render();
    }

    toggleItem(id) {
        const todo = this.todoList.find(todo => todo.id === id);
        if (todo) {
            todo.completed = !todo.completed;
            this.ls.set(this.todoList);
            this.render();
        }
    }

    bindEvents() {
        this.todoInput.addEventListener("keypress", (e) => {
            if(this.todoInput.value.trim() && e.key === "Enter") {
                this.addTodo(this.todoInput.value.trim());
                this.todoInput.value = "";
            }
        })

        this.todoContainer.addEventListener("click", (e) => {
            const et = e.target;
            if (et.classList.contains("remove-btn")) {
                const id = Number(et.dataset.id);
                this.removeTodo(id);
            } else if (et.classList.contains("todo-item")) {
                const id = Number(et.dataset.id);
                this.toggleItem(id);
            }
        })
    }

    render() {
        this.todoContainer.innerHTML = "";
        this.todoList.forEach(todo => {
        const todoItem = this.dom.create("div", todo.text, "todo-item", todo.id);
        if (todo.completed) {
            todoItem.classList.add("completed");
        }
        
        const removeBtn = this.dom.create("button", "x", "remove-btn", todo.id);
        removeBtn.disabled = !todo.completed;

        todoItem.appendChild(removeBtn);
        this.todoContainer.appendChild(todoItem);
        })
    }
}

new TodoApp();