import React, { useEffect, useState } from "react";
import { Grid, Paper } from "@mui/material";
import { useAppDispatch } from "../../app/hooks";
import { ItemModel } from "../../redux/types";
import { doLoadItems, ItemToCreate } from "../../redux/slices/item";
import { Button } from "@material-ui/core";

function CardItems() {
     const dispatch = useAppDispatch();
     const [items, setItems] = useState([] as ItemModel[]);
     useEffect(() => {
          const fetchData = async () => {
               const items = await dispatch(doLoadItems()).unwrap();
               setItems(items);
          };
          fetchData();
     }, []);
     const item: ItemToCreate = {
          imageUrl: "image url",
          name: "string",
          count: 90,
          size: {
               width: 10,
               height: 120,
          },
          weightInGrams: 200,
     };
     const spacing = 2;

     return (
          <Grid sx={{ flexGrow: 1, padding: "25px 0" }} container spacing={4}>
               <Grid item xs={12}>
                    <Grid container justifyContent="center" spacing={spacing}>
                         {items.map((item, index) => (
                              <Grid key={`${item.name}+${index}`} item>
                                   <Paper
                                        elevation={6}
                                        sx={{
                                             height: 280,
                                             width: 200,
                                             color: "#fff",
                                             backgroundColor: "#000",
                                        }}
                                   >
                                        <div>
                                             <div>{item.name}
                                                  {item.weightInGrams}</div>
                                             <img src={item.imageUrl} alt="item_image" className="item-image" />
                                        </div>
                                        <button className="item-comments">Comments</button>
                                   </Paper>
                              </Grid>
                         ))}
                    </Grid>
               </Grid>
          </Grid>
     );
}

export default CardItems;