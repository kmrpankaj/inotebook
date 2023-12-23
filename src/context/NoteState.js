import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
    const host = "http://localhost:3002"
    const notesInitial = []

    const [notes, setNotes] = useState(notesInitial);

    // Get all Notes
    const getNotes = async () => {
        // API call
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU4MjAzYzdmZjExYWIxMDQ2NjM5MWY1In0sImlhdCI6MTcwMzAxOTUzNn0._tuYhDpBKD0XULyaBzspe8Q92IWHEHjSMU9jU3Yg74I"
            }
        });
        const json = await response.json()
        setNotes(json)

    }

    //Add a note
    const addNote = async (title, description, tag) => {
        // API call
        const response = await fetch(`${host}/api/notes/addnotes`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU4MjAzYzdmZjExYWIxMDQ2NjM5MWY1In0sImlhdCI6MTcwMzAxOTUzNn0._tuYhDpBKD0XULyaBzspe8Q92IWHEHjSMU9jU3Yg74I"
            },
            body: JSON.stringify({title, description, tag})
            
        });
        const note = await response.json();
        setNotes(notes.concat(note))
    }

    // Delete a Note
    const deleteNote = async (id) => {
        // API call
        const response = await fetch(`${host}/api/notes/deletenotes/${id}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU4MjAzYzdmZjExYWIxMDQ2NjM5MWY1In0sImlhdCI6MTcwMzAxOTUzNn0._tuYhDpBKD0XULyaBzspe8Q92IWHEHjSMU9jU3Yg74I"
            }
        });
        const json = await response.json()
        //   console.log("Deleteing the note with id" + id);
        const newNote = notes.filter((note) => { return note._id !== id })
        setNotes(newNote);
    }
    // Edit a Note
    const editNote = async (id, title, description, tag) => {
        //ToDo: Api Call

        const response = await fetch(`${host}/api/notes/updatenotes/${id}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU4MjAzYzdmZjExYWIxMDQ2NjM5MWY1In0sImlhdCI6MTcwMzAxOTUzNn0._tuYhDpBKD0XULyaBzspe8Q92IWHEHjSMU9jU3Yg74I"
            },
            body: JSON.stringify({ title, description, tag })
        });

        let newNotes = JSON.parse(JSON.stringify(notes))
        //Logic to edit in client
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if (element._id === id) {
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                break; 
            }
        }
        setNotes(newNotes)
    }

    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
            {props.children}
        </NoteContext.Provider>
    )

}

export default NoteState;