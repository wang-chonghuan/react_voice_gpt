import React, {useState} from "react";

import {authorize} from "../auth/authorize";
import {useNavigate} from 'react-router-dom';
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

  // 如果container容器设置了mt-10,会把整个页面往下推，导致footer溢出屏幕。所以可以用pt-10，但不要用mt-10
  return (
    <div
      className="container flex flex-col justify-between items-center min-h-screen h-screen max-h-screen w-full">
      <div className="max-w-xs w-full mt-10 flex-grow">
        <figure><img src="/logo.jpg" alt="logo" className="w-full rounded-xl"/></figure>
        <div className="max-w-xs w-full mt-10 gap-y-8 flex flex-col justify-start items-center">
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
                onClose={() => {
                  setShowAlert(false)
                }}
              />
              :
              <></>
          }
        </div>
      </div>
      <footer className="p-4 bg-base-300 text-base-content mt-0 mb-0 w-full fixed bottom-0">
        <div className="flex flex-row gap-4 justify-center items-center">
          <a>
            <img alt="github" className="w-[24px] h-[24px]"
                 src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjwhRE9DVFlQRSBzdmcgIFBVQkxJQyAnLS8vVzNDLy9EVEQgU1ZHIDEuMC8vRU4nICAnaHR0cDovL3d3dy53My5vcmcvVFIvMjAwMS9SRUMtU1ZHLTIwMDEwOTA0L0RURC9zdmcxMC5kdGQnPjxzdmcgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMzIgMzIiIGhlaWdodD0iMzJweCIgaWQ9IkxheWVyXzEiIHZlcnNpb249IjEuMCIgdmlld0JveD0iMCAwIDMyIDMyIiB3aWR0aD0iMzJweCIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+PHBhdGggY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMTYuMDAzLDBDNy4xNywwLDAuMDA4LDcuMTYyLDAuMDA4LDE1Ljk5NyAgYzAsNy4wNjcsNC41ODIsMTMuMDYzLDEwLjk0LDE1LjE3OWMwLjgsMC4xNDYsMS4wNTItMC4zMjgsMS4wNTItMC43NTJjMC0wLjM4LDAuMDA4LTEuNDQyLDAtMi43NzcgIGMtNC40NDksMC45NjctNS4zNzEtMi4xMDctNS4zNzEtMi4xMDdjLTAuNzI3LTEuODQ4LTEuNzc1LTIuMzQtMS43NzUtMi4zNGMtMS40NTItMC45OTIsMC4xMDktMC45NzMsMC4xMDktMC45NzMgIGMxLjYwNSwwLjExMywyLjQ1MSwxLjY0OSwyLjQ1MSwxLjY0OWMxLjQyNywyLjQ0MywzLjc0MywxLjczNyw0LjY1NCwxLjMyOWMwLjE0Ni0xLjAzNCwwLjU2LTEuNzM5LDEuMDE3LTIuMTM5ICBjLTMuNTUyLTAuNDA0LTcuMjg2LTEuNzc2LTcuMjg2LTcuOTA2YzAtMS43NDcsMC42MjMtMy4xNzQsMS42NDYtNC4yOTJDNy4yOCwxMC40NjQsNi43Myw4LjgzNyw3LjYwMiw2LjYzNCAgYzAsMCwxLjM0My0wLjQzLDQuMzk4LDEuNjQxYzEuMjc2LTAuMzU1LDIuNjQ1LTAuNTMyLDQuMDA1LTAuNTM4YzEuMzU5LDAuMDA2LDIuNzI3LDAuMTgzLDQuMDA1LDAuNTM4ICBjMy4wNTUtMi4wNyw0LjM5Ni0xLjY0MSw0LjM5Ni0xLjY0MWMwLjg3MiwyLjIwMywwLjMyMywzLjgzLDAuMTU5LDQuMjM0YzEuMDIzLDEuMTE4LDEuNjQ0LDIuNTQ1LDEuNjQ0LDQuMjkyICBjMCw2LjE0Ni0zLjc0LDcuNDk4LTcuMzA0LDcuODkzQzE5LjQ3OSwyMy41NDgsMjAsMjQuNTA4LDIwLDI2YzAsMiwwLDMuOTAyLDAsNC40MjhjMCwwLjQyOCwwLjI1OCwwLjkwMSwxLjA3LDAuNzQ2ICBDMjcuNDIyLDI5LjA1NSwzMiwyMy4wNjIsMzIsMTUuOTk3QzMyLDcuMTYyLDI0LjgzOCwwLDE2LjAwMywweiIgZmlsbD0iIzE4MTYxNiIgZmlsbC1ydWxlPSJldmVub2RkIi8+PGcvPjxnLz48Zy8+PGcvPjxnLz48Zy8+PC9zdmc+"
            />
          </a>
          <a>
            <img alt="linkedin" className="w-[24px] h-[24px]"
                 src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjwhRE9DVFlQRSBzdmcgIFBVQkxJQyAnLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4nICAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz48c3ZnIGhlaWdodD0iMTAwJSIgc3R5bGU9ImZpbGwtcnVsZTpldmVub2RkO2NsaXAtcnVsZTpldmVub2RkO3N0cm9rZS1saW5lam9pbjpyb3VuZDtzdHJva2UtbWl0ZXJsaW1pdDoyOyIgdmVyc2lvbj0iMS4xIiB2aWV3Qm94PSIwIDAgNTEyIDUxMiIgd2lkdGg9IjEwMCUiIHhtbDpzcGFjZT0icHJlc2VydmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6c2VyaWY9Imh0dHA6Ly93d3cuc2VyaWYuY29tLyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxwYXRoIGQ9Ik00NzMuMzA1LC0xLjM1M2MyMC44OCwwIDM3Ljg4NSwxNi41MzMgMzcuODg1LDM2LjkyNmwwLDQzOC4yNTFjMCwyMC4zOTMgLTE3LjAwNSwzNi45NTQgLTM3Ljg4NSwzNi45NTRsLTQzNi40NTksMGMtMjAuODM5LDAgLTM3Ljc3MywtMTYuNTYxIC0zNy43NzMsLTM2Ljk1NGwwLC00MzguMjUxYzAsLTIwLjM5MyAxNi45MzQsLTM2LjkyNiAzNy43NzMsLTM2LjkyNmw0MzYuNDU5LDBabS0zNy44MjksNDM2LjM4OWwwLC0xMzQuMDM0YzAsLTY1LjgyMiAtMTQuMjEyLC0xMTYuNDI3IC05MS4xMiwtMTE2LjQyN2MtMzYuOTU1LDAgLTYxLjczOSwyMC4yNjMgLTcxLjg2NywzOS40NzZsLTEuMDQsMGwwLC0zMy40MTFsLTcyLjgxMSwwbDAsMjQ0LjM5Nmw3NS44NjYsMGwwLC0xMjAuODc4YzAsLTMxLjg4MyA2LjAzMSwtNjIuNzczIDQ1LjU1NCwtNjIuNzczYzM4Ljk4MSwwIDM5LjQ2OCwzNi40NjEgMzkuNDY4LDY0LjgwMmwwLDExOC44NDlsNzUuOTUsMFptLTI4NC40ODksLTI0NC4zOTZsLTc2LjAzNCwwbDAsMjQ0LjM5Nmw3Ni4wMzQsMGwwLC0yNDQuMzk2Wm0tMzcuOTk3LC0xMjEuNDg5Yy0yNC4zOTUsMCAtNDQuMDY2LDE5LjczNSAtNDQuMDY2LDQ0LjA0N2MwLDI0LjMxOCAxOS42NzEsNDQuMDUyIDQ0LjA2Niw0NC4wNTJjMjQuMjk5LDAgNDQuMDI2LC0xOS43MzQgNDQuMDI2LC00NC4wNTJjMCwtMjQuMzEyIC0xOS43MjcsLTQ0LjA0NyAtNDQuMDI2LC00NC4wNDdaIiBzdHlsZT0iZmlsbC1ydWxlOm5vbnplcm87Ii8+PC9zdmc+"
            />
          </a>
          <a>
            <img alt="twitter" className="w-[24px] h-[24px]"
                 src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjwhRE9DVFlQRSBzdmcgIFBVQkxJQyAnLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4nICAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz48c3ZnIGhlaWdodD0iMTAwJSIgc3R5bGU9ImZpbGwtcnVsZTpldmVub2RkO2NsaXAtcnVsZTpldmVub2RkO3N0cm9rZS1saW5lam9pbjpyb3VuZDtzdHJva2UtbWl0ZXJsaW1pdDoyOyIgdmVyc2lvbj0iMS4xIiB2aWV3Qm94PSIwIDAgNTEyIDUxMiIgd2lkdGg9IjEwMCUiIHhtbDpzcGFjZT0icHJlc2VydmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6c2VyaWY9Imh0dHA6Ly93d3cuc2VyaWYuY29tLyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxwYXRoIGQ9Ik00NDkuNDQ2LDBjMzQuNTI1LDAgNjIuNTU0LDI4LjAzIDYyLjU1NCw2Mi41NTRsMCwzODYuODkyYzAsMzQuNTI0IC0yOC4wMyw2Mi41NTQgLTYyLjU1NCw2Mi41NTRsLTM4Ni44OTIsMGMtMzQuNTI0LDAgLTYyLjU1NCwtMjguMDMgLTYyLjU1NCwtNjIuNTU0bDAsLTM4Ni44OTJjMCwtMzQuNTI0IDI4LjAyOSwtNjIuNTU0IDYyLjU1NCwtNjIuNTU0bDM4Ni44OTIsMFptLTI1My45MjcsNDI0LjU0NGMxMzUuOTM5LDAgMjEwLjI2OCwtMTEyLjY0MyAyMTAuMjY4LC0yMTAuMjY4YzAsLTMuMjE4IDAsLTYuNDM3IC0wLjE1MywtOS41MDJjMTQuNDA2LC0xMC40MjEgMjYuOTczLC0yMy40NDggMzYuOTM1LC0zOC4zMTRjLTEzLjE4LDUuODI0IC0yNy40MzMsOS44MDkgLTQyLjQ1MiwxMS42NDhjMTUuMzI2LC05LjE5NiAyNi45NzMsLTIzLjYwMiAzMi40OSwtNDAuOTJjLTE0LjI1Miw4LjQyOSAtMzAuMDM4LDE0LjU2IC00Ni44OTYsMTcuOTMxYy0xMy40ODcsLTE0LjQwNiAtMzIuNjQ0LC0yMy4yOTUgLTUzLjk0NiwtMjMuMjk1Yy00MC43NjcsMCAtNzMuODcsMzMuMTA0IC03My44Nyw3My44N2MwLDUuODI0IDAuNjEzLDExLjQ5NCAxLjk5MiwxNi44NThjLTYxLjQ1NiwtMy4wNjUgLTExNS44NjIsLTMyLjQ5IC0xNTIuMzM3LC03Ny4yNDFjLTYuMjg0LDEwLjg4MSAtOS45NjIsMjMuNjAxIC05Ljk2MiwzNy4wODhjMCwyNS41OTQgMTMuMDI3LDQ4LjI3NiAzMi45NSw2MS40NTZjLTEyLjEwNywtMC4zMDcgLTIzLjQ0OCwtMy42NzggLTMzLjQxLC05LjE5NmwwLDAuOTJjMCwzNS44NjIgMjUuNDQxLDY1LjU5NCA1OS4zMTEsNzIuNDljLTYuMTMsMS42ODYgLTEyLjcyLDIuNjA2IC0xOS40NjQsMi42MDZjLTQuNzUxLDAgLTkuMzQ4LC0wLjQ2IC0xMy45NDYsLTEuMzhjOS4zNDksMjkuNDI2IDM2LjYyOCw1MC43MjggNjguOTY1LDUxLjM0MWMtMjUuMjg3LDE5Ljc3MSAtNTcuMTY0LDMxLjU3MSAtOTEuOCwzMS41NzFjLTUuOTc3LDAgLTExLjgwMSwtMC4zMDYgLTE3LjYyNSwtMS4wNzNjMzIuMzM3LDIxLjE1IDcxLjI2NCwzMy40MSAxMTIuOTUsMzMuNDFaIi8+PC9zdmc+"
            />
          </a>
          <a>
            <img alt="email" className="w-[24px] h-[24px]"
                 src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/Pjxzdmcgdmlld0JveD0iMCAwIDUxMiA1MTIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTI1NiAzNTJjLTE2LjUzIDAtMzMuMDYtNS40MjItNDcuMTYtMTYuNDFMMCAxNzMuMlY0MDBDMCA0MjYuNSAyMS40OSA0NDggNDggNDQ4aDQxNmMyNi41MSAwIDQ4LTIxLjQ5IDQ4LTQ4VjE3My4ybC0yMDguOCAxNjIuNUMyODkuMSAzNDYuNiAyNzIuNSAzNTIgMjU2IDM1MnpNMTYuMjkgMTQ1LjNsMjEyLjIgMTY1LjFjMTYuMTkgMTIuNiAzOC44NyAxMi42IDU1LjA2IDBsMjEyLjItMTY1LjFDNTA1LjEgMTM3LjMgNTEyIDEyNSA1MTIgMTEyQzUxMiA4NS40OSA0OTAuNSA2NCA0NjQgNjRoLTQxNkMyMS40OSA2NCAwIDg1LjQ5IDAgMTEyQzAgMTI1IDYuMDEgMTM3LjMgMTYuMjkgMTQ1LjN6Ii8+PC9zdmc+"
            />
          </a>
        </div>
      </footer>
    </div>
  );
}

export default SignInPage;
