import React, {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Container, Paper } from '@mui/material';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import Scroll from './Scroll.js';

function Student() {
    const paperStyle={padding:'20px', width:600, margin:"20px auto"}
    const buttonStyle={padding:'20px', width:600, margin:"20px auto"}
    const [name,setName]=useState('');
    const [address,setAddress]=useState('');
    const [id,setId]=useState([]);
    const [students,setStudents]=useState([]);

    const addClick=(e)=>{e.preventDefault()
        const student={name,address}
        console.log(student)
        fetch("http://localhost:8080/student/add", {
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(student)
        }).then(()=>{
            console.log("New Student Added")
        })}

    const updateClick=(e)=>{e.preventDefault()
      const student={id,name,address}
      console.log(student)
      fetch("http://localhost:8080/student/"+id, {
          method:"PUT",
          headers:{"Content-Type":"application/json"},
          body:JSON.stringify(student)
      }).then(()=>{
          console.log("Student Updated")
      })}

      const student={id}
      const deleteClick=(e)=>{e.preventDefault()
      console.log(student)
        fetch("http://localhost:8080/student/"+id, {
            method:"DELETE",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(student)
        }).then(()=>{
            console.log("Student Deleted")
        })}
    
    useEffect(()=>{
        fetch("http://localhost:8080/student/getAll")
        .then(res=>res.json())
        .then((result)=>{
            setStudents(result)
        })
    },[students])

    const [isShownAddStudent, setIsShownAddStudent] = useState(true);
    const [isShownUpdateStudent, setIsShownUpdateStudent] = useState(false);
    const [isShownDeleteStudent, setIsShownDeleteStudent] = useState(false);
    

    const addStudentShow = event => {
      setIsShownAddStudent(current => !current);
      setIsShownUpdateStudent(false);
      setIsShownDeleteStudent(false);
    };

    const updateStudentShow = event => {
      setIsShownAddStudent(false);
      setIsShownUpdateStudent(current => !current);
      setIsShownDeleteStudent(false);
    };

    const deleteStudentShow = event => {
      setIsShownAddStudent(false);
      setIsShownUpdateStudent(false);
      setIsShownDeleteStudent(current => !current);
    };

    // const findStudentShow = event => {
    //   setIsShownAddStudent(false);
    //   setIsShownUpdateStudent(false);
    //   setIsShownDeleteStudent(false);
    //   setIsShownFindStudent(current => !current);
    // };

    const [findStudent, setFindStudent] = useState("")

  return (
    <Container>
      <Stack style={buttonStyle} direction="row" spacing={10}>
      <Button variant="outlined" onClick={addStudentShow}>Add Student</Button>
      <Button variant="outlined" onClick={updateStudentShow}>Update Student</Button>
      <Button variant="outlined" onClick={deleteStudentShow}>Delete Student</Button>
      {/* <Button variant="outlined" onClick={findStudentShow}>Find Student</Button> */}
      </Stack>

    {/* Add Student Paper */}
    {isShownAddStudent && (
      <Paper elevation={6} style={paperStyle}>
          <h1 style={{color:"#2196F3"}}>Add Student</h1>
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField id="outlined-basic" label="Student Name" variant="outlined" value={name} onChange={(e)=>setName(e.target.value)} required/>
      
      <TextField id="outlined-basic" label="Student Address" variant="outlined" value={address} onChange={(e)=>setAddress(e.target.value)} required/>

      <Button variant="contained" endIcon={<SendIcon />} onClick={addClick}>Submit</Button>
    </Box>
    </Paper>)}

    {/* Delete Student Paper */}
    {isShownDeleteStudent && (
        <Paper elevation={6} style={paperStyle}>
            <h1 style={{color:"#2196F3"}}>Delete Student</h1>
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField id="outlined-basic" label="Student ID" variant="outlined" value={id} onChange={(e)=>setId(e.target.value)} required/> <br/>

      <Button variant="contained" startIcon={<DeleteIcon />} onClick={deleteClick}>Delete Student</Button>
    </Box>
    </Paper>)}

    {/* Update Student Paper   */}
    {isShownUpdateStudent && (
        <Paper elevation={6} style={paperStyle}>
            <h1 style={{color:"#2196F3"}}>Update Student</h1>
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField id="outlined-basic" label="Student ID" variant="outlined" value={id} onChange={(e)=>setId(e.target.value)} required/>

      <TextField id="outlined-basic" label="Student Name" variant="outlined" value={name} onChange={(e)=>setName(e.target.value)}/> 
      
      <TextField id="outlined-basic" label="Student Address" variant="outlined" value={address} onChange={(e)=>setAddress(e.target.value)}/> <br/>

      <Button variant="contained" endIcon={<SendIcon />} onClick={updateClick}>Update Student</Button>
    </Box>
    </Paper>)}

     {/* Find Student Paper  
    {isShownFindStudent && (
        <Paper elevation={6} style={paperStyle}>
            <h1 style={{color:"#2196F3"}}>Find Student</h1>
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField id="outlined-basic" label="Student Name" variant="outlined" value={name} onChange={(e)=>setName(e.target.value)}/>

      <Button variant="contained" startIcon={<SearchIcon />} onClick={addClick}>Find Student</Button>
    </Box>
    </Paper>)}
    */}

    {/* Student List Paper */}
    
    <h1 style={{color:"#2196F3"}}>Student List</h1>
    
    <Paper elevation={6} style={paperStyle}>
    
    <TextField id="outlined-basic" label="Find Students" variant="outlined" onChange={event => setFindStudent(event.target.value)}/>
    <Scroll>
        {students.filter(students => {
    if (findStudent === '') {
      return students;
    } else if (students.name.toLowerCase().includes(findStudent.toLowerCase())) {
      return students;
    }
  }).map((students) => (
    <Paper elevation={6} style={{margin:"10px", padding:"15px", textAlign:"left"}} key={students.id}>
            ID: {students.id}<br/>
            Name: {students.name}<br/>
            Address: {students.address}
      </Paper>
  ))}
  </Scroll>
    </Paper>

    
    </Container>
  );
}

export default Student