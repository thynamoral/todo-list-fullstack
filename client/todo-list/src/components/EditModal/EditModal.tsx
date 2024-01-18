import { useState } from "react";

interface EditModalProps {
  value: string;
  todoId: number;
  editTodo: (todoId: number, edittedTodo: string) => void;
}
const EditModal = ({ todoId, value, editTodo }: EditModalProps) => {
  const [todoValue, setTodoValue] = useState(value);
  return (
    <div className="edit-modal">
      <form>
        <label className="form-label" htmlFor="update-todo">
          Update Todo
        </label>
        <hr />
        <div className="update-todo-form d-flex gap-2">
          <input
            id="update-todo"
            className="form-control"
            type="text"
            placeholder="Add new todo now..."
            value={todoValue}
            onChange={(e) => setTodoValue(e.target.value)}
            required
          />
          <button
            className="btn btn-primary"
            type="submit"
            onClick={() => editTodo(todoId, todoValue)}
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditModal;
