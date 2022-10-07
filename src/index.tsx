import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import App from "./App";
import "./styles/App.scss";
import { theme } from "./styles/theme";
import { StyledEngineProvider, ThemeProvider } from "@mui/material";

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
     <React.StrictMode>
          <StyledEngineProvider injectFirst>
               <Provider store={store}>
                    <ThemeProvider theme={theme}>
                         <App />
                    </ThemeProvider>
               </Provider>
          </StyledEngineProvider>
     </React.StrictMode>,
);
