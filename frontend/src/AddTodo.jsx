import { useState } from "react";


function AddTodo({onAdd}){
    const[title,setTitle] = useState("");


const handleClick = ()=> {
    if(title.trim() === "")return;
    // const newTodos = {
    //     id:Date.now(),
    //     title:title,

    // };
    onAdd(title)
    setTitle("");
};

return(
    <div className="Data">
        <h1>Todo App</h1>
        <input className="Data" type="text" 
        placeholder="Enter a Todo"
         value={title} 
         onChange={(e) =>setTitle(e.target.value)}
         />

        <button className="btn-add" onClick={handleClick}>Add Todo</button>
    </div>
);
}


export default AddTodo;