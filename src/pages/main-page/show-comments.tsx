import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Card, Grid, OutlinedInput, Stack } from "@mui/material";
import { Comment } from "../../redux/types";
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import AddBoxIcon from '@mui/icons-material/AddBox';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { CommentToCreate, doCreateComment, doDeleteComment } from "../../redux/slices/coment";
import { useAppDispatch } from "../../app/hooks";
import { useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import { Item } from "./add-item-dialog/Item";

function ShowComments(props: {comments:Comment[], itemId: number}) {
     const dispatch = useAppDispatch()
     const [description, setDescription] = useState("");
     const comment: CommentToCreate = {
          description:description
     }
     console.log(comment);
     const item_id = props.itemId
     const createRequest = {comment, item_id}
     return (
          <Accordion>
               <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
               >
                    <Typography>Comments</Typography>
               </AccordionSummary>
               <AccordionDetails sx={{ overflow: "scroll", maxHeight: "253px" }}>
                    <Stack direction="column" spacing={2} >
                         {props.comments.map((comment) => {
                              return (
                                   <Card color="secondary" variant="outlined">
                                        <Grid direction="column" spacing={2} justifyContent="space-between">
                                             <Grid xs={12}><Item>{comment.description}</Item></Grid>

                                             <Grid xs={3} onClick={() => dispatch(doDeleteComment(comment))}>
                                                  <Item><CloseIcon /></Item>
                                             </Grid>
                                        </Grid>
                                   </Card>
                              );
                         })}

                         <Item><OutlinedInput color="secondary" label="Enter your's comment"
                                               value={description}
                                               onChange={(e) => setDescription(e.target.value)}
                                               endAdornment={
                                                    <InputAdornment position="end">
                                                         <IconButton
                                                              aria-label="toggle password visibility"
                                                              onClick={() => dispatch(doCreateComment(createRequest))}
                                                              edge="end"
                                                         >
                                                              <AddBoxIcon></AddBoxIcon>
                                                         </IconButton>
                                                    </InputAdornment>
                                               } /></Item></Stack>
               </AccordionDetails>
          </Accordion>
     )
          ;
}

export default ShowComments;
