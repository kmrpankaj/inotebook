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
      },
      {
        "_id": "657859d3bc8fe3add0034eb9",
        "user": "6507730966e4e83f282564f6",
        "title": "Grocery Shopping List",
        "description": "Milk, eggs, bread, bananas, apples, potatoes, onions, carrots, broccoli, cheese.",
        "tag": "groceries",
        "date": "2023-12-12T13:02:11.199Z",
        "__v": 0
      },
      {
        "_id": "657859ddbc8fe3add0034ebb",
        "user": "6507730966e4e83f282564f6",
        "title": "Meeting Notes - Team Project Update",
        "description": "Discussed progress on website development, marketing strategy, and budget. Scheduled follow-up meeting for next week.",
        "tag": "meeting",
        "date": "2023-12-12T13:02:21.670Z",
        "__v": 0
      },
      {
        "_id": "657859eabc8fe3add0034ebd",
        "user": "6507730966e4e83f282564f6",
        "title": "Ideas for Blog Post Topics",
        "description": "Sustainable living tips, vegan recipes, travel adventures, book reviews, productivity hacks travel adventures, book reviews.",
        "tag": "blogging",
        "date": "2023-12-12T13:02:34.469Z",
        "__v": 0
      },
      {
        "_id": "657859f9bc8fe3add0034ebf",
        "user": "6507730966e4e83f282564f6",
        "title": "Reminder - Pay Phone Bill",
        "description": "Due date: December 15th. Payment amount: $89.99.",
        "tag": "bill",
        "date": "2023-12-12T13:02:49.269Z",
        "__v": 0
      },
      {
        "_id": "657859fdbc8fe3add0034ec1",
        "user": "6507730966e4e83f282564f6",
        "title": "Book Recommendation: The Alchemist by Paulo Coelho",
        "description": "Inspirational story about following your dreams. Highly recommend!",
        "tag": "book",
        "date": "2023-12-12T13:02:53.836Z",
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