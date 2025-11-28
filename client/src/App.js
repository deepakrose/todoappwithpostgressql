import { useEffect, useState } from "react";
import axios from "axios";

const API = "https://todoappwithpostgressql.onrender.com";

function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");

  const loadTodos = async () => {
    const res = await axios.get(`${API}/todos`);
    setTodos(res.data);
  };

  const addTodo = async () => {
    await axios.post(`${API}/todos`, { text });
    setText("");
    loadTodos();
  };

  const deleteTodo = async (id) => {
    await axios.delete(`${API}/todos/${id}`);
    loadTodos();
  };

  useEffect(() => {
    loadTodos();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Todo App</h1>
      <input value={text} onChange={(e) => setText(e.target.value)} />
      <button onClick={addTodo}>Add</button>

      {todos.map((t) => (
        <div key={t.id}>
          {t.text}
          <button onClick={() => deleteTodo(t.id)}>X</button>
        </div>
      ))}
    </div>
  );
}

export default App;
