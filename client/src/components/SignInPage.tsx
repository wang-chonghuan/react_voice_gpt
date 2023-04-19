import React, {useState} from "react";

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
import Alert from "./Alert";

function SignInPage() {

  // 从textfield里取到用户名和密码，保存在这个状态里，供登录使用
  const [userReq, setUserReq] = useState<UserReq>({
    username: '',
    password: ''
  });
  const [showAlert, setShowAlert] = useState(false);

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
    console.log('loginFailed:', errMsg);
    dispatch(unauthenticatedAction());
    // 这里set之后，没有再set回去，所以下次就不会再弹出了，因为状态没变！
    setShowAlert(true);
  }

  return (
    <div className="container mt-10 gap-y-8 flex flex-col justify-center items-center">
        <input
          name="username"
          type="text"
          placeholder="Username"
          onChange={handleChange}
          className="input input-bordered w-full max-w-xs"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          className="input input-bordered w-full max-w-xs"
        />
        <button
          className="btn btn-primary"
          disabled={loading}
          onClick={login}>
          {loading ? '...' : 'Sign In'}
        </button>
        {/* 根据showAlert的值决定是否显示警告 */}
        {
          showAlert ?
          <Alert
            alertType="error"
            message="Invalid username or password"
            duration={3000}
            open={showAlert}
            onClose={() => {setShowAlert(false)}}
          />
         :
          <></>
        }
    </div>
  );
}

export default SignInPage;
