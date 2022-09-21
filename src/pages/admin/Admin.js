
import React, { useEffect } from 'react'
import { Container, Grid } from '@material-ui/core'
import StudentTable from '../../components/tables/StudentTable'
import TeacherTable from '../../components/tables/TeacherTable'
import ClassroomTable from '../../components/tables/ClassroomTable'
import AdminTable from '../../components/tables/AdminTable'
import axios from 'axios'

import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'



function Admin() {

  const navigate = useNavigate();
    const Cookie = Cookies.get('adminID');

    function sessionCheck() {
        if(!Cookie) {
            navigate('/adminLogin');
        } 
    }

    function showAdminInfo() {
      axios.post('http://localhost:80/api/getAdmins.php', Cookie)
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
      showAdminInfo() 
    }, [])
    

  return (
    <>
      <Container>
        <Grid container spacing={10}>


           {/* ADMIN LIST */}
           <Grid item xs={12}>
            <AdminTable />
          </Grid>

          {/* STUDENTS LIST */}
          <Grid item xs={12}>
            <StudentTable />
          </Grid>

           {/* INSTRUCTOR LIST */}
           <Grid item xs={12}>
            <TeacherTable />
          </Grid>

          {/* CLASSROOM LIST */}
          <Grid item xs={12}>
            <ClassroomTable />
          </Grid>


        </Grid>
      </Container>
    </>
  )
}
export default Admin


