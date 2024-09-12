import React, { useContext } from 'react'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { Box, Typography, Menu, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import StateContext from '../context/stateContext';

const TopBar = () => {
    const navigate = useNavigate();
    const globalState = useContext(StateContext);

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
  return (
    <AppBar position="static" sx={{backgroundColor: "black"}}>
        <Toolbar sx={{display: "flex", justifyContent: "space-between"}}>
            <Box>
                <Button color="inherit" onClick={() => navigate("/")}>
                    <Typography variant="h4">LBREP</Typography>
                </Button> 
            </Box>
            <Box>
                <Button color="inherit" onClick={() => navigate("/listings")}>Listings</Button>
                <Button color="inherit">Agencies</Button>
            </Box> 
            <Box>
            <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                Dashboard
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu>
                <Button 
                    sx={{
                        backgroundColor: "green", 
                        marginRight: "1.5rem", 
                        ":hover": {backgroundColor: "green"}
                    }} 
                    color="inherit"
                    >
                        Add Property
                    </Button>
                {globalState.userIsLogged ? (
                    <Button variant="contained" color="error">{globalState.userUsername}</Button>
                ): (
                    <Button 
                    sx={{
                        backgroundColor: "white", 
                        color: "black", 
                        ":hover": {backgroundColor: "white"}
                    }} 
                    onClick={() => navigate("/login")}
                >
                    Login
                </Button>
                )}
            </Box>
        </Toolbar>
      </AppBar>
  )
}

export default TopBar