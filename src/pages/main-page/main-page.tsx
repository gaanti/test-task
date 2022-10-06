import * as React from "react";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { ItemModel } from "../../redux/types";
import { doLoadItems, ItemToCreate } from "../../redux/slices/item";
import { useAppDispatch } from "../../app/hooks";
import { Grid, Paper } from "@mui/material";
import "./main-page.styles.scss";

const bull = (
     <Box
          component="span"
          sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
     >
          •
     </Box>
);

export default function MainPage() {
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
     const jsx = `
<Grid container spacing={1}>
`;
     const spacing = 1;

     return (
          <Grid sx={{ flexGrow: 1 }} container spacing={2}>
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
                                             {/*<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQARfTOMEBVV1_3fc3Ga_9E_UZ1pBnSGRHCG-qkB-3czg&s" alt="item_image" />*/}
                                        </div>
                                   </Paper>
                              </Grid>
                         ))}
                    </Grid>
               </Grid>
          </Grid>
     );
}
