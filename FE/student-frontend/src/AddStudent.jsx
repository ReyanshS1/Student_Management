import React, { useState } from 'react';
import axios from 'axios';
export default function AddStudent() {
 const [student, setStudent] = useState({ name: '', age: '', class: '' });
 const handleChange = e => setStudent({ ...student, [e.target.name]: e.target.value });
 const handleSubmit = e => {
 e.preventDefault();
 axios.post('https://localhost:7288/api/Students', student)
 .then(() => alert('Student Added!'));
 };
 return (
 <form onSubmit={handleSubmit}>
 <input name="name" placeholder="Name" onChange={handleChange} />
 <input name="age" placeholder="Age" onChange={handleChange} />
 <input name="class" placeholder="Class" onChange={handleChange} />
 <button type="submit">Add</button>
 </form>
 );
}