import React from "react";
import { FaTrash } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";
export default function Todo(props) {
  const [editText, setEditText] = React.useState("");
  function handleEditText(event) {
    setEditText(event.target.value);
  }
  return (
    <div
      className="task"
      style={{
        backgroundColor: props.isDone ? "rgba(96, 255, 17, 0.437)" : "",
      }}
    >
      {props.isEdit ? (
        <input
          type="text"
          className="edit-field"
          defaultValue={props.task}
          onChange={handleEditText}
        ></input>
      ) : (
        <h3 className="task-title">{props.task}</h3>
      )}
      <div className="buttons">
        <button
          className="edit-button"
          disabled={props.isDone}
          onClick={() => {
            props.handleEditOrUpdate(props.id, editText);
          }}
        >
          {props.isEdit ? "Update" : "Edit"}
        </button>
        {!props.isEdit && (
          <div>
            <FaTrash
              className="delete-button"
              onClick={() => {
                props.deleteTask(props.id);
              }}
            />
            <FaCheckCircle
              className="check-button"
              style={{
                pointerEvents: props.isDone ? "none" : "",
                opacity: props.isDone ? "0.2" : "",
              }}
              onClick={() => props.completeTask(props.id)}
            />
          </div>
        )}
      </div>
    </div>
  );
}
