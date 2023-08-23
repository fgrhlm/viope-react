// AddTodo.jsx
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

const AddTodo = (props) => {
  const API_URL = "https://bookstore-9adf1-default-rtdb.europe-west1.firebasedatabase.app/books/.json";
  const [open, setOpen] = useState(false);

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [year, setYear] = useState("");
  const [isbn, setIsbn] = useState("");
  const [price, setPrice] = useState(0.0);

  const handleOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  const addTodo = (newTodo) => {
    fetch(API_URL,
    {
      method: 'POST',
      body: JSON.stringify(newTodo)
    })
    .then(response => props.fetchItems())
    .catch(err => console.error(err))
  }

  const handleSave = () => {
    const newTodo = {
      "title": title,
      "author": author,
      "year": year,
      "isbn": isbn,
      "price": price
    }

    addTodo(newTodo);
    handleClose();
  }

  return(
    <>
      <Button variant="outlined" onClick={handleOpen}>
        Add todo
      </Button>
      <Dialog open={open}>
        <DialogTitle>New todo</DialogTitle>
        <DialogContent>
          <input type="text" onChange={e => {setTitle(e.target.value)}} placeholder="Title"/>
          <input type="text" onChange={e => {setAuthor(e.target.value)}} placeholder="Author"/>
          <input type="text" onChange={e => {setYear(e.target.value)}} placeholder="Year"/>
          <input type="text" onChange={e => {setIsbn(e.target.value)}} placeholder="Isbn"/>
          <input type="number" onChange={e => {setTitle(e.target.value)}} placeholder="Price"/>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={handleClose}>Cancel</Button>
          <Button color="primary" onClick={handleSave}>Save</Button>
        </DialogActions>
       </Dialog> 
     </>
  );
}

export default AddTodo;
