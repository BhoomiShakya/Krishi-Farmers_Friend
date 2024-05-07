// TodoApp.js
import React, { useEffect, useState } from 'react';
import TodoList from './TodoList';
import Formm from './Formm';
import { v4 as uuid } from 'uuid';
import emailjs from 'emailjs-com';

function TodoApp() {
    let arrayDummy = JSON.parse(window.localStorage.getItem('todos') || "[]");
    let [todos, setTodos] = useState(arrayDummy);

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    const addTodos = (todo) => {
        const dueDate = new Date(Date.now() + 60 * 1000); // Set a due date 1 minute from now
        setTodos([...todos, { ...todo, dueDate, overdueAlertShown: false }]); // Add the dueDate to the todo object
    };

    const deleteTodos = (id) => {
        setTodos((prevState) => {
            return prevState.filter((todo) => todo.id !== id);
        });
    };

    const checkTodo = (id) => {
        setTodos((prevState) => {
            return prevState.map((item) => item.id === id ? { ...item, checked: !item.checked } : item);
        });
    };

    // Function to check if a task is completed within the time limit
    useEffect(() => {
        const timer = setInterval(() => {
            todos.forEach(todo => {
                if (!todo.checked && todo.dueDate < new Date() && !todo.overdueAlertShown) {
                    sendEmail(todo);
                    setTodos(prevState => prevState.map(item => item.id === todo.id ? { ...item, overdueAlertShown: true } : item));
                }
            });
        }, 1000); // Check every second
        return () => clearInterval(timer);
    }, [todos]);

    const sendEmail = (todo) => {
        const templateParams = {
            user_email: 'divyanshagrawal12d@gmail.com', // Replace with recipient email address
            from_name: 'कृषि', // Replace with your name or sender's name
            message: `Task "${todo.todo}" is overdue!`
        };

        emailjs.send('service_tv42udt', 'template_tyis6uo', templateParams, 'uzxQU4-CSw4cDCeDS')
            .then((response) => {
                console.log('Email sent successfully:', response);
            }, (error) => {
                console.error('Error sending email:', error);
            });
    };
    return (
        <div>
            <Formm addTodos={addTodos} todos={todos} />
            <TodoList todos={todos} deleteTodos={deleteTodos} checkTodo={checkTodo} />
        </div>
    );
}

export default TodoApp;
