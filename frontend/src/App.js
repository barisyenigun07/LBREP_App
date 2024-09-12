import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Listings from './components/Listings';
import TopBar from './components/TopBar';
import Register from './components/Register';
import Test from './components/Test';
import { useImmerReducer } from 'use-immer';
import DispatchContext from './context/dispatchContext';
import StateContext from './context/stateContext';


function App() {
  const initialState = {
    userUsername: localStorage.getItem('theUserUsername'),
    userEmail: localStorage.getItem('theUserEmail'),
    userId: localStorage.getItem('theUserId'),
    userToken: localStorage.getItem('theUserToken'),
    userIsLogged: localStorage.getItem('theUserUsername') ? true : false
  };

  const reducerFunction = (draft, action) => {
    switch (action.type) {
      case 'catchToken':
        draft.userToken = action.tokenValue;
        break;
      case 'userSignsIn':
        draft.userUsername = action.usernameInfo;
        draft.userEmail = action.emailInfo;
        draft.userId = action.idInfo;
        draft.userIsLogged = true;
        break;
      default:
        break;
    }
  }

  const [state, dispatch] = useImmerReducer(reducerFunction, initialState);

  useEffect(() => {
    if (state.userIsLogged) {
      localStorage.setItem("theUserUsername", state.userUsername);
      localStorage.setItem("theUserEmail", state.userEmail);
      localStorage.setItem("theUserId", state.userId);
      localStorage.setItem("theUserToken", state.userToken);
    }
  }, [state.userIsLogged])

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        <BrowserRouter>
          <TopBar/>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/listings' element={<Listings/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/testing' element={<Test/>}/>
          </Routes>
        </BrowserRouter>
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
}

export default App;
