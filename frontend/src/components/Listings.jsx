import { AppBar, Button, Grid, Typography, Card, CardHeader, CardMedia, CardContent, CircularProgress } from '@mui/material'
import React, { useEffect, useState } from 'react'
import axios from "axios";

import { MapContainer, TileLayer, Marker, Popup, Polyline, Polygon } from 'react-leaflet'
import { Icon } from 'leaflet';

import houseIconPng from "../assets/Mapicons/house.png";
import apartmentIconPng from "../assets/Mapicons/apartment.png";
import officeIconPng from "../assets/Mapicons/office.png";


import polygon from './Shape';

const Listings = () => {
  const houseIcon = new Icon({
    iconUrl: houseIconPng,
    iconSize: [40,40],
  });

  const apartmentIcon = new Icon({
    iconUrl: apartmentIconPng,
    iconSize: [40, 40]
  });

  const officeIcon = new Icon({
    iconUrl: officeIconPng,
    iconSize: [40, 40]
  });

  const polyOne = [
    [51.505, -0.09],
    [51.51, -0.1],
    [51.51, -0.12],
  ];

  const [allListings, setAllListings] = useState([]);
  const [dataIsLoading, setDataIsLoading] = useState(true);

  async function getAllListings() {
    try {
      const response = await axios.get("http://localhost:8000/api/listings/");
      setAllListings(response.data);
      setDataIsLoading(false);
    }
    catch (err) {
      console.log(err.response);
    }
  }

  useEffect(() => {
    getAllListings();
    
  }, []);

  if (!dataIsLoading) {
    console.log(allListings[0].location);
  }

  else {
    return (
      <Grid container justifyContent={"center"} alignItems={"center"} style={{height: "100vh"}}>
        <CircularProgress/>
      </Grid>
    )
  }

  return (
    <Grid container>
      <Grid item xs={4}>
        {allListings.map((listing) => {
          return (
            <Card sx={{margin: "0.25rem", border: "1px solid black", position: "relative"}} key={listing.id}>
              <CardHeader
                title={listing.title}
              />
              <CardMedia
                component="img"
                image={listing.picture1}
                alt={listing.title}
                sx={{paddingRight: "1rem", paddingLeft: "1rem", height: "20rem", width: "30rem"}}
              />
              <CardContent>
                <Typography variant="body2">
                  {listing.description.substring(0,200)}...
                </Typography>
              </CardContent>
              {listing.property_status === "Sale" ? (
                <Typography sx={{position: "absolute", backgroundColor: "green", zIndex: "1000", color: "white", top: "100px", left: "20px", padding: "5px"}}>
                  {listing.listing_type}: $
                  {listing.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </Typography>
              )
              :
              (
                <Typography sx={{position: "absolute", backgroundColor: "green", zIndex: "1000", color: "white", top: "100px", left: "20px", padding: "5px"}}>
                  {listing.listing_type}: $
                  {listing.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                  / {listing.rental_frequency} 
                </Typography>
              )
              }
              
              {/*<CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                  <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="share">
                  <ShareIcon />
                </IconButton>
              </CardActions>*/}
            </Card>
          )
        })}
        
      </Grid>
      <Grid item xs={8} style={{marginTop: "0.5rem"}}>
        <AppBar position="sticky">
          <div style={{height: "100vh"}}>
              <MapContainer center={[51.505, -0.09]} zoom={14} scrollWheelZoom={true}>
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Polyline positions={polyOne} weight={10} color="green"/>
                <Polygon 
                  positions={polygon} 
                  color="yellow" 
                  fillColor="blue" 
                  fillOpacity={0.9}
                  opacity={0}
                />
                {allListings.map((listing) => {
                  function IconDisplay() {
                    if (listing.listing_type === "House") {
                      return houseIcon;
                    }
                    else if (listing.listing_type === "Apartment") {
                      return apartmentIcon;
                    }
                    else if (listing.listing_type === "Office") {
                      return officeIcon;
                    }
                  }
                  return (
                    <Marker
                      key={listing.id}
                      icon={IconDisplay()}
                      position={[
                        listing.location.coordinates[0],
                        listing.location.coordinates[1]
                      ]}
                    >
                      <Popup>
                        <Typography variant='h5'>{listing.title}</Typography>
                        <img src={listing.picture1} alt="House" style={{height: "14rem", width: "18rem"}}/>
                        <Typography variant='body2'>{listing.description.substring(0, 150)}...</Typography>
                        <Button variant="contained">Details</Button>
                      </Popup>
                    </Marker>
                  )
                })}
              </MapContainer>
          </div>
        </AppBar>
      </Grid>
    </Grid>
  )
}

export default Listings