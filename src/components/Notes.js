import React, { useContext, useEffect } from 'react';
import noteContext from "../context/noteContext";
import Noteitem from './Noteitem';
import AddNote from './AddNote';

const Notes = () => {
    const context = useContext(noteContext);
    const { notes, getNotes } = context;
    useEffect(() => {
      getNotes()
    }, [])
    
    return (
        <>
        <AddNote />
            <h2 className="text-3xl font-extrabold dark:text-black">Your notes</h2>
            <div className='container grid grid-cols-3 mx-auto p-4 max-w-screen-xl'>


                {notes.map((note) => {
                    return (
                        <Noteitem key={note._id} note={note} />
                    )
                })}
            </div>
        </>
    )
}

export default Notes