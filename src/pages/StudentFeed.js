import { React, useState } from 'react'
import { Container, Grid, Paper, TextField, makeStyles, Button, IconButton, Tooltip } from '@material-ui/core'
import StudentActivities from '../components/StudentActivities'
import { AttachFileRounded } from '@material-ui/icons'
import { useLocation } from 'react-router-dom'

const useStyle = makeStyles(theme => {
  return {
    paper: {
      padding: theme.spacing(2)
    },
    input: {
      display: 'none'
    }
  }
})

export default function StudentFeed({ subject }) {

  const classes = useStyle()
  // const location = useLocation()
  // const subject = location.search.slice(1)
  // const subjectSpace = subject.replace("%20", " ")


  const [activities, setActivities] = useState([
    { title: 'Assignment 1 ', body: 'May 11', id: 1 },
    { title: 'Assignment 2 ', body: 'May 2', id: 2 },
    { title: 'Assignment 3 ', body: 'May 3', id: 3 },
    { title: 'Assignment 4 ', body: 'May 4', id: 4 },
    { title: 'Assignment 5 ', body: 'May 5', id: 5 },
    { title: 'Assignment 6 ', body: 'May 6', id: 6 },
    { title: 'Assignment 7 ', body: 'May 7', id: 7 },
    { title: 'Assignment 8 ', body: 'May 8', id: 8 },
    { title: 'Assignment 9 ', body: 'May 9', id: 9 },
    { title: 'Assignment 10 ', body: 'May 10', id: 10 },
  ])

  const handlePost = () => {
    alert('Go Bal dito lang ako lagi')
  }


  console.log(subject);

  return (
    <div className={classes.root}>
      <Container maxWidth='sm'>
        <Grid container spacing={3} >

          <Grid item xs={12}>
            <h1>Title</h1>
            <p>BSCpE - 3A</p>
          </Grid>

          <Grid item xs={12}>
            <Paper className={classes.paper} >
              <TextField
                variant='filled'
                color='secondary'
                label='Announcement'
                minRows={4}
                margin='normal'
                fullWidth
                multiline
              />

              <div>
                <input className={classes.input} type="file" accept='image/*' id='attach-file' />
                <label htmlFor="attach-file">
                  <IconButton component='span'><Tooltip title='Attach a file' placement='right-start' ><AttachFileRounded /></Tooltip></IconButton>
                </label>
              </div>

              <div>
                <Button variant='contained' color='secondary' size='large' fullWidth disableElevation onClick={handlePost}>Post</Button>
              </div>
            </Paper>
          </Grid>

          {activities.map(activity => (
            <Grid item xs={12} key={activity.id}>
              <StudentActivities activity={activity} />
            </Grid>
          ))}

        </Grid>
      </Container>
    </div>
  )
}
