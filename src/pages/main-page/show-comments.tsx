import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Card, OutlinedInput } from "@mui/material";
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
                         {props.comments.map((comment) => {
                              return(
                                   <Card>
                                        {comment.description}

                                        <div onClick={() => dispatch(doDeleteComment(comment))}>
                                             <CloseIcon  />
                                        </div>
                                   </Card>
                              )
                         })}

                         <OutlinedInput color="secondary" label="Enter your's comment"
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
                                    }/>
               </AccordionDetails>
          </Accordion>
     )
          ;
}

export default ShowComments;
