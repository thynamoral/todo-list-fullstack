interface todo {
  id: number;
  todo: string;
}

interface TodoListProps {
  todoList: todo[] | null;
  deleteTodo: (todo: todo) => void;
  editingtTodo: (todo: todo) => void;
}

const TodoList = ({ todoList, deleteTodo, editingtTodo }: TodoListProps) => {
  return (
    <ul className="todo-list list-group ">
      {todoList?.map((todo) => (
        <li
          key={todo.id}
          className="todo list-group-item d-flex align-items-center gap-2"
        >
          <span className="me-auto">{todo.todo}</span>
          <button
            type="button"
            className="btn btn-outline-success"
            onClick={() => editingtTodo(todo)}
          >
            Edit
          </button>
          <button
            type="button"
            className="btn btn-outline-danger"
            onClick={() => deleteTodo(todo)}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
