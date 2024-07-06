import { Box, CircularProgress } from "@mui/material";
import React from "react";

const Loader = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        // border: "1px solid black",
        backgroundColor:"#FFF9D0"
      }}
    >
      <CircularProgress size={100} />
    </Box>
  );
};

export default Loader;
