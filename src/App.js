import * as React from 'react';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Login from './pages/Login'
import Register from './pages/Register';

import StudentDashboard from './pages/StudentDashboard'
import StudentFeed from './pages/StudentFeed'

import TeacherLayout from './components/TeacherLayout';
import TeacherDashboard from './pages/TeacherDashboard'
import TeacherFeed from './pages/TeacherFeed';

import StudentLayout from './components/StudentLayout';
import Quiz from './pages/Quiz';
import VideoStream from './components/VideoStream';

import BasicTable from './components/test/BasicTable';
import CreateClassroom from './pages/CreateClassroom';

import Admin from './pages/admin/Admin';
import AdminLayout from './components/AdminLayout';
import CreateAdmin from './pages/admin/CreateAdmin';
import StudentTable from './components/tables/StudentTable';
import TeacherTable from './components/tables/TeacherTable';
import AdminTable from './components/tables/AdminTable';
import ClassroomTable from './components/tables/ClassroomTable';
import AdminLogin from './pages/admin/AdminLogin';

const theme = createTheme({
  typography: {
    fontFamily: 'Quicksand'
  },
  palette: {
    primary: {
      main: "#111"
    },
    secondary: {
      main: '#162276'
    },
    error: {
      main: '#ffffff'
    }
  }
});


function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>





          {/* AUTHENTICATIONS */}
          <Route path='/' element={<Login />} />

          <Route path='/register' element={<Register />} />





          {/* STUDENT */}
          <Route path='/studentDashboard' element={<StudentLayout><StudentDashboard /></StudentLayout>} />

          <Route path='/studentFeed' element={<StudentLayout><StudentFeed /></StudentLayout>} />





          {/* TEACHER */}
          <Route path='/teacherDashboard' element={<TeacherLayout><TeacherDashboard /></TeacherLayout>} />

          <Route path='/teacherFeed' element={<TeacherLayout><TeacherFeed /></TeacherLayout>} />





          {/* ADMIN */}

          <Route path='/adminLogin' element={<AdminLogin />} />
          
          <Route path='/admin' element={<AdminLayout><Admin /></AdminLayout>} />

          <Route path='/studentList' element={<AdminLayout><StudentTable /></AdminLayout>} />

          <Route path='/instructorList' element={<AdminLayout><TeacherTable /></AdminLayout>} />

          <Route path='/adminList' element={<AdminLayout><AdminTable /></AdminLayout>} />

          <Route path='/classroomList' element={<AdminLayout><ClassroomTable /></AdminLayout>} />

          <Route path='/createAdmin' element={<AdminLayout><CreateAdmin /></AdminLayout>} />





          {/* OTHER COMPONENTS */}
          <Route path='/createTeacherClassroom' element={<TeacherLayout><CreateClassroom /></TeacherLayout>} />
          <Route path='/createStudentClassroom' element={<StudentLayout><CreateClassroom /></StudentLayout>} />

          <Route path='/quiz' element={<Quiz />} />

          <Route path='/videoStream' element={<VideoStream />} />

          <Route path='/basicTable' element={<BasicTable />} />

        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
