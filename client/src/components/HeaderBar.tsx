import {AppBar, Box, Typography} from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import React from "react";
import {useAppContext} from "../auth/AppContext";

/**
 * 为什么这个组件在我缩小屏幕宽度时，会在右侧出现空白呢？
 * 这是因为你使用了一个外部 div 包裹 AppBar，并将 display 设置为 'flex'，justifyContent 设置为 'center'。
 * 这样做会导致 AppBar 的外部 div 在屏幕缩小时产生空白。
 * 为了解决这个问题，你可以直接将 AppBar 组件的宽度设置为100%，并去掉外部 div。
 */
export function HeaderBar() {
  const {updatePrompt} = useAppContext();

  return (
    <div className="navbar bg-base-300 rounded-box">
      <div className="flex-1 px-2 lg:flex-none">
        <a className="text-lg font-bold">Multipal.AI</a>
      </div>
      <div className="flex justify-end flex-1 px-2">
        <div className="flex items-stretch">
          <a className="btn btn-ghost rounded-btn">Settings</a>
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost rounded-btn">Prompts</label>
            <ul tabIndex={0} className="menu dropdown-content p-2 shadow bg-base-100 rounded-box w-52 mt-4">
              <li onClick={() => {
                console.log("click first prompt");
                updatePrompt("我是四岁孩子，请你接下来的回答都简单一点，每个回答不超过50个字。")}}
              >
                <a>Short answer</a>
              </li>
              <li><a>Translator</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}






