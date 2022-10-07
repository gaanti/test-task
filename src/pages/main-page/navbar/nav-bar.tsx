import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import AddBoxIcon from '@mui/icons-material/AddBox';
import AddItemDialog from "../item-card/add-item-dialog/add-item-dialog";

function NavBar() {
     return (
          <Box sx={{ flexGrow: 1 }}>
               <AppBar position="sticky" color="primary" sx={{ bgcolor: "white", color: "black" }}>
                    <Toolbar>
                         <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                              My products
                         </Typography>
                         <AddItemDialog />
                    </Toolbar>
               </AppBar>
          </Box>
     );
}

export default NavBar;