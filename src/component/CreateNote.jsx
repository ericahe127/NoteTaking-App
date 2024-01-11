import React from "react";
import Note from "./NoteComponent.jsx";
import axios from 'axios';

function CreateNote(Props) {

    const API_URL = "http://localhost:4000";

    var [inputText, setText] = React.useState({
        id: null,
        title: "",
        content: ""
    });


  //  React.useEffect(() => {
  //     const fetchMaxId = async () => {
  //     try {
  //       const response = await axios.get(`${API_URL}/api/getMaxId`);
  //       console.log(response.data)
  //       setText(prevValue => ({
  //         ...prevValue,
  //         id: response.data + 1
  //       }));
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   fetchMaxId();
  // }, []); // Empty dependency array ensures useEffect runs only once on component mount

    // const getMaxId = async () => {
    //   try {
    //     const response = await axios.get(`${API_URL}/api/getMaxId`);
    //     console.log(`Max ID: ${response.data.max}`);
    //     return response.data.max;
    //   } catch (error) {
    //     console.error(error);
    //   }
    // };

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
          console.log("before calling onAdd func")
            Props.onAdd(inputText);
            setText(prevValue =>{
               return { 
                id: null,
                title: "" ,
                content: ""}
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
