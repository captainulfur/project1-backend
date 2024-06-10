import React, { useEffect, useState } from "react";
import Card from "./../../components/Card";
import Grid from "@mui/material/Grid";
import fetchData from "./../../Utils/fetchData"

export default function index() {
  const [products,setProducts]= useState()
  useEffect(() => {
    (async()=>{
      try {
        const res = await fetchData("/products")
        setProducts(res)
      } catch (error) {
        console.log(error);
      }
    })()
  }, []);
  const product = products?.map((e,index)=><Card key={index} name={e.name} price={e.price} image={e.image} id={e.id} />
  )
  return (
    <>
      <Grid container xs={12} sx={{p:5,justifyContent:"center",gap:5}}>
        {product}
      </Grid>
    </>
  );
}
