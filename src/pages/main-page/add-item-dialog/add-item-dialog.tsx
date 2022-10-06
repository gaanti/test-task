import React, { useState } from "react";
import {
     Button,
     Dialog,
     DialogActions,
     DialogContent,
     DialogTitle,
     IconButton, Paper,
     Stack,
     styled,
     TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { Item } from "./Item";
import { BootstrapDialogTitle } from "./bootstrap-dialog-title";
import { useAppDispatch } from "../../../app/hooks";
import { doCreateItem, ItemToCreate } from "../../../redux/slices/item";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
     "& .MuiDialogContent-root": {
          padding: theme.spacing(2),
     },
     "& .MuiDialogActions-root": {
          padding: theme.spacing(1),
     },
}));

function AddItemDialog() {
     const [open, setOpen] = useState(false);
     const handleClose = () => {
          setOpen(false);
     };
     const handleClickOpen = () => {
          setOpen(true);
     };
     const dispatch = useAppDispatch()
     const [imageUrl, setImageUrl] = useState("");
     const [name, setName] = useState("");
     const [count, setCount] = useState(0);
     const [width, setWidth] = useState(0);
     const [height, setHeight] = useState(0);
     const [weightInGrams, setWeightInGrams] = useState(0);
     const itemToCreate: ItemToCreate = {
          imageUrl: imageUrl,
          name: name,
          count: count,
          size: {
               width: width,
               height: height,
          },
          weightInGrams: weightInGrams,

     };
     const addItem = () => {
          dispatch(doCreateItem(itemToCreate))
          handleClose()
     }

     return (
          <div>
               <Button color="secondary" variant="outlined" onClick={handleClickOpen}>
                    Add product
                    <AddBoxIcon/>
               </Button>
               <BootstrapDialog
                    onClose={handleClose}
                    aria-labelledby="customized-dialog-title"
                    open={open}
               >
                    <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                         Product params
                    </BootstrapDialogTitle>
                    <DialogContent dividers>
                         <Stack spacing={2}>
                              <Item>

                                   <TextField id="standard-basic" label="Image url" variant="standard" color="secondary" value={imageUrl} onChange={event => setImageUrl(event.target.value)}/>
                                   <TextField id="standard-basic" label="Name" variant="standard" color="secondary" value={name} onChange={event => setName(event.target.value)}/>
                                   <TextField id="standard-basic" label="Count" variant="standard" color="secondary" value={count} onChange={event => setCount(event.target.value as unknown as number)}/>
                              </Item>
                              <Item>
                                   <TextField id="standard-basic" label="Width" variant="standard" color="secondary" value={width} onChange={event => setWidth(event.target.value as unknown as number)}/>
                                   <TextField id="standard-basic" label="Height" variant="standard" color="secondary" value={height} onChange={event => setHeight(event.target.value as unknown as number)}/>
                                   <TextField id="standard-basic" label="Weight (grams)" variant="standard" color="secondary" value={weightInGrams} onChange={event => setWeightInGrams(event.target.value as unknown as number)}/>
                              </Item>
                         </Stack>
                    </DialogContent>
                    <DialogActions>
                         <Button autoFocus onClick={addItem} color="secondary">
                              Add!
                         </Button>
                    </DialogActions>
               </BootstrapDialog>
          </div>
     );
}


export default AddItemDialog;