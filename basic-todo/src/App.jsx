import React, { useState, useEffect } from "react";
// React-icons
import { AiOutlinePlus } from "react-icons/ai";
import Todo from "./components/Todo";
// Firebase imports
import { db } from "./firebase";
import {
  collection,
  query,
  onSnapshot,
  updateDoc,
  doc,
  addDoc,
  deleteDoc,
} from "firebase/firestore";

// Tailwind CSS styles as Javascript objects
const style = {
  bg: `h-screen w-screen p-4 bg-gradient-to-r from-[#2F80Ed] to-[#1CB5E0]`,
  container: `bg-slate-100 max-w-[500px] w-full m-auto rounded-md shadow-xl p-4`,
  heading: `text-3xl font-bold text-center text-gray-800 p-2`,
  form: `flex justify-between`,
  input: `border-1 p-2 border-gray-300 w-full text-xl rounded-md`,
  button: `border-0 p-4 ml-2 sm:mt-0 bg-purple-500 text-slate-100 rounded-md cursor-pointer`,
  count: `text-center p-2`,
};

// 1. starting with hardcoded todos before integrating firebase

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  // Create todo (async that passes on an event "e")
  const createTodo = async (e) => {
    e.preventDefault();
    if (input === "") {
      alert("Please enter a valid todo");
      return;
    }
    await addDoc(collection(db, "todos"), {
      text: input,
      completed: false,
    });
    setInput(""); // Clear input field after adding todo
  };

  // Read todo from
  useEffect(() => {
    const q = query(collection(db, "todos"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let todosArr = [];
      // takes snapshot of database to firebase
      querySnapshot.forEach((doc) => {
        todosArr.push({ ...doc.data(), id: doc.id });
      });
      setTodos(todosArr);
    });
    return () => unsubscribe();
  }, []);

  // Update todo in firebase
  const toggleComplete = async (todo) => {
    await updateDoc(doc(db, "todos", todo.id), {
      completed: !todo.completed,
    });
  };

  // Delete todo
  const deleteTodo = async (id) => {
    await deleteDoc(doc(db, "todos", id));
  };

  return (
    <>
      <div className={style.bg}>
        <div className={style.container}>
          <h3 className={style.heading}>Farminder!</h3>
          <form onSubmit={createTodo} className={style.form}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className={style.input}
              type="text"
              placeholder="Add Todo"
            />
            <button className={style.button}>
              <AiOutlinePlus size={30}></AiOutlinePlus>
            </button>
          </form>
          <ul>
            {/* map on arrays */}
            {todos.map((todo, index) => (
              // passing state to the components
              <Todo
                key={index}
                todo={todo}
                toggleComplete={toggleComplete}
                deleteTodo={deleteTodo}
              />
            ))}
          </ul>
          {todos.lenght < 1 ? null : (
            <p className={style.count}>{`You have ${todos.length} todos`}</p>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
