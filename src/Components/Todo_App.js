import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Todo_App = () => {
  const [list, setList] = useState([]);
  const [task, setTask] = useState("");
  //   const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    callApi();
  }, []);

  const notify = (data) => {
    toast(data);
  };
  const addToTask = () => {
    fetch("https://jsonplaceholder.typicode.com/todos", {
      method: "post",
      body: JSON.stringify({
        title: task,
        userId: 1,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        // console.log(`Successfully Added: '${data.title}'`);
        if (task == "") {
          notify("Write Something...");
          return;
        }
        setList([...list, { title: task }]);
        notify("Task Added Successfully!");
      });
    setTask("");
  };

  const callApi = async () => {
    await fetch("https://jsonplaceholder.typicode.com/todos")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setList(data);
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

  const handleDelete = (id) => {
    // console.log(id);
    fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        // setList(data);
        // callApi();
        const afterFilter = list.reverse().filter((item, ind) => {
          return ind + 1 !== id;
        });
        setList(afterFilter.reverse());
        notify(`sucessfully deleted`);
      });

    // console.log(`sucessfully deleted: ${id}`);
  };

  const doubleTick = (id, list) => {
    console.log(id, list[id]);
  };

  const clearAll = () => {
    setList("");
  };

  return (
    <div className="todo_list_container">
      {/* {console.log(list[0].completed)} */}
      <ToastContainer />
      <h1 className="todo_title">To Do App</h1>
      <input
        className="addtoTask"
        type="text"
        placeholder="Enter Task Here..."
        onChange={(e) => setTask(e.target.value)}
        value={task}
      />

      <img
        onClick={addToTask}
        className="addtoTaskBtn"
        src="https://cdn-icons-png.flaticon.com/512/4210/4210903.png"
        alt=""
      />

      <img
        className="clear-btn"
        onClick={clearAll}
        src="https://cdn-icons-png.flaticon.com/512/1828/1828595.png"
        alt=""
      />

      <div className="todo_list_inner_container">
        {[...list].reverse().map((item, ind) => {
          return (
            <div className="todo-list" key={ind + 1}>
              <li>{ind + 1}.</li>
              <li>{item.title}</li>

              <img
                className="edit-btn"
                src="https://cdn-icons-png.flaticon.com/512/1828/1828270.png"
                alt=""
              />
              <img
                className="delete-btn"
                onClick={() => handleDelete(ind + 1)}
                src="https://cdn-icons-png.flaticon.com/512/1214/1214926.png"
                alt=""
              />

              {item.completed ? (
                <img
                  onClick={() => doubleTick(ind + 1, list)}
                  src="https://cdn-icons-png.flaticon.com/512/5176/5176456.png"
                  alt=""
                  className="checkbox"
                />
              ) : (
                <img
                  onClick={() => doubleTick(ind + 1, list)}
                  src="https://cdn-icons-png.flaticon.com/512/5176/5176427.png"
                  alt=""
                  className="checkbox"
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Todo_App;
