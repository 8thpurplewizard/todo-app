import React, { useRef, useState } from "react";
import todo_icon from "../assets/todo_icon.png";
import TodoItems from "./TodoItems";

const Todo = () => {
    const inputRef = useRef();
    const [todoList, setTodoList] = useState([]);

    const add = ()=>{
        const inputText = inputRef.current.value.trim();

        if(inputText === '') {
            return null;
        }
        
        const newTodo = {
            id: Date.now(),
            text: inputText,
            isComplete: false
        };
        setTodoList((prev)=>[...prev, newTodo]);
        inputRef.current.value = '';
    }

    return (
        <div className="bg-white place-self-center w-11/12 max-w-md flex flex-col min-h-[550px] rounded-xl p-7">
            {/*title*/}
            <div className="flex items-center mt-7 gap-2">
                <img className="w-8" src={todo_icon} />
                <h1 className="text-3xl font-semibold">To-Do List</h1>
            </div>
            {/*input*/}
            <div className="flex item-center my-7 bg-gray-200 rounded-full">   
                <input ref={inputRef} className="bg-transparent border-0 outline-none flex-1 h-12 pl-6 pr-2 placeholder: text-slate-600" type="text" placeholder="Add your task"/>
                <button onClick={add} className="border-none rounded-full bg-orange-600 w-12 h-12 text-white text-lg font-bold cursor-pointer">+</button>
            </div>
            {/*list*/}
            <div>
                {todoList.map((item, index)=>{
                    console.log('index:' + index + ' text:' + item.text);
                    
                    return <TodoItems 
                    key={index}
                    id={item.id}
                    text={item.text}
                    isComplete={item.isComplete}
                    />
                })}
            </div>
        </div>
    );
};

export default Todo;
