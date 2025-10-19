import React, { useEffect, useState } from 'react';
import { Todo } from './Todo'
import AddTodo from './AddTodo';
import "./App.css"

function App() {
  
 
  const[todos,setTodos] = useState([]);


            useEffect(() => {
              console.log(todos);
            },[todos]);
          

  // FETCH API READ DATA


 useEffect(() => {
    fetch("http://localhost:5000/api/todos")
      .then((res) => res.json())
      .then((data) => setTodos(data))
      .catch((err) => console.error("Fetch todos failed:", err));
  }, []);



  //add todos
  const handleAddTodos = (title) => {
    console.log(title);
    fetch("http://localhost:5000/api/todos"  , {
      method:"POST",
      headers:{
      "Content-Type":"application/json"
    },
    body: JSON.stringify({title})
    })
    .then((res) => res.json())
    .then((data) => {
        const newTodo = { ...data, id: data._id };
    setTodos(prevTodos => [...prevTodos, newTodo]);  
     
  });
}


//Delete todo
  const handleDeleteTodo = (id) => {
    console.log("Todo Deleted")
    fetch (`http://localhost:5000/api/todos/${id}`,{
      method:"DELETE",
    });
    const updatedTodos = todos.filter((todo) =>
    todo.id!==id);
    setTodos(updatedTodos);
  console.log(updatedTodos);
  };
//EDIT 

const handleEditTodo = (id, newTitle) => {
  console.log("Edit called with:", id, newTitle);

  fetch(`http://localhost:5000/api/todos/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title: newTitle }),
  })
    .then(res => res.json())
    .then(updatedTodo => {
      const updatedTodos = todos.map(todo =>
        todo.id === id ? { ...todo, title: updatedTodo.title } : todo
      );
      setTodos(updatedTodos);
      console.log("Updated todos:", updatedTodos);
    })
    
};



return (
  <div >
      {/* //props pass */}


    <AddTodo onAdd={handleAddTodos}/>
    <Todo todos ={todos}
    onDelete={handleDeleteTodo}
    onEdit={handleEditTodo}

    />
   
    
     </div>


);
}

export default App;
