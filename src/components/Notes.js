import React, { useContext, useEffect, useState, useRef } from 'react';
import noteContext from "../context/noteContext";
import Noteitem from './Noteitem';
import AddNote from './AddNote';

const Notes = () => {
    const context = useContext(noteContext);
    const { notes, getNotes, editNote } = context;
    useEffect(() => {
      getNotes()
    }, [])

    const ref=useRef(null)
    const [note, setNote] = useState({id: "", etitle: "", edescription: "", etag: ""})
    const updateNote = (currentNote) => {
        document.getElementById('my_modal_3').showModal()
        setNote({id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag})
    }
    const handleClick = (e) => {
        editNote(note.id, note.etitle, note.edescription, note.etag)
        ref.current.click();
    }
    const onChange = (e) => {
        setNote({...note, [e.target.name]: e.target.value})
    }
    const handleClose = (e) => {
        ref.current.click();
    }
    
    return (
        <>
        <AddNote />
        {/* Update Note Modal */}
            <dialog id="my_modal_3" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button ref={ref} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <h3 className="font-bold text-lg">Edit Your Notes!</h3>
                    <div className="float-none">
                        <input value={note.etitle} type="text" id="etitle" name="etitle" onChange={onChange} placeholder="Enter a title" className="block my-2 input input-bordered input-primary w-full max-w-xs" />
                        <input value={note.etag} type="text" id="etag" name="etag" onChange={onChange} placeholder="Add a tag" className="block my-2 input input-bordered input-primary w-full max-w-xs" />
                        <textarea value={note.edescription} onChange={onChange} id="edescription" name="edescription" className="block my-2 textarea textarea-primary w-full max-w-xs" placeholder="Note"></textarea>
                    </div>
                    <button onClick={handleClose} className="btn btn-secondary flex justify-between my-2">Cancel</button>
                    <button type="Submit" onClick={handleClick} className="btn btn-primary flex justify-between my-2">Update</button>
                </div>
            </dialog>
        {/* Update Note Modal */}
            <h2 className="text-3xl font-extrabold dark:text-black">Your notes</h2>
            {/* <div className="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical"> */}
            <ul className="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical">


                {notes.map((note, index) => {
                    return (
                        <Noteitem key={note._id} note={note} updateNote={updateNote} index={index} />
                    )
                })}
                </ul>
            {/* </div> */}
        </>
    )
}

export default Notes