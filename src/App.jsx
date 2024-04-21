import { useEffect, useState } from 'react'

import './App.css'

function App() {
 const [users,setUsers]=useState([]);

 useEffect(()=>{
  fetch('http://localhost:5000/users')
  .then(res => res.json())
  .then(data => setUsers(data))
 },[])
 const handlesubmit=e=>{
  e.preventDefault();
  const form=e.target;
  const name = form.name.value;
  const email =form.email.value;
  const user ={name,email};
  console.log(user)
  fetch('http://localhost:5000/users',{
    method:"POST",
    headers:{
      "content-type":"appication/json"
    },
    body:JSON.stringify(user),
  })
  .then(res => res.json())
  .then(data =>{
    console.log('inside post response',data)
    const newUser=[...users,data];
    setUsers(newUser);
    form.reset();
  })

 }


  return (
    <>
     
      <h1>Users mangment system</h1>
      <h2>Users:{users.length}</h2>
      <form onSubmit={handlesubmit} >
        <input type="text" name="name"  />
        <br />
        <input type="email" name="email"  />
        <br />
        <input type="submit" value="send user" />
      </form>
      {
        users.map(user=><li key={user.id}>{user.id} {user.name} {user.email}</li>)
      }
      
    </>
  )
}

export default App
