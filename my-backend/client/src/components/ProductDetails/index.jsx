import React, { useEffect, useState } from "react";
import fetchData from "../../Utils/fetchData";
import { Link, useParams } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export default function index() {
  const [product, setProduct] = useState();

  const { id } = useParams();
  useEffect(() => {
    (async () => {
      try {
        const res = await fetchData(`/products/${id}`);
        setProduct(res);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  const productD = product?.map((e) => (
    <Grid container xs={12} py={3}>
      <Grid container xs={6}>
        <Avatar
          alt={e.name}
          src={e.image}
          sx={{ width: "100%", height: "90vh", borderRadius: 0 }}
        />
      </Grid>
      <Grid
        container
        xs={6}
        sx={{ flexDirection: "column", p: 10, gap: 15, color: "white" }}
      >
        <Typography variant="h2">{e.name}</Typography>
        <Typography variant="h3">{e.price} $</Typography>
        <Typography variant="p" fontSize={20}>
          {e.detail}
        </Typography>
        <Button
          size="small"
          sx={{
            bgcolor: "white",
            ":hover": { bgcolor: "white" },
            color: "black",
          }}
        >
          buy
        </Button>
      </Grid>
      
    </Grid>
  ));
  return <>{productD}</>;
}
