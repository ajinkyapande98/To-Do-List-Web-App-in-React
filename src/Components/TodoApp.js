import React, { useEffect, useState } from "react";
import Tasks from "./Tasks";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TodoApp = () => {
  // UseState Hooks
  const [update, setUpdate] = useState(false);
  const [toUpdateTaskbyId, setToUpdateTaskbyId] = useState(0);
  const [task, setTask] = useState("");
  const [list, setList] = useState([]);

  useEffect(() => {
    // used useEffect to call Api function before Rendering
    callApi();
  }, []);

  // Calling to Api for todo list
  const callApi = async () => {
    await fetch("https://jsonplaceholder.typicode.com/todos/?userId=1")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        // console.log(data);
        setList(data);
      })
      .catch((err) => {
        console.log("error:- ", err);
      });
  };

  // This function is used to add task to the list
  const addTasksToList = async () => {
    if (task === "") {
      toast("Write Something...");
      return;
    }
    await fetch("https://jsonplaceholder.typicode.com/todos/?userId=1", {
      method: "POST",
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
        setList([{ userId: 1, title: task, completed: false }, ...list]);
        toast("Task added succefully");
      });
    setTask("");
  };

  // this function helps to clear all  the task
  const clearAllTask = () => {
    setList([]);
    toast("Tasks is Cleared");
  };

  const handleDelete = (data) => {
    // console.log(data);

    toast("Task deleted succefully");
    setList(data);
  };

  //  here you can update Tasks
  const updateTask = (data, id) => {
    // console.log(data, id - 1);
    setUpdate(true);
    setTask(data);
    setToUpdateTaskbyId(id - 1);
    // const afterClickOnEdit = list.filter((item, ind) => {
    //   return ind + 1 !== id;
    // });

    // setList(afterClickOnEdit);
  };

  const updatingTask = async () => {
    if (task === "") {
      toast("Write Something...");
      return;
    }
    await fetch("https://jsonplaceholder.typicode.com/todos/?userId=1", {
      method: "PUT",
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
        setUpdate(false);
        toast("Task Updated succefully");
        list.map((item, ind) => {
          if (ind === toUpdateTaskbyId) {
            item.title = task;
          }
          setList([...list]);
        });
      });
    setTask("");
  };

  //  THis function is for handle tasks
  const HandleTaskCompleted = (data, id) => {
    list.map((item, ind) => {
      if (ind + 1 === id) {
        if (item.completed) {
          item.completed = false;
        } else {
          item.completed = true;
        }
      }
      setList([...list]);
    });

    // setList([
    //   { userId: 1, id: id, title: data.title, completed: true },
    //   ...item,
    // ]);
    // console.log(afterFilter);
  };

  return (
    <div className="todo_list_container">
      <ToastContainer />
      {/* {console.log("Parent Render")} */}
      <h1 className="todo_title">To Do App</h1>
      <input
        type="text"
        className="addtoTask"
        placeholder="Write Something....."
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      {/* {console.log(list)} */}

      {/* This is not image but button */}
      {update ? (
        <img
          className="addtoTaskBtn"
          onClick={() => updatingTask()}
          src="https://cdn-icons-png.flaticon.com/512/1828/1828753.png"
          alt=""
        />
      ) : (
        <img
          className="addtoTaskBtn"
          onClick={() => addTasksToList()}
          src="https://cdn-icons-png.flaticon.com/512/4210/4210903.png"
          alt=""
        />
      )}

      <img
        className="clear-btn"
        onClick={clearAllTask}
        src="https://cdn-icons-png.flaticon.com/512/1828/1828595.png"
        alt=""
      />

      {/* This is Task Components */}
      <Tasks
        list={list}
        handleDelete={handleDelete}
        updateTask={updateTask}
        HandleTaskCompleted={HandleTaskCompleted}
        update={update}
      />
    </div>
  );
};

export default TodoApp;
