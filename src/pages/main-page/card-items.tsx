import React, { useEffect, useState } from "react";
import { Button, Grid, Modal, Paper, Stack } from "@mui/material";
import { useAppDispatch } from "../../app/hooks";
import {
     doDeleteItem,
     doLoadItems, doReloadItems,
     itemsSelector,
     ItemToCreate,
     setItems,
} from "../../redux/slices/item";
import ShowComments from "./show-comments";
import Box from "@mui/material/Box";
import AddItemDialog from "./add-item-dialog/add-item-dialog";
import { Item } from "./add-item-dialog/Item";
import { useSelector } from "react-redux";

function CardItems() {
     const dispatch = useAppDispatch();
     const items = useSelector((itemsSelector));
     const [modalOpen, setModalOpen] = useState(false);
     useEffect(() => {
          dispatch(doLoadItems())
     }, []);
     const fetchData = async () => {
          const items = await dispatch(doLoadItems()).unwrap();
          dispatch(setItems(items))
     };
     const item: ItemToCreate = {
          imageUrl: "image url", name: "string", count: 90, size: {
               width: 10, height: 120,
          }, weightInGrams: 200,
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
          dispatch(doDeleteItem(item_index)).finally(() => {
               fetchData()
          });
          ;
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
                              <Stack direction='column' justifyContent="center">
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
                              <div>
                                   <Stack direction="row"><Item><AddItemDialog item={item} /></Item>
                                        <Item><Button
                                             variant="outlined" color="anger"
                                             onClick={() => setModalOpen(true)}
                                        >Delete</Button></Item></Stack>
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
                                                          color="secondary" component="h2" onClick={async () => {
                                                       setModalOpen(false);
                                                       await deleteItem(item.id);
                                                  }}>
                                                       YES! Just Do IT!
                                                  </Button>
                                             </Box>
                                        </Box>
                                   </Modal>
                              </div>
                              <ShowComments comments={item.comments} itemId={item.id}></ShowComments>
                         </Paper>
                    </Grid>))}
               </Grid>
          </Grid>
     </Grid>);
}

export default CardItems;