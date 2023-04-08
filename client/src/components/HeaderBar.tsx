import {AppBar, Typography} from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import React from "react";

/**
 * 为什么这个组件在我缩小屏幕宽度时，会在右侧出现空白呢？
 * 这是因为你使用了一个外部 div 包裹 AppBar，并将 display 设置为 'flex'，justifyContent 设置为 'center'。
 * 这样做会导致 AppBar 的外部 div 在屏幕缩小时产生空白。
 * 为了解决这个问题，你可以直接将 AppBar 组件的宽度设置为100%，并去掉外部 div。
 */
export function HeaderBar() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" noWrap>
            GPT Client
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}






