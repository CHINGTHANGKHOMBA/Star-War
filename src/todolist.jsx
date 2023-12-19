import { useState } from "react";
import ListItem from './components/ListItem';
export default function Todolist() {
  const [todo, setTodo] = useState("");
  const [todoList, setTodoList] = useState([]);
  const handleChange = (event) => {
    setTodo(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let tempList = todoList;
    tempList.push(todo);
    setTodoList(tempList);
    setTodo("");
  };
  return (
    <div>
      <h1>Another Todo List </h1>
      <form onSubmit={handleSubmit}>
        <input value={todo} onChange={handleChange} type-="text" placeholder="New task"></input>
        <button type="submit" id="task-submit">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          viewBox="0 -960 960 960"
          width="24"
          fill="red"
        >
          <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
        </svg>
      </button>
      </form>

      {todoList.map((Items) => (
        <ListItem key={Items} name={Items} >List Items</ListItem>
      ))}
    </div>
  );
}
