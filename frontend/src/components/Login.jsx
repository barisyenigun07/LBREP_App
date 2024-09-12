import { Box, Grid, TextField, Typography, Button } from '@mui/material'
import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useImmerReducer } from 'use-immer'
import axios from "axios";
import DispatchContext from '../context/dispatchContext';
import StateContext from '../context/stateContext';


const Login = () => {
  const navigate = useNavigate();
  const globalDispatch = useContext(DispatchContext);
  const globalState = useContext(StateContext);

  const initialState = {
    username: '',
    password: '',
    sendRequest: 0,
    token: ''
  };

  const reducerFunction = (draft, action) => {
    switch (action.type) {
        case "catchUsernameChange":
          draft.username = action.usernameChosen;
          break;
        case "catchPasswordChange":
          draft.password = action.passwordChosen;
          break;
        case "changeSendRequest":
          draft.sendRequest = draft.sendRequest + 1;
          break;
        case "catchToken":
          draft.token = action.tokenValue;
          break;
        default:
            break;
    }
  }

  const [state, dispatch] = useImmerReducer(reducerFunction, initialState);

  const formSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/api-auth-djoser/token/login/",
        {
          username: state.username,
          password: state.password
        }
      );
      console.log(response);
      dispatch({type: 'catchToken', tokenValue: response.data.auth_token});
      globalDispatch({type: 'catchToken', tokenValue: response.data.auth_token})
      //navigate("/");
    }
    catch (err) {
      console.log(err.response);
    }
  }

  const getUser = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api-auth-djoser/users/me/",
        {
          headers: {Authorization: `Token ${state.token}`}
        }
      );
      console.log(response);
      globalDispatch({type: 'userSignsIn', usernameInfo: response.data.username, emailInfo: response.data.email, idInfo: response.data.id})
      navigate("/");
    }
    catch (err) {
      console.log(err.response);
    }
  }

  useEffect(() => {
    if (state.token !== '') {
      getUser();
    }
  })
  
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
              <Typography variant='h4'>Sign In</Typography>
          </Grid>
          <Grid item container style={{marginTop: "1rem"}}>
              <TextField 
                label="Username" 
                variant='outlined' 
                fullWidth
                value={state.username} 
                onChange={(e) => dispatch({type: 'catchUsernameChange', usernameChosen: e.target.value})}/>
          </Grid>
          <Grid item container style={{marginTop: "1rem"}}>
              <TextField 
                label="Password" 
                variant='outlined' 
                fullWidth
                value={state.password} 
                type='password'
                onChange={(e) => dispatch({type: 'catchPasswordChange', passwordChosen: e.target.value})}/>
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
                      SIGN IN
                  </Button>
          </Grid>
      </form>
      <Grid item container justifyContent={"center"} style={{marginTop: "1rem"}}>
          <Typography variant='small'>Don't have an account yet? <span onClick={() => navigate("/register")} style={{cursor: "pointer", color: "green"}}>SIGN UP</span></Typography>
      </Grid>
  </Box>
  )
}

export default Login