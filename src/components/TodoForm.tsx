import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  useGetTodosQuery,
  useAddTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} from "../services/api";

interface FormValues {
  _id?: number;
  text: string;
  photoUrl: string;
}

const TodoApp: React.FC = () => {
  const { data: todos, error, isLoading } = useGetTodosQuery();
  const [addTodo] = useAddTodoMutation();
  const [updateTodo] = useUpdateTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();
  const { register, handleSubmit, setValue, reset } = useForm<FormValues>();
  const [editingTodo, setEditingTodo] = useState<number | null>(null);
  const onSubmit = async (data: FormValues) => {
    if (editingTodo !== null) {
      await updateTodo({
        _id: editingTodo,
        text: data.text,
        photoUrl: data.photoUrl,
        completed: false,
      });
      setEditingTodo(null);
    } else {
      await addTodo(data);
    }
    reset();
  };

  const handleEdit = (todo: FormValues) => {
    setEditingTodo(todo._id || null);
    setValue("text", todo.text);
    setValue("photoUrl", todo.photoUrl);
  };

  const handleDelete = async (id: number) => {
    await deleteTodo(id);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error occurred: {error.toString()}</div>;
  return (
    <div
      style={{
        padding: "20px",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          marginBottom: "5px",
        }}
      >
        Todo List
      </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("text")}
          placeholder="Add a new task"
          style={{
            padding: "7px",
            marginRight: "70px",
            marginBottom: "5px",
          }}
        />
        <input
          {...register("photoUrl")}
          placeholder="Add photo URL"
          style={{
            padding: "7px",
          }}
        />
        <button
          type="submit"
          style={{
            background: "green",
            color: "#fff",
            padding: "10px 20px",
            border: "none",
            marginLeft: "5px",
          }}
        >
          {editingTodo !== null ? "Save" : "Add"}
        </button>
      </form>
      <ul>
        {todos?.map((todo) => (
          <div key={todo._id}>
            <h2>{todo.text}</h2>
            <img
              style={{
                maxWidth: "200px",
                marginTop: "5px",
              }}
              src={todo.photoUrl}
              alt={todo.text}
            />
            <div className="btn-wrapper">
              <button
                onClick={() => handleDelete(todo._id)}
                style={{
                  background: "red",
                  color: "#fff",
                  border: "none",
                  padding: "5px",
                  margin: "10px 10px",
                }}
              >
                Delete
              </button>
              <button
                style={{
                  background: "purple",
                  color: "#fff",
                  border: "none",
                  padding: "5px",
                  marginRight: "10px",
                }}
                onClick={() => handleEdit(todo)}
              >
                Edit
              </button>
            </div>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;
