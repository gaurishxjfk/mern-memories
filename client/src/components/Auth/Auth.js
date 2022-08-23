import React, { useState } from 'react'
import { Avatar, Button, Paper, Grid, Typography, Container, TextField } from '@material-ui/core'
import { GoogleLogin, googleLogout } from '@react-oauth/google'
import jwt_decode from 'jwt-decode';
import {LockOutlined} from '@material-ui/icons'
import useStyles from './styles'
import { useDispatch } from 'react-redux';
import Input from './Input'
import { useNavigate } from 'react-router-dom';
import { signUp, signIn } from '../../actions/auth'

const initialData = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' }

const Auth = () => {

    const classes = useStyles();
    const dispatch = useDispatch();
    let navigate = useNavigate();

    const [isSignUp, setIsSignUp] = useState(true);
    const [formData, setFormData] = useState(initialData)
    const [showPassword, setShowPassword] = useState(false);

    const user = false;

    const handleSubmit = (e) => {
        e.preventDefault()
        if(isSignUp){
            dispatch(signUp(formData, navigate))
        } else {
            dispatch(signIn(formData, navigate))
        }
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value})
    }

    const handleShowPassword = (e) => { showPassword ? setShowPassword(false) : setShowPassword(true) }

    const switchModes = () => { isSignUp ? setIsSignUp(false) : setIsSignUp(true) }

    const googleSuccess = async (res) => {
        console.log(res?.credential)
        const decoded = jwt_decode(res?.credential)
        try {
            dispatch({ type: 'AUTH', data: {result: decoded, token: res?.credential}});
            navigate('/')
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <Container component={'main'} maxWidth="xs">
        <Paper className={classes.paper} elevation={3}>
            
            <Avatar className={classes.avatar}>
                <LockOutlined />
            </Avatar>
            <Typography variant='h5'>{isSignUp ? 'Sign Up' : 'Sign In'}</Typography>
            <form className={classes.form} onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    {
                        isSignUp && (
                            <>
                                <Input
                                    name='firstName'
                                    label='First Name'
                                    handleChange={handleChange}
                                    autoFocus
                                    half
                                />
                                <Input
                                    name='lastName'
                                    label='Last Name'
                                    handleChange={handleChange}
                                    half
                                />
                            </>
                        )
                    }
                    <Input
                        name='email'
                        label='Email'
                        handleChange={handleChange}
                        type='email'
                        autoFocus ={!isSignUp && true}
                    />
                    <Input
                        name='password'
                        label='Password'
                        handleChange={handleChange}
                        type={showPassword ? 'text' : 'password'}
                        handleShowPassword = {handleShowPassword}
                    />
                    { isSignUp 
                        && 
                        <Input name='confirmPassword' label='Repeat Password' handleChange={handleChange} type='password'/> 
                    }
                </Grid>
                <Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit}>
                    {isSignUp ? 'Sign Up' : 'Sign In'}
                </Button>
                { user ? ( 
                        <div>Logged In</div> 
                        ) : ( 
                        <GoogleLogin
                            onSuccess={(res) => googleSuccess(res)}
                            onError={() => console.log('Error')}
                        /> 
                    )}
                <Grid container justify="flex-end">
                    <Grid item>
                        <Button onClick={switchModes}>{isSignUp ? 'Already have an account? Sign In' : 'Dont have an account? Sign Up'}</Button>
                    </Grid>
                </Grid>
                <div>
                    
                </div>
            </form>
        </Paper>
    </Container>
  )
}

export default Auth