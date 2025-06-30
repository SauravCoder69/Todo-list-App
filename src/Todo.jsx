import React, { useState } from "react";

function Todo({ todos = [], onDelete, onEdit }) {
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");

  return (
    <div className="Button">
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {editId === todo.id ? (
              <>
                <input
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />

                <button className = "Button-Save"

                  onClick={() => {
                    onEdit(editId ,editText);
                    setEditId(null);
                    setEditText("");
                  
                  }}
                >
                  Save
                </button>

                <button className = "Button-Cancel"
                  onClick={() => {
                    setEditId(null);
                    setEditText("");
                  }}
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                {todo.title}
                <button className = "Button-Edit"
                  onClick={() => {
                    setEditId(todo.id);
                    setEditText(todo.title);
                  }}
                >
                  Edit
                </button>
                <button className="Button-delete" onClick={() => onDelete(todo.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export { Todo };


