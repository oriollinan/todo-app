"use client";
import React, { useEffect, useState } from "react";
import { FiTrash2, FiEdit } from "react-icons/fi";
import jwt, { JwtPayload } from "jsonwebtoken";

interface Todo {
  id: string;
  title: string;
  description: string;
  created_at: Date;
  due_time: Date;
  user_id: number;
  status: string;
}

const page = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState<string>("");
  const token = localStorage.getItem("token");

  const fetchData = async () => {
    if (!token) {
      return;
    }
    const options: RequestInit = {
      method: "GET",
      headers: new Headers({
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      }),
    };
    try {
      const response: Response = await fetch(
        "http://localhost:3000/user/todos",
        options
      );
      const data: any = await response.json();
      if (!response.ok) {
        throw new Error(
          `Request failed with status ${response.status} ${data.msg}`
        );
      }
      setTodos(data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const addTodo = async (
    e:
      | React.MouseEvent<HTMLButtonElement>
      | React.KeyboardEvent<HTMLInputElement>
  ) => {
    e.preventDefault();
    if (!token || !title || title.length < 1) {
      return;
    }
    const decodedToken: any = jwt.decode(token);
    if (!decodedToken) {
      return;
    }
    const id: number = decodedToken.user_id;
    const options: RequestInit = {
      method: "POST",
      headers: new Headers({
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      }),
      body: JSON.stringify({
        title: title,
        description: "description",
        due_time: "2100-03-06 19:24:00",
        user_id: id,
        status: "todo",
      }),
    };
    try {
      const response: Response = await fetch(
        "http://localhost:3000/todo",
        options
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(
          `Request failed with status ${response.status} ${data.msg}`
        );
      }
      setTitle("");
      fetchData();
    } catch (e) {
      console.error(e);
    }
  };

  const deleteTodo = async (id: string) => {
    if (!token) {
      return;
    }

    const options: RequestInit = {
      method: "DELETE",
      headers: new Headers({
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      }),
    };

    try {
      const response: Response = await fetch(
        `http://localhost:3000/todo/${id}`,
        options
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(
          `Request failed with status ${response.status} ${data.msg}`
        );
      }
      fetchData();
    } catch (e) {
      console.error(e);
    }
  };

  const onEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      addTodo(e);
    }
  };

  const displayTodos = () => {
    if (!todos || todos.length < 1) {
      return <h1 className="text-4xl font-bold my-4">You Have No Todo's</h1>;
    }
    return todos.map((todo) => {
      return (
        <div
          key={todo.id}
          className="flex flex-row justify-between max-w-fit bg-indigo-400 text-white p-2 rounded-md my-2"
        >
          <div>
            <h1 className="text-4xl mr-16">{todo.title}</h1>
          </div>
          <button
            onClick={() => deleteTodo(todo.id)}
            className="text-white focus:outline-none"
          >
            <FiTrash2 size={24} className="mr-2" />
          </button>
        </div>
      );
    });
  };

  return (
    <div className="h-screen flex flex-col items-center px-6 py-6">
      {displayTodos()}
      <div className="mt-4 flex flex-col items-center">
        <input
          type="title"
          id="title"
          placeholder="Title"
          value={title}
          onKeyDown={onEnter}
          onChange={(e) => setTitle(e.target.value)}
          className="form-input w-full text-gray-800 my-4"
        />
        <button
          id="add"
          onClick={addTodo}
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none"
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default page;
