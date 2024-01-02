import React from "react";
import Note from "./NoteComponent.jsx";

function CreateNote(Props) {

    var [inputText, setText] = React.useState({
        title: "",
        content: ""
    });


    function handleChange(e){
        const {value, name} = e.target;
        setText(prevValue => {
            return {...prevValue,
            [name]: value}
        });
        console.log(inputText);
    }

  return (
    <div>
      <form>
        <input name="title" placeholder="Title" onChange={handleChange} value={inputText.title}/>
        <textarea name="content" onChange={handleChange} placeholder="Take a note..." rows="3" value={inputText.content}/>
        <button onClick={(e)=>{
            Props.onAdd(inputText);
            setText({
                title: "" ,
                content: ""
            });
            e.preventDefault();
        }}>
        Add
        </button>
      </form>
    </div>
  );
}

export default CreateNote;
