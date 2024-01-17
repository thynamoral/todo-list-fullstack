interface todo {
  id: number;
  todo: string;
}

interface TodoListProps {
  todoList: todo[] | null;
}

const TodoList = ({ todoList }: TodoListProps) => {
  return (
    <ul className="todo-list list-group ">
      {todoList?.map((todo) => (
        <li
          key={todo.id}
          className="todo list-group-item d-flex align-items-center gap-2"
        >
          <span className="me-auto">{todo.todo}</span>
          <button type="button" className="btn btn-outline-success">
            Edit
          </button>
          <button type="button" className="btn btn-outline-danger">
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
