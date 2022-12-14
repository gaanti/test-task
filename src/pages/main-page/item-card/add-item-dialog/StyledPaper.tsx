import { Paper, styled } from "@mui/material";
import React from "react";

const StyledPaper = styled(Paper)(({ theme }) => ({
     backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
     ...theme.typography.body2,
     padding: theme.spacing(1),
     textAlign: 'center',
     display: 'flex',
     flexDirection: 'row',
     color: theme.palette.text.secondary,
}));
export default React.memo(StyledPaper);
