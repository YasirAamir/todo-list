import { nanoid } from "nanoid";
import React, { Component } from "react";
import Todo from "./Todo.js";

export default class Main extends Component {
  state = {
    tasks: JSON.parse(localStorage.getItem("tasks")) || [],
    current: "",
  };
  componentDidUpdate() {
    localStorage.setItem("tasks", JSON.stringify(this.state.tasks));
  }
  handleEditOrUpdate = (id, updatedText) => {
    for (let i = 0; i < this.state.tasks.length; i++) {
      const currObj = this.state.tasks[i];
      if (currObj.id === id) {
        if (currObj.isEdit) {
          currObj.task = updatedText === "" ? currObj.task : updatedText;
          currObj.isEdit = false;
        } else {
          currObj.isEdit = true;
        }
      }
    }
    this.setState({ tasks: [...this.state.tasks] });
  };

  deleteTask = (id) => {
    const newList = this.state.tasks.filter((obj) => obj.id !== id);
    this.setState({ tasks: [...newList] });
  };
  completeTask = (id) => {
    for (let i = 0; i < this.state.tasks.length; i++) {
      const currObj = this.state.tasks[i];
      if (currObj.id === id) {
        currObj.isDone = true;
      }
    }
    this.setState({ tasks: [...this.state.tasks] });
  };

  render() {
    const saveTask = () => {
      if (this.state.current !== "") {
        this.setState((prevState) => {
          return {
            tasks: [
              {
                task: this.state.current,
                isDone: false,
                isEdit: false,
                id: nanoid(),
              },
              ...prevState.tasks,
            ],
            current: "",
          };
        });
      }
    };
    const handleChange = (event) => {
      this.setState({ current: event.target.value });
    };
    return (
      <main>
        <h1 className="title">TODO LIST</h1>
        <div className="new-task">
          <input
            className="input-field"
            type="text"
            value={this.state.current}
            onChange={handleChange}
          ></input>
          <button className="save-button" onClick={saveTask}>
            Save
          </button>
        </div>
        <div className="list">
          {this.state.tasks.map((obj) => (
            <Todo
              task={obj.task}
              isDone={obj.isDone}
              isEdit={obj.isEdit}
              key={obj.id}
              id={obj.id}
              handleEditOrUpdate={this.handleEditOrUpdate}
              deleteTask={this.deleteTask}
              completeTask={this.completeTask}
            />
          ))}
        </div>
      </main>
    );
  }
}
