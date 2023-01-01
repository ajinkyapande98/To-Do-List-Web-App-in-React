import React, { useEffect } from "react";

const Tasks = (props) => {
  const { list, handleDelete, updateTask, update, HandleTaskCompleted } = props;

  // This function is to do delete Tasks
  const Delete = (id) => {
    fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        const afterFilter = list.filter((item, ind) => {
          // console.log(item.id, id);
          return ind + 1 !== id;
        });
        handleDelete(afterFilter);
      });
  };

  const editT = (id) => {
    // console.log(id);
    list.map((item, ind) => {
      if (ind + 1 === id) {
        // console.log(item.title, item.id, ind);
        updateTask(item.title, ind + 1);
        // return [item.title, ind];
        // return { title: "AjjuBhai", ...list };
      }
      // return item;
    });
  };

  const markAsCompleted = (id) => {
    list.map((item, ind) => {
      if (ind + 1 === id) {
        HandleTaskCompleted(item, ind + 1);
        // return { item };
      }
      return item;
    });
    // console.log("mark as Completed", id);
  };

  return (
    <>
      {/* {console.log("child Render")} */}
      <div className="todo_list_inner_container">
        {list.map((item, ind) => {
          return (
            <div className="todo-list" key={ind}>
              <li>{ind + 1}</li>
              {item.completed ? (
                <li className="completedTask">{item.title}</li>
              ) : (
                <li>{item.title}</li>
              )}

              {update ? (
                ""
              ) : (
                <img
                  className="edit-btn"
                  onClick={() => editT(ind + 1)}
                  src="https://cdn-icons-png.flaticon.com/512/1828/1828270.png"
                  alt=""
                />
              )}
              {item.completed ? (
                <img
                  className="checkbox"
                  onClick={() => markAsCompleted(ind + 1)}
                  src="https://cdn-icons-png.flaticon.com/512/5176/5176456.png"
                  alt=""
                />
              ) : (
                <img
                  className="checkbox"
                  onClick={() => markAsCompleted(ind + 1)}
                  src="https://cdn-icons-png.flaticon.com/512/5176/5176427.png"
                  alt=""
                />
              )}
              <img
                className="delete-btn"
                onClick={() => Delete(ind + 1)}
                src="https://cdn-icons-png.flaticon.com/512/1214/1214926.png"
                alt=""
              />
            </div>
          );
        })}
      </div>
    </>
  );
};
// https://cdn-icons-png.flaticon.com/512/5176/5176427.png
export default Tasks;
