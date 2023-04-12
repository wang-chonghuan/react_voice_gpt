import {AppBar, Box, Typography} from "@mui/material";
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
    <div style={{display: 'flex', justifyContent: 'center', width: '100%'}}>
      <AppBar position="static">
        <Toolbar>
          <Box display="flex" alignItems="baseline">
            <Typography variant="h5" className="text-yellow-300 font-bold mr-4" noWrap>
              MultiPal.AI
            </Typography>
            <Box display="flex" flexDirection="column">
              <Typography variant="caption" noWrap>
                <span className="ml-3 text-base">
                  Bots with Voice
                </span>
              </Typography>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
}






