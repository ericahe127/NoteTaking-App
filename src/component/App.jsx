import React from "react"
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import Note from "./NoteComponent.jsx";
import CreateNote from "./CreateNote.jsx";
import notes from "../note.js";

// function createNote(note){
//     return <Note 
//     key={note.key}
//     title = {note.title}
//     content= {note.content}
//     />
// }

function App(){
    var [notes, setNotes] = React.useState([]);
    function addNote(newNote){
        notes = setNotes(prevValue => {
            return [...prevValue, newNote];
        })
    }

    function deleteNote(id){
        setNotes(prevValue => {
            return prevValue.filter((note, index) => {
                return id !== index;
            });
        });
    };

    return <div>
        <Header />
        <CreateNote onAdd = {addNote}/>
        {notes.map((note, index) => {
            return <Note 
                key = {index}
                id = {index}
                title = {note.title}
                content = {note.content}
                onDelete = {deleteNote}
            />
        })}
        <Footer />
    </div>
}

export default App;