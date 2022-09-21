import React from 'react'
import { makeStyles, Paper, Typography } from '@material-ui/core'

const useStyle = makeStyles((theme) => {
    return {
        activityList: {
            padding: theme.spacing(2)
        }
    }
})

export default function StudentActivities({ activity }) {
    const classes = useStyle()

    return (
        <>
            <Paper className={classes.activityList} variant='outlined'>
                <Typography variant='h6'>
                {activity.title}:
                </Typography>
                <Typography variant='body2'>
                 {activity.details}
                </Typography>
            </Paper>
        </>
    )
}
