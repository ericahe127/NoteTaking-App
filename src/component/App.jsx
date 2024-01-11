import React from "react"
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import Note from "./NoteComponent.jsx";
import CreateNote from "./CreateNote.jsx";
import axios from 'axios';

// function createNote(note){
//     return <Note 
//     key={note.key}
//     title = {note.title}
//     content= {note.content}
//     />
// }
const API_URL = "http://localhost:4000";

function App(){
    var [notes, setNotes] = React.useState([]);

    const fetch_note = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/notes`);
      setNotes(response.data);
    } catch (error) {
      console.error(error);
    }
  };

   fetch_note();

  const addNote = async (newNote) => {
    try {
        console.log("before add");
        console.log(newNote.title);
        console.log(newNote.content);
      const response = await axios.post(`${API_URL}/api/addNote`, 
        { 
            title: newNote.title,
            content: newNote.content 
        },
        {
            headers: {
            'Content-Type': 'application/json',
            },
      });
      console.log("after add");
      setNotes(prevNotes => [...prevNotes, response.data]);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteNote = async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/api/deleteNote/${id}`);
      setNotes(prevNotes => prevNotes.filter(note => note.id !== response.data.id));
    } catch (error) {
      console.error(error);
    }
  };


    // function addNote(newNote){
    //     add_note(newNote);
    //     notes = setNotes(prevValue => {
    //         return [...prevValue, newNote];
    //     })
    // }

    // function deleteNote(id){

    //     setNotes(prevValue => {
    //         return prevValue.filter((note, index) => {
    //             return id !== index;
    //         });
    //     });
    // };

    return <div>
        <Header />
        <CreateNote onAdd = {addNote}/>
        {notes.map((note, index) => {
            return <Note 
                key = {index}
                id = {note.id}
                title = {note.title}
                content = {note.content}
                onDelete = {deleteNote}
            />
        })}
        <Footer />
    </div>
}

export default App;