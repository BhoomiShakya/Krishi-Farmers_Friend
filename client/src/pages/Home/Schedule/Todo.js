// Todo.js
import React from 'react';
import { FaTrashCan } from "react-icons/fa6";

const Todo = ({ deleteTodos, checkTodo, todoItem }) => {
    function deleteTodoHandler(id) {
        deleteTodos(id);
    }

    const inputChangeHandler = (id) => {
        checkTodo(id);
    }

    return (
        <div>
            <li style={{ textDecoration: `${todoItem.checked ? 'line-through' : ''}` }}>
                <input
                    type="checkbox"
                    onChange={() => { inputChangeHandler(todoItem.id) }}
                    defaultChecked={todoItem.checked}
                />
                <span>
                    <b>Id:</b> {todoItem.id}&nbsp;&nbsp;
                    <b>Task:</b> {todoItem.todo}&nbsp;&nbsp;
                    <b>Due:</b> {new Date(todoItem.dueDate).toLocaleString()}
                </span>
                <span onClick={() => { deleteTodoHandler(todoItem.id) }}>
                    <FaTrashCan />
                </span>
            </li>
        </div>
    );
}

export default Todo;
