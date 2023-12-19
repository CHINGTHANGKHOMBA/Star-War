import { useState } from "react";

export default function App() {

const [list, setList] = useState([]);

  function onSubmit(text){
list.push({
  text: text,

});

setList([...list]);
  }


  return (
    <div className="container">
      <h1>Todo List</h1>
      <TaskForm onSubmit={onSubmit}/>

<ul className="Task-list">
{list.map((l, idx) =>{
  return(
    <TaskItem
    key={idx}
    text={l.text}
completed={l.completed}
onCompleted={completed =>{
  list[idx].completed = completed;

  setList([...list])
}}


   
onDelet={() =>{
  setList(list.filter((_, i) => i !== idx));
}}

    />
  )
})}

</ul>
    </div>
  );
}

function TaskForm(props) {
  const [text, setText] = useState('');
  return (
    <form
      className="task-form"
      onSubmit={(e) => {
        e.preventDefault();
        props.onSubmit(text);
        setText("");
      }}
    >
      <input
        type="text"
        id="task-text"
        value={text}
        placeholder="Add a new task"
        onChange={e=>{
          setText(e.target.value);
        }}
      />
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
  );
}

function TaskItem(props){
return(


  <li
  className={`task-item ${props.completed === true? 'checked' : ''}`} >
    <input
    type="checkbox"
    />
    <span> {props.text} </span>
    <button 
    className="del"
    onClick={() =>{
      props.onDelet();
    }}
    >
X
    </button>
  </li>
)
}
