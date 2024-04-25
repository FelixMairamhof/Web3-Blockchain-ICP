import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import {dkeeper_backend} from "../../../declarations/dkeeper_backend"

function App() {
  const [items, setItems] = useState([]);

  function addItem(newNote) {
    setItems(prevItems => {
      dkeeper_backend.createNote(newNote.title, newNote.content);
      return [newNote,...prevItems];
    });
  }

  useEffect(() => {
    fetchData();
  }, [])

  async function fetchData (){
    const notesArray = await dkeeper_backend.readNotes();
    setItems(notesArray);
  }

  function deleteItem(id) {
    setItems(prevItems => {
      return prevItems.filter((item, index) => index !== id)
    });
  }
  

  return (
    <div>
      <Header />
      <CreateArea onAdd={addItem}/>
      {items.map((item, index) => (
        <Note key={index} id={index} title={item.title} content={item.content} onDelete={deleteItem} />
      ))}
      <Footer />
    </div>
  );
}

export default App;
