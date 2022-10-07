import React, { useEffect, useState } from "react";
import { Button, Grid, Modal, Paper } from "@mui/material";
import { useAppDispatch } from "../../app/hooks";
import { ItemModel } from "../../redux/types";
import { doDeleteItem, doLoadItems, ItemToCreate } from "../../redux/slices/item";
import ShowComments from "./show-comments";
import Box from "@mui/material/Box";
import AddItemDialog from "./add-item-dialog/add-item-dialog";

function CardItems() {
     const dispatch = useAppDispatch();
     const [modalOpen, setModalOpen] = useState(false);
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
     const style = {
          position: "absolute" as "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
     };
     const deleteItem = (item_index: number) => {
          dispatch(doDeleteItem(item_index));
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
                                        <div>
                                             <AddItemDialog item={item} />
                                             <Button onClick={() => setModalOpen(true)}>Delete item</Button>
                                             <Modal
                                                  open={modalOpen}
                                                  onClose={() => setModalOpen(false)}
                                                  aria-labelledby="modal-modal-title"
                                                  aria-describedby="modal-modal-description"
                                             >
                                                  <Box sx={style}>
                                                       <h1>Are you sure you want delete this item?</h1>

                                                       <Box sx={{
                                                            display: "flex",
                                                            flexDirection: "row",
                                                            justifyContent: "space-between",
                                                       }}>
                                                            <Button id="modal-modal-description" sx={{ mt: 2 }}
                                                                    variant="outlined" color="secondary"
                                                                    onClick={() => setModalOpen(false)}>
                                                                 No, go back
                                                            </Button>
                                                            <Button id="modal-modal-title" variant="outlined"
                                                                    color="secondary" component="h2" onClick={() => {
                                                                 setModalOpen(false);
                                                                 deleteItem(item.id);
                                                            }}>
                                                                 YES! Just Do IT!
                                                            </Button>
                                                       </Box>
                                                  </Box>
                                             </Modal>
                                        </div>
                                        <ShowComments comments={item.comments} itemId={item.id}></ShowComments>
                                   </Paper>
                              </Grid>
                         ))}
                    </Grid>
               </Grid>
          </Grid>
     );
}

export default CardItems;