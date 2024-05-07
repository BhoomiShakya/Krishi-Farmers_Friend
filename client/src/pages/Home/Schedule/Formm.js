// Formm.js
import React, { useState } from 'react';
import Datetime from 'react-datetime';
import { v4 as uuid } from 'uuid';

function Formm({ addTodos }) {
    const [input, setInput] = useState('');
    const [dueDate, setDueDate] = useState('');

    function inputChangeHandler(e) {
        setInput(e.target.value);
    }

    function formSubmitHandler(e) {
        e.preventDefault();
        if (!input.trim()) return;

        const newTodo = {
            id: uuid(),
            todo: input,
            checked: false,
            dueDate: dueDate // Pass the selected due date
        };

        addTodos(newTodo);
        setInput('');
        setDueDate(''); // Reset dueDate after adding todo
    }

    return (
        <form onSubmit={formSubmitHandler}>
            <input
                type='text'
                placeholder='Enter your task'
                value={input}
                onChange={inputChangeHandler}
            />
            <Datetime
                input={true}
                value={dueDate}
                onChange={(value) => setDueDate(value)}
            />
            <button type="submit">Add TODO</button>
        </form>
    );
}

export default Formm;
