const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Notes = require('../models/Notes');
const { body, validationResult } = require('express-validator');

// Route 1:  Get all the notes:  GET "/api/auth/fetchallnotes". Require Auth
router.get('/fetchallnotes', fetchuser, async(req, res)=> {
try {
    const notes = await Notes.find({user: req.user.id});
    res.json(notes);
} catch(error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
 }
});

// Route 2:  Add a new note:  post "/api/auth/addnotes". Require Auth
router.get('/addnotes', fetchuser,[
    body('title', 'Enter a valid title').isLength({min:3}),
    body('description', 'Enter a valid description').isLength({min:5})
], async(req, res)=> {
    try {
        const {title, description, tag} = req.body;
        // if there are errors return bad requests
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({errors: errors.array()});
        }
        const note = new Notes({
           title,description,tag,user: req.user.id
        })
        const saveNote = await note.save();
       res.json(saveNote);
    } catch(error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
     }
});

// Route 3:  Update a note:  PUT "/api/notes/updatenotes". Require Auth
router.put('/updatenotes/:id', fetchuser, async(req, res)=> {
    const {title, description, tag} = req.body;
    //create a new note object
    const newNote = {};
    if(title){newNote.title= title};
    if(description){newNote.description= description};
    if(tag){newNote.tag= tag};

    //find the note to be updated and update it.
 
    let note = await Notes.findById(req.params.id);
    if(!note){return res.status(404).send("not found")}
    if (note.user.toString() !== req.user.id){
        return res.status(401).send("not allowed")
    }

    note = await Notes.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true})
    res.json({note});

});

// Route 4:  Delete a note:  Delete "/api/notes/deletenotes". Require Auth
router.delete('/deletenotes/:id', fetchuser, async(req, res)=> {

    //find the note to be updated and update it.
    let note = await Notes.findById(req.params.id);
    if(!note){return res.status(404).send("not found")}

    //Allow deletion only if user owns this Note
    if (note.user.toString() !== req.user.id){
        return res.status(401).send("Not Allowed")
    }

    note = await Notes.findByIdAndDelete(req.params.id)
    res.json({"Success": "Note has been deleted", note: note});

});

module.exports = router
