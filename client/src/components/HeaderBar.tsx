import {AppBar, Typography} from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import React from "react";

export function HeaderBar() {
  return (
    <div style={{ width: '24rem', margin: 'auto', marginTop: '0rem' }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">GPT Client</Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}
