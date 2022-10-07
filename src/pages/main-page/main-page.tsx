import * as React from "react";
import Box from "@mui/material/Box";
import "./main-page.styles.scss";
import CardItems from "./item-card/card-items";
import NavBar from "./navbar/nav-bar";

export default function MainPage() {
     return (
          <div>
               <NavBar></NavBar>
               <CardItems></CardItems>
          </div>
     );
}
