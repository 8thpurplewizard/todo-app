import React from 'react'
import tick from '../assets/tick.png'
import not_tick from '../assets/not_tick.png'
import delete_icon from '../assets/delete.png'
import edit_icon from '../assets/edit.png'

const TodoItems = ({text, id, isComplete, 
    deleteTodo, toggleTodo, editTodo, editingId, setEditingId, editText, setEditText}) => {
    return (
        <div className='flex items-center my-3 gap-2 pr-3'>
            <div className='flex flex-1 items-center overflow-hidden'>
                <img onClick={() => toggleTodo(id)} src={isComplete? tick : not_tick} className='w-7 cursor-pointer'/>
                
                {editingId === id ? (
                <input
                className={`text-slate-700 ml-4 text-[17px] decoration-slate-500 ${isComplete ? 'line-through' : ''}`}
                value={editText}
                onChange={ (e) => setEditText(e.target.value)}
                onBlur={() => {
                    if(editText.trim() != "") {
                        editTodo(id, editText.trim())
                    }
                    setEditingId(null);
                    }
                }
                onKeyUp={ (e) => {
                    if(e.key === "Enter") {
                        if(editText.trim() != "") {
                        editTodo(id, editText.trim())
                    }
                    setEditingId(null);
                    }
                    else if(e.key === "Escape") {
                        setEditingId(null);
                    }
                    }
                }
                autoFocus
                />) 
                : (
                <p className={`text-slate-700 ml-4 text-[17px] decoration-slate-500 ${isComplete ? 'line-through' : ''}`}>
                    {text}
                </p>)}
                
            </div>
            <img 
                onClick={() => {
                    setEditingId(id);
                    setEditText(text);
                    console.log('id:', id,'editText:',editText);
                    
                }}
                src={edit_icon} 
                className='w-3.5 cursor-pointer'></img>
            <img onClick={() => deleteTodo(id)} src={delete_icon} className='w-3.5 cursor-pointer'></img>
        </div>
    )
}

export default TodoItems