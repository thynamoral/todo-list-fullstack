import { useRef, useState } from "react";

interface EditModalProps {
  value: string;
  todoId: number;
  editTodo: (todoId: number, edittedTodo: string) => void;
  closeModal: () => void;
}
const EditModal = ({ todoId, value, editTodo, closeModal }: EditModalProps) => {
  const [todoValue, setTodoValue] = useState(value);
  const modalContainer = useRef(null);

  return (
    <div
      className="edit-modal"
      onClick={(e) => {
        if (e.target === modalContainer.current) {
          closeModal();
        }
      }}
      ref={modalContainer}
    >
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
