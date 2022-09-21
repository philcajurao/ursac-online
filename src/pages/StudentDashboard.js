import { React, useEffect, useState } from 'react'
import { Container, Grid } from '@material-ui/core'
import SubjectCards from '../components/SubjectCards'
import axios from 'axios'

import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'



export default function StudentDashboard() {
    
    const navigate = useNavigate();
    const Cookie = Cookies.get('studentID');

    function sessionCheck() {
        if(!Cookie) {
            navigate('/');
        } 
    }

    function showStudentsInfo() {
        axios.post('http://localhost:80/api/getStudents.php', Cookie)
        .then((response) => {
            if(response.data) {
                Cookies.set('userInfo', response.data[0].firstName + ' ' + response.data[0].lastName)
            }
            
        })
        .catch(error => {
            console.log(error);
        })
    }

    function showClassrooms() {
        axios.get('http://localhost:80/api/getClassrooms.php')
        .then((response) => {
            setSubjects(response.data);
        })
        .catch(err => console.log(err))
    }

    useEffect(() => {
        sessionCheck();
        showStudentsInfo();
        showClassrooms();
    }, []);

    const [subjects, setSubjects] = useState([]);

    


    return (
        <>
            <Container>
                <Grid container spacing={7}>
                    {subjects.map(subject => (
                        <Grid item xs={12} sm={6} lg={3} zeroMinWidth key={subject.id}>
                            <SubjectCards subject={subject}/>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </>
    )
}
