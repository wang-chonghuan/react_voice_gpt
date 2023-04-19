/**
 * 注意，当一个文件里出现jsx tsx时，文件名必须也是jsx tsx，否则不能识别
 */

import {ChatPage} from '../components/ChatPage';
import SignInPage from "../components/SignInPage";
import {createBrowserRouter, Navigate} from 'react-router-dom';
import {useSelector} from "react-redux";
import {RootState, store} from "../store/store";

interface ProtectedRouteProps {
  element: React.ReactElement;
  redirectTo?: string;
  isProtected?: boolean;
}

function ProtectedRoute({element, redirectTo, isProtected}: ProtectedRouteProps) {
  const user = useSelector((state: RootState) => state.user.user);

  // 如果该路由受保护，并且用户不存在，那么就跳到登录页
  if (isProtected && !user) {
    return <Navigate to="/signin"/>;
  }
  // 如果该路由受保护，并且用户存在，那么就正常跳转
  if (isProtected && user) {
    return element;
  }
  // 路由不受保护的情况，用户存在
  if (!isProtected && user && redirectTo) {
    return <Navigate to={redirectTo}/>;
  }
  return element;
}

export const router = createBrowserRouter([
  {path: '/', element: <Navigate to="signin"/>},
  {path: '/signin', element: <ProtectedRoute element={<SignInPage/>} isProtected={false} redirectTo='/chatpage'/>},
  {path: '/chatpage', element: <ProtectedRoute element={<ChatPage/>} isProtected={true}/>}
]);


