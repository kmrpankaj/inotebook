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
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU3ODBmNjcyYjZkMDI2MTY2OGNlZGM5In0sImlhdCI6MTcwMjY3OTI1Mn0.-N0NiCVr9ugYOsa9yoNS5iW1qtNDxorx2uxyqu6wRAY"
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
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU3ODBmNjcyYjZkMDI2MTY2OGNlZGM5In0sImlhdCI6MTcwMjY3OTI1Mn0.-N0NiCVr9ugYOsa9yoNS5iW1qtNDxorx2uxyqu6wRAY"
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
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU3ODBmNjcyYjZkMDI2MTY2OGNlZGM5In0sImlhdCI6MTcwMjY3OTI1Mn0.-N0NiCVr9ugYOsa9yoNS5iW1qtNDxorx2uxyqu6wRAY"
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
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU3ODBmNjcyYjZkMDI2MTY2OGNlZGM5In0sImlhdCI6MTcwMjM2NzExM30.wg-uovkP4C1loqmcmvGsZvrq4FqNzrsHIi69AraGggM"
            },
            body: JSON.stringify({ title, description, tag })
        });

        //Logic to edit in client
        for (let index = 0; index < notes.length; index++) {
            const element = notes[index];
            if (element._id === id) {
                element.title = title;
                element.description = description;
                element.tag = tag;

            }
        }
    }

    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
            {props.children}
        </NoteContext.Provider>
    )

}

export default NoteState;