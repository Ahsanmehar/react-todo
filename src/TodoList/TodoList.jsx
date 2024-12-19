import { useState } from "react";
import "./TodoList.css";
import { v4 as uuidv4 } from "uuid";

function TodoList() {
  let [todo, setTodo] = useState([
    { task: "Sample Todo", id: uuidv4(), isDone: false },
  ]);
  let [newTodo, setNewTodo] = useState("");
  let [error, setError] = useState(false);

  function handleClick() {
    if (newTodo.trim()) {
      setTodo((preval) => {
        return [...preval, { task: newTodo, id: uuidv4(), isDone: false }];
      });
      setError(false);
      setNewTodo("");
    } else {
      setError(true);
    }
  }

  function handleNew(e) {
    setNewTodo(e.target.value);
  }

  function handleDel(id) {
    setTodo((preval) => {
      return preval.filter((del) => {
        return del.id != id;
      });
    });
  }

  function handleUppercase(id) {
    setTodo((preval) => {
      return preval.map((upper) => {
        if (upper.id == id) {
          return {
            ...upper,
            task: upper.task.toUpperCase(),
          };
        } else {
          return upper;
        }
      });
    });
  }

  function handleLowercase(id) {
    setTodo((preval) => {
      return preval.map((lower) => {
        if (lower.id == id) {
          return {
            ...lower,
            task: lower.task.toLowerCase(),
          };
        } else {
          return lower;
        }
      });
    });
  }

  function handleAllUppercase() {
    setTodo((preval) => {
      return preval.map((allupper) => {
        return {
          ...allupper,
          task: allupper.task.toUpperCase(),
        };
      });
    });
  }

  function handleAllLowercase() {
    setTodo((preval) => {
      return preval.map((alllower) => {
        return {
          ...alllower,
          task: alllower.task.toLowerCase(),
        };
      });
    });
  }

  function handleIsDone(id) {
    setTodo((preval) => {
      return preval.map((done) => {
        if (done.id == id) {
          return {
            ...done,
            isDone: true,
          };
        } else {
          return done;
        }
      });
    });
  }

  let [edit, setEdit] = useState({});

  function handleEdit(id) {
    setTodo((preval) => {
      return preval.map((todoedit) => {
        if (todoedit.id == id) {
          return {
            ...todoedit,
            task: edit[id] || todoedit.task,
            isDone: false,
          };
        } else {
          return todoedit;
        }
      });
    });
  }

  function handleNewEdit(e, id) {
    setEdit({ ...edit, [id]: e.target.value });
  }

  return (
    <main>
      <div id="todolist">
        <div id="heading">
          <h1>React Todo</h1>
          <p>A simple React Todo List App</p>
        </div>

        <ol id="newtodo-box">
          {todo.map((todo) => {
            return (
              <div id="newtodo" key={todo.id}>
                <li>
                  {todo.isDone ? (
                    <div id="edit-input">
                      <input
                        type="text"
                        placeholder="Enter Edit Task"
                        onChange={(e) => handleNewEdit(e, todo.id)}
                        value={edit[todo.id] || ""}
                      />
                      <button onClick={() => handleEdit(todo.id)}>Save</button>
                    </div>
                  ) : (
                    todo.task
                  )}
                </li>

                {todo.isDone ? (
                  ""
                ) : (
                  <div id="icons">
                    <i
                      className="ri-arrow-up-circle-line"
                      onClick={() => handleUppercase(todo.id)}
                    ></i>
                    <i
                      className="ri-arrow-down-circle-line"
                      onClick={() => handleLowercase(todo.id)}
                    ></i>
                    <i
                      className="ri-pencil-fill"
                      onClick={() => handleIsDone(todo.id, todo.isDone)}
                    ></i>

                    <i
                      className="ri-delete-bin-line"
                      onClick={() => handleDel(todo.id)}
                    ></i>
                  </div>
                )}
              </div>
            );
          })}
        </ol>

        <div id="input">
          <input
            type="text"
            placeholder="Write something"
            value={newTodo}
            onChange={handleNew}
          />
          <button onClick={handleClick}>Add Task</button>
          <button onClick={handleAllUppercase}>All UpperCase</button>
          <button onClick={handleAllLowercase}>All LowerCase</button>
        </div>
        <p>{error ? "Please enter a valid task!" : ""}</p>
      </div>
    </main>
  );
}

export default TodoList;
