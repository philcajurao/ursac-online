import { Box, Button, Card, CardContent, CardHeader, Container, Dialog, DialogContent, DialogTitle, Grid, List, ListItem, makeStyles, Paper, Typography } from '@material-ui/core'
import React from 'react'
import { useState } from 'react'



const useStyle = makeStyles(theme => {
    return {
        title: {
            textAlign: 'center',
            color: '#fefefe'
        },
        answers: {
            border: '1px solid #999',
            borderRadius: '7px',
            marginBottom: theme.spacing(1)
        },
        dialog: {
            backgroundColor: '#162276'
        },
        sample: {
            padding: theme.spacing(2)
        }
    }
})

const choices = [
    {
        question: 'What is something you hit with a hammer?',
        answerChoice: [
            { answer: 'Screw', isCorrect: false },
            { answer: 'Nail', isCorrect: true },
            { answer: 'Wall', isCorrect: false },
            { answer: 'Persons head', isCorrect: false }
        ]
    },
    {
        question: '1 + 1 = ?',
        answerChoice: [
            { answer: '2', isCorrect: true },
            { answer: '3', isCorrect: false },
            { answer: '4', isCorrect: false },
            { answer: '5', isCorrect: false }
        ]
    },
    {
        question: '2 x 2 = ?',
        answerChoice: [
            { answer: '20', isCorrect: false },
            { answer: '5', isCorrect: false },
            { answer: '4', isCorrect: true },
            { answer: '4', isCorrect: false }
        ]
    },
    {
        question: '100 / 0 = ?',
        answerChoice: [
            { answer: '1', isCorrect: false },
            { answer: '100', isCorrect: false },
            { answer: '0', isCorrect: false },
            { answer: 'Error', isCorrect: true },
        ]
    },

]

export default function Quiz() {
    const classes = useStyle()


    const [quiz, setQuiz] = useState(false);
    const openQuiz = () => {
        setQuiz(true)
    }
    const closeQuiz = () => {
        setQuiz(false)
    }


    const [currentQuestion, setCurrentQuestion] = useState(0)
    const handleAnsweredQuestion = (isCorrect) => {
        if (isCorrect) {
            setScore(score + 1)
        }

        const nextQuestion = currentQuestion + 1
        if (nextQuestion < choices.length) {
            setCurrentQuestion(nextQuestion)
        } else {
            setAllDone(true)
        }
    }

    const [allDone, setAllDone] = useState(false)
    const [score, setScore] = useState(0)

    const [switchTab, setSwitchTab] = useState(false)
    const handleBackToQuiz = () => {
        setSwitchTab(false)
    }


    const [consequence, setConsequence] = useState(false)

    const [numberOfWarning, setNumberOfWarning] = useState(1)
    document.addEventListener('visibilitychange', myFunction)
    function myFunction() {
        if (document.hidden) {
            if (numberOfWarning === 2) {
                setConsequence(true)
            } else {
                setNumberOfWarning(numberOfWarning + 1)
            }
        } else {
            setSwitchTab(true)
        }
    }


    window.addEventListener('blur', () => {
        if (numberOfWarning === 2) {
            setConsequence(true)
        } else {
            setNumberOfWarning(numberOfWarning + 1)
        }

        setSwitchTab(true)
    })


    const reload = () => { window.location.reload(true) }
    const disableRightClick = document.addEventListener('contextmenu', event => event.preventDefault());
    let name = `Quiz ${currentQuestion + 1}/${choices.length}`

    return (
        <div className={classes.root}>
            <Button variant='contained' color='secondary' onClick={openQuiz}>
                Open Quiz
            </Button>

            <Dialog classes={{ paper: classes.dialog }} open={quiz} onClose={closeQuiz} fullScreen>
                <Typography variant='h4' className={classes.title}>Finals Examination</Typography>
                <DialogContent>
                    <Box>
                        {consequence ? (
                            <Paper className={classes.sample}>
                                {/* {disableRightClick} */}
                                <Typography variant='h5' gutterBottom>
                                    Sorry! You are now <b>disqualified</b> from the exam because you did not obeyed the rules.
                                    <div style={{ textAlign: 'center', marginTop: '10px' }}>
                                        You scored 0 out of {choices.length} items.
                                    </div>
                                </Typography>
                                <Button variant='contained' fullWidth color='secondary' onClick={closeQuiz}>End Exam</Button>
                            </Paper>
                        ) : (
                            <Container maxWidth='sm'>
                                {disableRightClick}
                                {switchTab ? (
                                    <Paper className={classes.sample} >
                                        <Typography variant='h5' gutterBottom>
                                            <b>Warning!</b> You just caught switching tabs from your browser. This is your <b>last</b> warning
                                        </Typography>
                                        <Button variant='contained' fullWidth color='secondary' onClick={handleBackToQuiz}>Continue Exam</Button>
                                    </Paper>
                                ) : (
                                    <Card elevation={10} >
                                        <Container>
                                            <CardHeader align='center' title={name} subheader='This is just a test.' />
                                            <CardContent>
                                                {allDone ? (
                                                    <Grid item xs={12}>
                                                        <Typography gutterBottom textAlign='center'>
                                                            You scored {score} out of {choices.length} items
                                                        </Typography>
                                                        <Button onClick={reload} fullWidth variant='contained' color='secondary'>Reset</Button>
                                                    </Grid>
                                                ) :

                                                    (<Grid container spacing={1}>

                                                        <Grid item xs={12} lg={6}>
                                                            <Typography>
                                                                {currentQuestion + 1}. {choices[currentQuestion].question}
                                                            </Typography>
                                                        </Grid>


                                                        <Grid item xs={12} lg={6}>
                                                            <List>
                                                                {choices[currentQuestion].answerChoice.map((choice) => (
                                                                    <ListItem onClick={() => handleAnsweredQuestion(choice.isCorrect)} button className={classes.answers} >{choice.answer}</ListItem>
                                                                ))}
                                                            </List>
                                                        </Grid>

                                                    </Grid>
                                                    )}
                                            </CardContent>
                                        </Container>
                                    </Card>
                                )}
                            </Container>
                        )}
                    </Box>
                </DialogContent>
            </Dialog >
        </div >
    )
}
