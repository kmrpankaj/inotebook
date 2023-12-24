import noteContext from '../context/noteContext';
import React, { useContext, useState } from 'react';

const AddNote = () => {
    const context = useContext(noteContext);
    const { addNote } = context;

    const [note, setNote] = useState({title: "", description: "", tag: ""})
    const handleClick = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({title: "", description: "", tag: ""})
    }
    const onChange = (e) => {
        setNote({...note, [e.target.name]: e.target.value})
    }

    return (
        <>
            <h2 className="text-3xl font-extrabold dark:text-black">Add a note</h2>
            <div className="float-none">
                <input value={note.title} type="text" id="title" name="title" onChange={onChange} placeholder="Enter a title" className="block my-2 input  input-primary w-full max-w-xs" />
                <input value={note.tag} type="text" id="tag" name="tag" onChange={onChange} placeholder="Add a tag" className="block my-2 input  input-primary w-full max-w-xs" />
                <textarea value={note.description} onChange={onChange} id="description" name="description" className="block my-2 textarea textarea-primary w-full max-w-xs" placeholder="Note"></textarea>
            </div>
            <button type="Submit" onClick={handleClick} className="btn btn-primary flex justify-between my-2">Create</button>
        </>
    )
}

export default AddNote