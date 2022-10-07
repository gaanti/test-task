import React, { useEffect } from "react";
import { Grid, Paper, Stack } from "@mui/material";
import { useAppDispatch } from "../../../app/hooks";
import { doLoadItems, itemsSelector, setItems } from "../../../redux/slices/item";
import CommentsAccordion from "./comments-accordion";
import { useSelector } from "react-redux";
import DeleteItemDialog from "./delete-item-dialog";

function CardItems() {
     const dispatch = useAppDispatch();
     const items = useSelector((itemsSelector));
     useEffect(() => {
          dispatch(doLoadItems());
     }, []);
     const fetchData = async () => {
          const items = await dispatch(doLoadItems()).unwrap();
          dispatch(setItems(items));
     };
     const spacing = 2;

     return (<Grid sx={{ flexGrow: 1, padding: "25px 0" }} container spacing={4}>
          <Grid item xs={12}>
               <Grid container justifyContent="center" spacing={spacing}>
                    {items?.map((item, index) => (<Grid key={`${item.name}+${index}`} item>
                         <Paper
                              elevation={6}
                              sx={{
                                   height: "auto", width: "min-content", color: "#fff", backgroundColor: "#000",
                              }}
                         >
                              <Stack direction="column" justifyContent="center">
                                   <div className="item-name">{item.name}</div>
                                   <img src={item.imageUrl} alt="item-image" className="item-image" />
                                   <div className="COLUMN">
                                        <Stack direction="column" spacing={1} padding="10px">
                                             <div className="item-param">Weight: {item.weightInGrams}gr.</div>
                                             <div className="item-param">Count: {item.count}</div>
                                             <div className="item-param">Width: {item.size.width}cm.</div>
                                             <div className="item-param">Height: {item.size.height}cm.</div>
                                        </Stack>
                                   </div>
                              </Stack>
                              <DeleteItemDialog item={item} fetchData={fetchData}></DeleteItemDialog>
                              <CommentsAccordion comments={item.comments} itemId={item.id}></CommentsAccordion>
                         </Paper>
                    </Grid>))}
               </Grid>
          </Grid>
     </Grid>);
}

export default React.memo(CardItems);