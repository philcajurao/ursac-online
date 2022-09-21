import React from 'react'
import { Avatar, Card, CardActionArea, CardContent, CardHeader, CardMedia, Divider, Typography } from '@material-ui/core'
import defaultCoverPhoto from '../images/defaultCoverPhoto.png'
import { makeStyles } from '@material-ui/styles'
import { Link } from 'react-router-dom'


const useStyle = makeStyles(theme => {
  return {
    root: {
      '& .MuiCardActionArea-focusHighlight': {
        background: 'none'
      }
    },
    avatar: {
      background: '#162276',
      width: theme.spacing(7),
      height: theme.spacing(7),
    },
    media: {
      height: 0,
      paddingTop: '56.25%'
    },
    cardLink: {
      textDecoration: 'none',
      color: 'inherit'
    }
  }
})


export default function SubjectCards({ subject }) {
  const classes = useStyle()
  const firstName = subject.instructor.split('')[0]

  return (
    <>
      <Card className={classes.root}>
        <Link className={classes.cardLink}
          to={{
            pathname: '/studentFeed',
            search: `?${subject.subjectName}`
          }}>

          <CardActionArea>

            <CardMedia
              className={classes.media}
              image={defaultCoverPhoto}
            />
            <CardHeader
              avatar={
                <Avatar className={classes.avatar} src={subject.image} sizes='medium'>
                  {firstName}
                </Avatar>
              }
              title={subject.subjectName}
              subheader={subject.instructor}
            />

            <Divider />

            <CardContent>
              <Typography sx={{ textAlign: 'center' }} >
                {/* {subject.body} */}
              </Typography>
            </CardContent>
            
          </CardActionArea>
        </Link>
      </Card>
    </>
  )
}
