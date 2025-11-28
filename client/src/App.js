import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState("");

  // 🔹 Fetch todos from backend (Express + Postgres)
  useEffect(() => {
    fetch("https://todoappwithpostgressql.onrender.com/todos")
      .then((res) => res.json())
      .then((data) => setTodos(data))
      .catch((err) => console.error(err));
  }, []);

  // 🔹 Add new todo
  const addTodo = async () => {
    if (task.trim() === "") return;

    const newTodo = { title: task };

    const res = await fetch("https://todoappwithpostgressql.onrender.com/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTodo),
    });

    const savedTodo = await res.json();
    setTodos([...todos, savedTodo]);
    setTask("");
  };

  // 🔹 Delete todo
  const deleteTodo = async (id) => {
    await fetch(`https://todoappwithpostgressql.onrender.com/todos/${id}`, {
      method: "DELETE",
    });

    setTodos(todos.filter((t) => t.id !== id));
  };

  return (
    <div className="App">
      <h1 className="title">To-Do App</h1>

      <div className="todo-input-box">
        <input
          type="text"
          className="todo-input"
          placeholder="Enter a task..."
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button className="add-btn" onClick={addTodo}>
          Add
        </button>
      </div>

      <ul className="todo-list">
        {todos.map((todo) => (
          <li key={todo.id} className="todo-item">
            <span>{todo.title}</span>
            <button
              className="delete-btn"
              onClick={() => deleteTodo(todo.id)}
            >
              ✕
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
