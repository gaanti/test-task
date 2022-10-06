import * as React from "react";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { ItemModel } from "../../redux/types";
import { doLoadItems, ItemToCreate } from "../../redux/slices/item";
import { useAppDispatch } from "../../app/hooks";
import { Grid, Paper } from "@mui/material";
import "./main-page.styles.scss";
import CardItems from "./card-items";
import NavBar from "../nav-bar";

const bull = (
     <Box
          component="span"
          sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
     >
          •
     </Box>
);

export default function MainPage() {
     return (
          <div>
               <NavBar></NavBar>
               <CardItems></CardItems>
          </div>
     );
}
