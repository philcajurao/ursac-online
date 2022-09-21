import { Box, Container, Grid, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import ClassroomCards from '../components/ClassroomCards'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

import Cookies from 'js-cookie'



export default function TeacherDashboard() {
    const navigate = useNavigate();
    const Cookie = Cookies.get('teacherID');

    function sessionCheck() {
        if(!Cookie) {
            navigate('/');
        } 
    }

    function showTeachersInfo() {
        axios.post('http://localhost:80/api/getInstructors.php', Cookie)
        .then((response) => {
            if(response.data) {
                Cookies.set('userInfo', response.data[0].firstName + ' ' + response.data[0].lastName)
            }
            
        })
        .catch(error => {
            console.log(error);
        })
    }
    

    useEffect(() => {
        sessionCheck();
        showTeachersInfo()
        showClassrooms();
    }, []);

    const [subjects, setSubjects] = useState([]);

    function showClassrooms() {
        axios.get('http://localhost:80/api/getClassrooms.php')
        .then((response) => {
            setSubjects(response.data);
        })
    }


    return (
        <> 
            <Container>
                
                <Grid container spacing={7}>
                    <div>{subjects.subjectName}</div>
                    {subjects.map(subject => (
                        <Grid item xs={12} sm={6} lg={3} key={subject.id}>
                            <ClassroomCards subject={subject} />
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </>
    )
}
