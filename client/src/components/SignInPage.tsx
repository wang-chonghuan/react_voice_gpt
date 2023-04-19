import React, {useState} from "react";

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar'

import {authorize} from "../auth/authorize";
import { useNavigate } from 'react-router-dom';
import {
  authenticateAction,
  authenticatedAction,
  authorizeAction,
  authorizedAction, unauthenticatedAction,
  User,
  UserReq
} from "../store/userSlice";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../store/store";
import {authenticate} from "../auth/authenticate";

function SignInPage() {

  // 从textfield里取到用户名和密码，保存在这个状态里，供登录使用
  const [userReq, setUserReq] = useState<UserReq>({
    username: '',
    password: ''
  });
  const [open, setOpen] = useState(false);

  const loading = useSelector((state: RootState) => state.user.loading);
  const dispatch = useDispatch();
  // 用于登录成功后导航到聊天页面
  const navigate = useNavigate();

  // 用户输入时，填充UserReq
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserReq({...userReq, [event.target.name]: event.target.value});
  }

  // 用户按登录按钮时，调用这个函数，是异步的，界面不会卡住
  const login = async () => {
    try {
      console.log('login before fetch v6: ', userReq);
      // 设置全局状态，进入正在认证状态
      dispatch(authenticateAction());
      const response = await fetch(process.env.REACT_APP_MAIVC_URL! + 'login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(userReq),
      });
      console.log('login Response:', response);
      if (response.status === 401) {
        loginFailed('Login failed: Unauthorized');
        return;
      }

      // 登录请求结束，从返回结果里取出jwt供后续访问其他接口使用
      const jwtToken = response.headers.get('Authorization');
      if (jwtToken !== null) {
        console.log('Authorization jwt success: ', localStorage.getItem('jwt'));
        // 把用户名和jwt存储在本地session里，供下次开新窗口时使用，避免再次登录
        localStorage.setItem('username', userReq.username);
        localStorage.setItem('jwt', jwtToken);
        // 构造一个User对象，保存进context里，供其他地方使用
        // 注意，是通过dispatch存进context，同时设置了全局状态为已登录
        const userRes: User = {
          username: userReq.username,
          jwt: jwtToken
        };
        dispatch(authenticatedAction(userRes));
        // 设置权限，比如未付费用户和付费用户的权限，但是暂不实现该功能
        dispatch(authorizeAction());
        const authorizedPermissions = await authorize(userRes.username);
        dispatch(authorizedAction(authorizedPermissions));
        // 跳转到聊天页面
        navigate(`/chatpage`);
      } else {
        loginFailed('Authorization jwt is null');
      }
    } catch (e) {
      loginFailed(e);
    }
  };

  function loginFailed(errMsg: any) {
    console.log('login failed:', errMsg);
    dispatch(unauthenticatedAction());
    setOpen(true);
  }

  return (
    <div>
      <Stack spacing={2} alignItems='center' mt={6}>
        <TextField
          name="username"
          label="Username"
          onChange={handleChange}/>
        <TextField
          type="password"
          name="password"
          label="Password"
          onChange={handleChange}/>
        <Button
          variant="contained"
          color="primary"
          disabled={loading}
          onClick={login}>
          {loading ? '...' : 'Sign In'}
        </Button>
        {/*user ? (<span className="ml-auto font-bold">{user.username} has signed in</span>) : (<></>)*/}
        <Snackbar
          open={open}
          autoHideDuration={3000}
          onClose={() => setOpen(false)}
          message="Login failed: Check your username and password"
        />
      </Stack>
    </div>
  );
}

export default SignInPage;
