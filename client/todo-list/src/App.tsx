import { useEffect, useState } from "react";
import "./App.css";
import { TodoList } from "./components/TodoList";
import { AddTodoForm } from "./components/AddTodoForm";

interface todo {
  id: number;
  todo: string;
}

function App() {
  const [todoList, setTodoList] = useState<todo[]>([]);

  useEffect(() => {
    fetch(`http://localhost:8000/todolist`)
      .then((res) => res.json())
      .then((res) => setTodoList(res.data))
      .catch((error) => console.log(error));
  }, []);

  const addTodo = (todo: object) => {
    fetch(`http://localhost:8000/todolist`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error();
        }
      })
      .then((res) => {
        // update todoList state
        setTodoList((prevTodoList) => [...prevTodoList, res.data]);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="app container">
      <AddTodoForm addTodo={addTodo} />
      <TodoList todoList={todoList} />
    </div>
  );
}

export default App;
