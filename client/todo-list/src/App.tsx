import { useEffect, useState } from "react";
import "./App.css";
// components
import { TodoList } from "./components/TodoList";
import { AddTodoForm } from "./components/AddTodoForm";
import { EditModal } from "./components/EditModal";

interface todo {
  id: number;
  todo: string;
}

function App() {
  const [todoList, setTodoList] = useState<todo[]>([]);
  const [isEditting, setIsEditting] = useState(false);
  const [currentEdit, setCurrentEdit] = useState({
    id: 0,
    todo: "",
  });

  useEffect(() => {
    fetch(`http://localhost:8000/todolist`)
      .then((res) => res.json())
      .then((res) => setTodoList(res.data))
      .catch((error) => console.log(error));
  }, []);

  const addTodo = (todo: object) => {
    // update database
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

  const deleteTodo = (todo: todo) => {
    const originalTodoList = [...todoList];
    // optimistic update
    setTodoList((prevTodoList) =>
      prevTodoList.filter((eachTodo) => eachTodo.id !== todo.id)
    );
    // update database
    fetch(`http://localhost:8000/todolist/${todo.id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error();
      })
      .then((res) => console.log(res.message))
      .catch((error) => {
        console.log(error);
        setTodoList(originalTodoList);
      });
  };

  const showModal = (todo: todo) => {
    setIsEditting(true);
    setCurrentEdit({
      id: todo.id,
      todo: todo.todo,
    });
  };

  const closeModal = () => {
    setIsEditting(false);
  };

  const editTodo = (todoId: number, edittedTodo: string) => {
    const originalTodoList = [...todoList];
    // optimistic update
    setTodoList(
      todoList.map((eachTodo) => {
        return eachTodo.id !== todoId
          ? eachTodo
          : { ...eachTodo, todo: edittedTodo };
      })
    );
    // update database
    fetch(`http://localhost:8000/todolist/${todoId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        todo: edittedTodo,
      }),
    })
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error();
      })
      .then((res) => console.log(res.message))
      .catch((error) => {
        console.log(error);
        setTodoList(originalTodoList);
      });
    setIsEditting(false);
  };

  return (
    <div className="app container">
      <AddTodoForm addTodo={addTodo} />
      <TodoList
        todoList={todoList}
        deleteTodo={deleteTodo}
        showModal={showModal}
      />
      {isEditting && (
        <EditModal
          todoId={currentEdit.id}
          value={currentEdit.todo}
          editTodo={editTodo}
          closeModal={closeModal}
        />
      )}
    </div>
  );
}

export default App;
