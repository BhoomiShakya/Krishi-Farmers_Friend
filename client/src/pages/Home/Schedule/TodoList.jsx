// TodoList.js
import React from 'react';
import Todo from './Todo';

const TodoList = ({ todos, deleteTodos, checkTodo }) => {
    const allTodos = todos.map((item) => (
        <Todo
            key={item.id}
            todoItem={item}
            deleteTodos={deleteTodos}
            checkTodo={checkTodo}
        />
    ));

    return (
        <section>
            <ul>{allTodos}</ul>
        </section>
    );
}

export default TodoList;
