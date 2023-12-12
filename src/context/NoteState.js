import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
    const notesInitial = [{
        "_id": "65780f9b2b6d0261668cedcc",
        "user": "6507730966e4e83f282564f6",
        "title": "50th Note",
        "description": "This is a second cool.",
        "tag": "personal",
        "date": "2023-12-12T07:45:31.638Z",
        "__v": 0
      },
      {
        "_id": "65780fc02b6d0261668cedcf",
        "user": "6507730966e4e83f282564f6",
        "title": "50th Note",
        "description": "This is a second cool.",
        "tag": "personal",
        "date": "2023-12-12T07:46:08.136Z",
        "__v": 0
      }]

const [notes, setNotes] = useState(notesInitial);

    return (
        <NoteContext.Provider value={{notes, setNotes}}>
            {props.children}
        </NoteContext.Provider>
    )

}

export default NoteState;