import { FormEvent, useState } from "react";

interface todo {
  id?: number;
  todo: string;
}

interface AddTodoForm {
  addTodo: (todo: todo) => void;
}

const AddTodoForm = ({ addTodo }: AddTodoForm) => {
  const [todoValue, setTodoValue] = useState("");
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    addTodo({
      todo: todoValue,
    });
    setTodoValue("");
    console.log(`submitted!`);
  };
  return (
    <form className="mb-3" onSubmit={handleSubmit}>
      <label className="form-label" htmlFor="add-todo">
        Add Todo
      </label>
      <div className="add-todo-form d-flex gap-2">
        <input
          id="add-todo"
          className="form-control"
          type="text"
          placeholder="Add new todo now..."
          value={todoValue}
          onChange={(e) => setTodoValue(e.target.value)}
          required
        />
        <button className="btn btn-primary" type="submit">
          Add
        </button>
      </div>
    </form>
  );
};

export default AddTodoForm;
