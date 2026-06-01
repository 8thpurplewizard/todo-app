import React, { useEffect, useRef, useState } from "react";
import { Reorder } from "motion/react";
import todo_icon from "../assets/todo_icon.png";
import TodoItems from "./TodoItems";

const Todo = () => {
    const inputRef = useRef();
    const [todoList, setTodoList] = useState(localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : []);
    const [editingId, setEditingId] = useState(null);
    const [editText, setEditText] = useState("");

    const addTodo = ()=>{
        const inputText = inputRef.current.value.trim();
        
        if(inputText === '') {
            return null;
        }
        
        const newTodo = {
            id: Date.now(),
            text: inputText,
            isComplete: false
        };
        setTodoList((prevTodos)=>[...prevTodos, newTodo]);
        inputRef.current.value = '';
    }

    const deleteTodo = (id) => {
        setTodoList((prev)=>{
            return prev.filter((todo) => todo.id !== id)
        })
    }

    const toggleTodo = (id) => {
        setTodoList((prevTodos)=>{
            return prevTodos.map((todo)=>{
                if(todo.id === id) {
                    return {...todo, isComplete: !todo.isComplete}
                }
                return todo
            }
            )
        })
    }

    const editTodo = (id, editText) => {        
        console.log('eres');
        
        setTodoList((prevTodos)=>{
            if (!Array.isArray(prevTodos)) return prevTodos || [];

            return prevTodos.map((todo) =>
            todo.id === id ? { ...todo, text: editText } : todo
            );
        });
    };

    useEffect(()=>{
        localStorage.setItem('todos',JSON.stringify(todoList))
    },[todoList])

    return (
        <div className="bg-white place-self-center w-11/12 max-w-md flex flex-col min-h-[550px] rounded-xl p-7">
            {/*title*/}
            <div className="flex items-center mt-7 gap-2">
                <img className="w-8" src={todo_icon} />
                <h1 className="text-3xl font-semibold">To-Do List</h1>
            </div>
            {/*input*/}
            <div className="flex item-center my-7 bg-gray-200 rounded-full">
                <input ref={inputRef} className="bg-transparent border-0 outline-none flex-1 h-12 pl-6 pr-2 placeholder: text-slate-600" type="text" placeholder="Add your tasks"
                onKeyUp={ (e) => {
                    if(e.key === "Enter") addTodo()
                    else if(e.key === "Escape") inputRef.current.value = ''
                    }
                }/>
                <button onClick={addTodo} className="border-none rounded-full bg-orange-600 w-12 h-12 text-white text-lg font-bold cursor-pointer">+</button>
            </div>
            {/*list*/}
            <div>
                <Reorder.Group 
                    axis="y" 
                    values={todoList} 
                    onReorder={setTodoList}
                    className="flex flex-col"
                >
                {todoList.map((item)=>{
                    return (
                        <Reorder.Item 
                            key={item.id} 
                            value={item}
                            className="relative"
                        >
                        <TodoItems 
                            key={item.id}
                            id={item.id}
                            text={item.text}
                            isComplete={item.isComplete}
                            deleteTodo={deleteTodo}
                            toggleTodo={toggleTodo}
                            editTodo={editTodo}
                            editText={editText}
                            setEditText={setEditText}
                            editingId={editingId}
                            setEditingId={setEditingId}
                        />
                        </Reorder.Item>
                    ) 
                })}
                </Reorder.Group>
            </div>
        </div>
    );
};

export default Todo;
