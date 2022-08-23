import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { AppBar, Avatar, Button, Toolbar, Typography } from '@material-ui/core';
import useStyles from './styles'
import memories from '../../images/memories.png'
import { useDispatch } from 'react-redux';
import jwt_decode from 'jwt-decode';

function Navbar() {
    const classes = useStyles();
    const dispatch = useDispatch();
    let navigate = useNavigate();
    let location = useLocation();

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))

    const logoutUser = () => {
        dispatch({ type: 'LOGOUT' });
        navigate('/')
        setUser(null)
    }
    
    useEffect(() => {
      const token = user?.sub || user?.token
      if(token){
        const decodedToken = jwt_decode(token)
        if(decodedToken.exp * 1000 < new Date().getTime()) logoutUser();
      }
      setUser(JSON.parse(localStorage.getItem('profile')))
    }, [location])
    
    
  return (
    <AppBar className={classes.appBar} position='static' color='inherit'>
        <div className={classes.brandContainer}>
            <Typography
                variant='h4'
                className={classes.heading}
                align='center'
                component={Link}
                to='/'
            >
                Memories
            </Typography>
            <img src={memories} className={classes.image} alt="memories logo" height="60" />
        </div>
        <Toolbar className={classes.toolbar}>
            {user ? (
                <div className={classes.profile}>
                    <Avatar
                        className={classes.purple}
                        alt={user.result.name}
                        src={user.result.sub && user.result.picture}
                    >
                        {user.result.name.charAt(0)}
                    </Avatar>
                    <Typography
                        className={classes.userName}
                        variant={'h6'}
                    >
                        {user.result.name}
                    </Typography>
                    <Button
                        variant='contained'
                        className={classes.logout}
                        color='secondary'
                        onClick={logoutUser}
                    >Logout</Button>
                </div>
            ) : (
                    <Button
                        component={Link}
                        to='/auth'
                        variant='contained'
                        className={classes.logout}
                        color='primary'
                    >Sign In</Button>
            )}
        </Toolbar>
    </AppBar>
  )
}

export default Navbar