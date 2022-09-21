
import { Button, FormHelperText, MenuItem, TextField } from '@material-ui/core'
import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'



export default function CreateAdmin() {
    const history = useNavigate();
    const [data, setData] = useState({
        firstName: '',
        middleName: '',
        lastName: '',
        studentID: '',
        college: '',
        course: '',
        password: ''
    })

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        setData(data => ({...data, [name]: value}));
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const sendData = {
            firstName:data.firstName,
            middleName:data.middleName,
            lastName:data.lastName,
            studentID:data.studentID,
            college: data.college,
            course: data.course,
            password:data.password
        }
        axios.post('http://localhost:80/api/register.php', sendData)
        .then((result) => {
            console.log(result.data)
        })
        .catch(err => console.log(err))
    };

      
  const [position, setPosition] = useState('Student')

  const [teacherPosition, setTeacherPosition] = useState(false)
  const [adminPosition, setAdminPosition] = useState(false)

    
   const handleChangeSelect = (event) => {
    setPosition(event.target.value);
    if(event.target.value === 'Instructor') {
      setTeacherPosition(true)
      setAdminPosition(false)
    } else if (event.target.value === 'Admin') {
      setTeacherPosition(false)
      setAdminPosition(true)
    } else {
      setTeacherPosition(false)
      setAdminPosition(false)
    }
   }

  return (
    
    <div>
        
        <center>
          <FormHelperText>Select position.</FormHelperText>
        <TextField variant='outlined' select value={position} onChange={handleChangeSelect} fullWidth>
            <MenuItem value='Student'> Student </MenuItem>
            <MenuItem value='Instructor'> Instructor </MenuItem>
            <MenuItem value='Admin'> Admin </MenuItem>
          </TextField>
            <br /><br />

          {/* ADMIN */}
    {adminPosition ? 
     <div>
     <h1>Create Admin</h1>
     <br />
     <form onSubmit={handleSubmit}>

     
         <TextField variant='outlined' placeholder='Username'  type="text" name='firstName' value={data.firstName} onChange={handleChange} fullWidth/>
         <br /><br />
         
     
         <TextField variant='outlined' placeholder='Admin ID'  type="text" name='studentID' value={data.studentID} onChange={handleChange} fullWidth/>
         <br /><br />


         <TextField variant='outlined' placeholder='Password'  type="password" name='password' value={data.password} onChange={handleChange} fullWidth/>
         <br /><br />

         <Button fullWidth type='submit' name='submit' variant='contained' color='secondary' >Register</Button>

     </form>
     </div>
     

     : teacherPosition ? 
      // TEACHER
      <div>
        <h1>Create Instructor</h1>
        <br />
        <form onSubmit={handleSubmit}>
            
        
            <TextField variant='outlined' placeholder='Instructor ID'  type="text" name='studentID' value={data.studentID} onChange={handleChange} fullWidth/>
            <br /><br />

        
            <TextField variant='outlined' placeholder='First Name'  type="text" name='firstName' value={data.firstName} onChange={handleChange} fullWidth/>
            <br /><br />
            
            
            <TextField variant='outlined' placeholder='Middle Name'  type="text" name='middleName' value={data.middleName} onChange={handleChange} fullWidth/>
            <br /><br />

    
            <TextField variant='outlined' placeholder='Last Name'  type="text" name='lastName' value={data.lastName} onChange={handleChange} fullWidth/>
            <br /><br />
            
        
            <TextField variant='outlined' placeholder='College'  type="text" name='studentID' value={data.studentID} onChange={handleChange} fullWidth/>
            <br /><br />
            
        
            <TextField variant='outlined' placeholder='Course'  type="text" name='studentID' value={data.studentID} onChange={handleChange} fullWidth/>
            <br /><br />


            <TextField variant='outlined' placeholder='Password'  type="password" name='password' value={data.password} onChange={handleChange} fullWidth/>
            <br /><br />

            <Button fullWidth type='submit' name='submit' variant='contained' color='secondary' >Register</Button>

        </form>
        </div>
         

      : 
      // STUDENT
       <div>
        <h1>Create Student</h1>
        <br />
        <form onSubmit={handleSubmit}>

        
            <TextField variant='outlined' placeholder='First Name'  type="text" name='firstName' value={data.firstName} onChange={handleChange} fullWidth/>
            <br /><br />
            
            
            <TextField variant='outlined' placeholder='Middle Name'  type="text" name='middleName' value={data.middleName} onChange={handleChange} fullWidth/>
            <br /><br />

    
            <TextField variant='outlined' placeholder='Last Name'  type="text" name='lastName' value={data.lastName} onChange={handleChange} fullWidth/>
            <br /><br />
            
        
            <TextField variant='outlined' placeholder='Student ID'  type="text" name='studentID' value={data.studentID} onChange={handleChange} fullWidth/>
            <br /><br />


            <TextField variant='outlined' placeholder='College'  type="text" name='college' value={data.college} onChange={handleChange} fullWidth/>
            <br /><br />


            <TextField variant='outlined' placeholder='Course'  type="text" name='course' value={data.course} onChange={handleChange} fullWidth/>
            <br /><br />


            <TextField variant='outlined' placeholder='Password'  type="password" name='password' value={data.password} onChange={handleChange} fullWidth/>
            <br /><br />
            

            <Button fullWidth type='submit' name='submit' variant='contained' color='secondary' >Register</Button>

        </form>
        </div>
}
        </center>
        
    </div>
  )
}
