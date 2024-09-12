import { Box, Button, Grid, TextField, Typography } from '@mui/material'
import axios from 'axios';
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useImmerReducer } from 'use-immer';

const Register = () => {
    const navigate = useNavigate();

    const initialState = {
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        sendRequest: 0,
    };

    const reducerFunction = (draft, action) => {
        switch (action.type) {
            case "catchUsernameChange":
                draft.username = action.usernameChosen;
                break;
            case "catchEmailChange":
                draft.email = action.emailChosen;
                break;
            case "catchPasswordChange":
                draft.password = action.passwordChosen;
                break;
            case "catchConfirmPasswordChange":
                draft.confirmPassword = action.confirmPasswordChosen;
                break;
            case "changeSendRequest":
                draft.sendRequest = draft.sendRequest + 1;
                break;
            default:
                break;
        }
    }

    const [state, dispatch] = useImmerReducer(reducerFunction, initialState);

    const formSubmit = async (e) => {
        e.preventDefault();
        const data = {
            username: state.username,
            email: state.email,
            password: state.password,
            re_password: state.confirmPassword
        };

        try {
            const response = await axios.post(
                "http://localhost:8000/api-auth-djoser/users/",
                data
            );
            console.log(response);
            dispatch({type: 'changeSendRequest'})
            navigate("/");
        }
        catch (err) {
            console.log(err.response);
        }
    }

    
  return (
    <Box sx={{
        width: "50%", 
        marginLeft: "auto", 
        marginRight: "auto", 
        marginTop: "3rem", 
        border: "5px solid black",
        padding: "3rem"
    }}>
        <form onSubmit={formSubmit}>
            <Grid item container justifyContent={"center"} style={{marginTop: "1rem"}}>
                <Typography variant='h4'>Create An Account</Typography>
            </Grid>
            <Grid item container style={{marginTop: "1rem"}}>
                <TextField 
                    label="Username" 
                    variant='outlined' 
                    fullWidth 
                    value={state.username} 
                    onChange={(e) => dispatch({type: 'catchUsernameChange', usernameChosen: e.target.value})}
                />
            </Grid>
            <Grid item container style={{marginTop: "1rem"}}>
                <TextField 
                    label="Email" 
                    variant='outlined' 
                    fullWidth 
                    value={state.email} 
                    onChange={(e) => dispatch({type: 'catchEmailChange', emailChosen: e.target.value})}
                />
            </Grid>
            <Grid item container style={{marginTop: "1rem"}}>
                <TextField 
                    label="Password" 
                    variant='outlined' 
                    fullWidth 
                    type='password' 
                    value={state.password} 
                    onChange={(e) => dispatch({type: 'catchPasswordChange', passwordChosen: e.target.value})}
                />
            </Grid>
            <Grid item container style={{marginTop: "1rem"}}>
                <TextField 
                    label="Confirm Password" 
                    variant='outlined' 
                    fullWidth 
                    type="password" 
                    value={state.confirmPassword} 
                    onChange={(e) => dispatch({type: 'catchConfirmPasswordChange', confirmPasswordChosen: e.target.value})}
                />
            </Grid>
            <Grid item container xs={8} style={{marginTop: "1rem", marginLeft: "auto", marginRight: "auto"}}>
                <Button 
                    variant='contained' 
                    fullWidth 
                    type="submit" 
                    sx={{
                        backgroundColor: "green", 
                        color: "white", 
                        fontSize: "1.1rem", 
                        marginLeft: "1rem",
                        ":hover": {
                            backgroundColor: "green"
                        }
                    }}>
                        Sign Up
                    </Button>
            </Grid>
        </form>
        <Grid item container justifyContent={"center"} style={{marginTop: "1rem"}}>
            <Typography variant='small'>Already have an account? <span onClick={() => navigate("/login")} style={{cursor: "pointer", color: "green"}}>SIGN IN</span></Typography>
        </Grid>
    </Box>
  )
}

export default Register