import React, { useState } from "react";
import { Button, Modal, Stack } from "@mui/material";
import StyledPaper from "./add-item-dialog/StyledPaper";
import AddItemDialog from "./add-item-dialog/add-item-dialog";
import Box from "@mui/material/Box";
import { deleteItem } from "../../../app/api/item.api";
import { ItemModel } from "../../../redux/types/itemModel";

function DeleteItemDialog(props: { item: ItemModel, fetchData: () => Promise<void> }) {
     const [modalOpen, setModalOpen] = useState(false);

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


     return (<div>
          <Stack direction="row"><StyledPaper><AddItemDialog item={props.item} /></StyledPaper>
               <StyledPaper><Button
                    variant="outlined" color="anger"
                    onClick={() => setModalOpen(true)}
               >Delete</Button></StyledPaper></Stack>
          <Modal
               open={modalOpen}
               onClose={() => setModalOpen(false)}
               aria-labelledby="modal-modal-title"
               aria-describedby="modal-modal-description"
          >
               <Box sx={style}>
                    <h1>Are you sure you want delete this item?</h1>

                    <Box sx={{
                         display: "flex", flexDirection: "row", justifyContent: "space-between",
                    }}>
                         <Button id="modal-modal-description" sx={{ mt: 2 }}
                                 variant="outlined" color="secondary"
                                 onClick={() => setModalOpen(false)}>
                              No, go back
                         </Button>
                         <Button id="modal-modal-title" variant="outlined"
                                 color="secondary" component="h2" onClick={async () => {
                              setModalOpen(false);
                              await deleteItem(props.item.id).then(() => {
                                   props.fetchData();
                              });
                         }}>
                              YES! Just Do IT!
                         </Button>
                    </Box>
               </Box>
          </Modal>
     </div>);
}

export default React.memo(DeleteItemDialog);