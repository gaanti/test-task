import * as React from "react";
import { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Card, Grid, OutlinedInput, Stack, TextField } from "@mui/material";
import { Comment } from "../../redux/types";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { CommentToCreate, doCreateComment, doDeleteComment } from "../../redux/slices/coment";
import { useAppDispatch } from "../../app/hooks";
import CloseIcon from "@mui/icons-material/Close";
import { Item } from "./add-item-dialog/Item";
import { doLoadItems, setItems } from "../../redux/slices/item";

function ShowComments(props: { comments: Comment[], itemId: number }) {
     const dispatch = useAppDispatch();
     const [description, setDescription] = useState("");
     const fetchData = async () => {
          const items = await dispatch(doLoadItems()).unwrap();
          dispatch(setItems(items));
     };
     const comment: CommentToCreate = {
          description: description,
     };
     console.log(comment);
     const item_id = props.itemId;
     const createRequest = { comment, item_id };
     return (<Accordion>
               <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
               >
                    <Typography>Comments</Typography>
               </AccordionSummary>
               <AccordionDetails sx={{ overflow: "scroll", maxHeight: "253px" }}>
                    <Stack direction="column" spacing={2}>
                         {props.comments.map((comment) => {
                              return (<Card color="secondary" variant="outlined">
                                        <Grid direction="column" spacing={2} justifyContent="space-between">
                                             <Grid xs={12}><Item>{comment.description}</Item></Grid>

                                             <Grid xs={3} onClick={() => dispatch(doDeleteComment(comment))}>
                                                  <Item><CloseIcon /></Item>
                                             </Grid>
                                        </Grid>
                                   </Card>);
                         })}

                         <Item><TextField variant="filled" sx={{color:"black"}} color="primary" label="Enter your's comment"
                                              value={description}
                                              onChange={(e) => setDescription(e.target.value)}
                                                   />
                              <IconButton
                                   aria-label="toggle password visibility"
                                   onClick={() => dispatch(doCreateComment(createRequest)).finally(() => {
                                        fetchData()
                                   })}
                                   edge="end"
                              >
                                   <AddBoxIcon></AddBoxIcon>
                              </IconButton>
                         </Item></Stack>
               </AccordionDetails>
          </Accordion>);
}

export default ShowComments;
