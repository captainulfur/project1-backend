import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import fetchData from "../../../Utils/fetchData";
import { Avatar, Button } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useAddProduct from "../../../Utils/useAddProduct";
import FilledInput from "@mui/material/FilledInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import { Grid } from "@mui/material";

export default function index() {
  const [products, setProducts] = useState();
  console.log(products);
  useEffect(() => {
    (async () => {
      try {
        const res = await fetchData("/products");
        setProducts(res);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  const onDelet = async (id) => {
    try {
      const res = await fetchData(`/Products/${id}`, {
        method: "DELETE",
      });
      setProducts(products.filter((product) => product.id !== id));
    } catch (error) {
      console.log(error);
    }
  };
  const [open, setOpen] = useState(false);

  const handleClickOpen = (id) => {
    setOpen(true);
    setUpID(id);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [productUp, handelChengUp] = useAddProduct();
  const [productUpID, setUpID] = useState();

  const handelChengAll = async () => {
    try {
      const res = await fetchData(`/Products/${productUpID}`, {
        method: "PATCH",
        body: JSON.stringify(productUp),
        headers: {
          "Content-Type": "application/json",
        },
      });
      setProducts(products.filter((product) => product.id !== id));
    } catch (error) {
      console.log(error);
    }
  };
  const productList = products?.map((e, index) => (
    <TableBody>
      <TableRow
        key={index}
        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
      >
        <TableCell component="th" scope="row">
          {e.id}
        </TableCell>
        <TableCell component="th" scope="row">
          <Avatar src={e.image} />
        </TableCell>
        <TableCell align="right">{e.name}</TableCell>
        <TableCell align="right">{e.price}</TableCell>
        <TableCell align="right">-</TableCell>
        <TableCell align="right">
          <Button
            className="t"
            sx={{ color: "red" }}
            onClick={() => onDelet(e.id)}
          >
            Delet
          </Button>
          <Button onClick={() => handleClickOpen(e.id)} sx={{ color: "blue" }}>
            update
          </Button>
        </TableCell>
      </TableRow>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Update Product"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Grid
              container
              xs={12}
              sx={{
                gap: 2,
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                pt: 1,
                bgcolor: "white",
                height: 1,
              }}
            >
              <TextField
                onChange={handelChengUp}
                id="outlined-basic"
                label="Name"
                name="name"
                variant="outlined"
              />
              <TextField
                onChange={handelChengUp}
                id="outlined-multiline-flexible"
                label="Detail"
                name="detail"
                multiline
                maxRows={4}
              />
              <FormControl sx={{ m: 1 }} variant="filled">
                <InputLabel htmlFor="filled-adornment-amount">
                  Praice
                </InputLabel>
                <FilledInput
                  onChange={handelChengUp}
                  id="filled-adornment-amount"
                  name="price"
                  startAdornment={
                    <InputAdornment position="start">$</InputAdornment>
                  }
                />
              </FormControl>
              <TextField
                onChange={handelChengUp}
                id="outlined-multiline-flexible"
                label="Link image"
                name="image"
                multiline
                maxRows={4}
              />
            </Grid>
            <Button onClick={handelChengAll}>Update</Button>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </TableBody>
  ));

  return (
    <>
      <TableContainer component={Paper} sx={{ height: 1, width: "100%" }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>image</TableCell>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Brand</TableCell>
              <TableCell align="right">Brand</TableCell>
            </TableRow>
          </TableHead>
          {productList}
        </Table>
      </TableContainer>
    </>
  );
}
