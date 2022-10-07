import React, { useState } from "react";
import { Alert, Button, Dialog, DialogActions, DialogContent, Stack, styled, TextField } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import AddBoxIcon from "@mui/icons-material/AddBox";
import StyledPaper from "./StyledPaper";
import BootstrapDialogTitle from "./bootstrap-dialog-title";
import { useAppDispatch } from "../../../../app/hooks";
import { doCreateItem, doLoadItems, doUpdateItem, ItemToCreate, setItems } from "../../../../redux/slices/item";
import { ItemModel } from "../../../../redux/types";
import { Snackbar } from "@material-ui/core";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
     "& .MuiDialogContent-root": {
          padding: theme.spacing(2),
     }, "& .MuiDialogActions-root": {
          padding: theme.spacing(1),
     },
}));

function AddItemDialog(props: { item?: ItemModel }) {
     const [success, setSuccess] = useState(false);
     const [open, setOpen] = useState(false);
     const fetchData = async () => {
          const items = await dispatch(doLoadItems()).unwrap();
          dispatch(setItems(items));
     };
     const handleClose = () => {
          setOpen(false);
     };
     const handleClickOpen = () => {
          setOpen(true);
     };
     const dispatch = useAppDispatch();
     const [imageUrl, setImageUrl] = useState(props.item?.imageUrl || "");
     const [name, setName] = useState(props.item?.name || "");
     const [count, setCount] = useState(props.item?.count || 0);
     const [width, setWidth] = useState(props.item?.size?.width || 0);
     const [height, setHeight] = useState(props.item?.size?.height || 0);
     const [weightInGrams, setWeightInGrams] = useState(props.item?.weightInGrams || 0);
     const itemToCreate: ItemToCreate = {
          imageUrl: imageUrl, name: name, count: count, size: {
               width: width, height: height,
          }, weightInGrams: weightInGrams,

     };
     const addItem = () => {
          dispatch(doCreateItem(itemToCreate)).finally(() => {
               fetchData();
               setSuccess(true);
          });
          handleClose();
     };
     const editItem = () => {
          // @ts-ignore
          const item_id = props.item.id!;
          dispatch(doUpdateItem({ itemToCreate, item_id })).finally(() => {
               fetchData();
               setSuccess(true);
          });
          handleClose();
     };

     return (<div>
          <Snackbar open={success} autoHideDuration={6000} onClose={() => setSuccess(false)}>
               <Alert onClose={() => setSuccess(false)} severity="success" sx={{ width: "100%" }}>
                    Action successful
               </Alert>
          </Snackbar>
          <Button color={`${props.item ? "steelBlue" : "secondary"}`} variant="outlined" onClick={handleClickOpen}>
               <div>{props.item ? "Edit" : "Add item"}</div>
               <div>{props.item ? <EditIcon /> : <AddBoxIcon />}</div>
          </Button>
          <BootstrapDialog
               onClose={handleClose}
               aria-labelledby="customized-dialog-title"
               open={open}
          >
               <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                    Product params
                    {props.item ? "Edit product params" : "Add product params"}
               </BootstrapDialogTitle>
               <DialogContent dividers>
                    <Stack spacing={2}>
                         <StyledPaper>

                              <TextField id="standard-basic" label="Image url" variant="standard"
                                         color="secondary" value={imageUrl}
                                         onChange={event => setImageUrl(event.target.value)} />
                              <TextField id="standard-basic" label="Name" variant="standard"
                                         color="secondary" value={name}
                                         onChange={event => setName(event.target.value)} />
                              <TextField id="standard-basic" label="Count" variant="standard"
                                         color="secondary" value={count}
                                         onChange={event => setCount(event.target.value as unknown as number)} />
                         </StyledPaper>
                         <StyledPaper>
                              <TextField id="standard-basic" label="Width" variant="standard"
                                         color="secondary" value={width}
                                         onChange={event => setWidth(event.target.value as unknown as number)} />
                              <TextField id="standard-basic" label="Height" variant="standard"
                                         color="secondary" value={height}
                                         onChange={event => setHeight(event.target.value as unknown as number)} />
                              <TextField id="standard-basic" label="Weight (grams)" variant="standard"
                                         color="secondary" value={weightInGrams}
                                         onChange={event => setWeightInGrams(event.target.value as unknown as number)} />
                         </StyledPaper>
                    </Stack>
               </DialogContent>
               <DialogActions>
                    <Button autoFocus onClick={handleClose} color="warning">
                         Cancel
                    </Button>
                    {props.item ? <Button autoFocus onClick={editItem} color="secondary">
                         Save changes
                    </Button> : <Button autoFocus onClick={addItem} color="secondary">
                         Add!
                    </Button>}
               </DialogActions>
          </BootstrapDialog>
     </div>);
}


export default React.memo(AddItemDialog);