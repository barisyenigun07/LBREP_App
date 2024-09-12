import React from 'react'
import city from "../assets/city.jpg"
import { Box, Button, Typography } from '@mui/material'

const Home = () => {
  return (
    <>
      <Box sx={{position: "relative"}}>
        <img src={city} alt="City" style={{width: "100%", height: "92vh"}}/>
        <Box sx={{position: "absolute", zIndex: "100", top: "100px", left: "20px", textAlign: "center"}}>
          <Typography variant="h1" sx={{color: "white", fontWeight: "bolder"}}>FIND YOUR  <span style={{color: "green"}}>NEXT PROPERTY</span> ON THE LBREP SITE</Typography>
          <Button variant="contained" sx={{fontSize: "3.5rem", borderRadius: "15px", backgroundColor: "green", marginTop: "2rem", boxShadow: "3px 3px 3px white", color: "white"}}>SEE ALL PROPERTIES</Button>
        </Box>
      </Box>
    </>
  )
}

export default Home