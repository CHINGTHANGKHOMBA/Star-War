import React from "react";
import ReactDOM from "react-dom/client";
import Todo from "./todo";
import Todolist from "./todolist.jsx";
import App from "./App.jsx";
import "./main.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Todo />
    <Todolist />
    <App />
  </React.StrictMode>
);
