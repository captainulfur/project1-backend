import React from "react";
import {
  Button,
  CardActionArea,
  CardActions,
  Typography,
  CardMedia,
  CardContent,
  Card,
} from "@mui/material";
import { Link } from "react-router-dom";

export default function index({name,image,price,id}) {
  return (
    <>
        <Card sx={{ width:260 , borderRadius:3}}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="140"
              image={image}
              alt={name}
              sx={{p:2,borderRadius:3}}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div" fontWeight={"500"}>
                {name}
              </Typography>
              <Typography variant="body2" sx={{fontSize:18,color:"green"}}>
                {price} $
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button size="small" color="primary">
              <Link to={`/product/${id}`}>buy now</Link>
            </Button>
          </CardActions>
        </Card>
    </>
  );
}
