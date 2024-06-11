import React, { useEffect, useState } from "react";
import FilledInput from "@mui/material/FilledInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SvgIcon from "@mui/material/SvgIcon";
import { Grid, styled } from "@mui/material";
import fetchData from "../../../Utils/fetchData";
import useAddProduct from "../../../Utils/useAddProduct";


export default function Index() {

  const [product, handelCheng] = useAddProduct()
 
    const handelChengAll = async()=>{
        if(product){
            try {
                const res = await fetchData("/products",{
                    method: 'POST',
                    body: JSON.stringify(product),
                    headers: {
                      'Content-Type': 'application/json'
                    }
                });
              } catch (error) {
                console.log(error);
              }
        }
    }

  return (
    <>
        
      <Grid container xs={12} sx={{  gap: 2, flexDirection:"column",justifyContent:"center" ,alignItems:"center",pt:1,bgcolor:"white",height:1}}>
        <TextField onChange={handelCheng} id="outlined-basic" label="Name" name="name" variant="outlined" />
        <TextField
        onChange={handelCheng}
          id="outlined-multiline-flexible"
          label="Detail"
          name="detail"
          multiline
          maxRows={4}
        />
        <FormControl sx={{ m: 1 }} variant="filled">
          <InputLabel  htmlFor="filled-adornment-amount">Praice</InputLabel>
          <FilledInput
          onChange={handelCheng}
            id="filled-adornment-amount"
            name="price"
            startAdornment={<InputAdornment  position="start">$</InputAdornment>}
          />
        </FormControl>
        <TextField
        onChange={handelCheng}
          id="outlined-multiline-flexible"
          label="Link image"
          name="image"
          multiline
          maxRows={4}
        />
        <Button onClick={handelChengAll}>
            update
        </Button>
      </Grid>
    </>
  );
}
