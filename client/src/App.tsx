import {ChatPage} from './components/ChatPage';
import {HeaderBar} from './components/HeaderBar';
import SpeechTestPage from "./components/SpeechTestPage";
import SignInPage from "./components/SignInPage";
import {AppProvider, useAppContext} from "./auth/AppContext";
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  element: React.ReactElement;
  redirectTo?: string;
  isProtected?: boolean;
}

const router = createBrowserRouter([
  { path: '/', element: <Navigate to="signin" /> },
  { path: '/signin', element: <ProtectedRoute element={<SignInPage />} isProtected={false} redirectTo='/chatpage'/> },
  { path: '/chatpage', element: <ProtectedRoute element={<ChatPage />} isProtected={true}/> },
  { path: '/setting', element: <ProtectedRoute element={<SpeechTestPage />} isProtected={true}/> },
]);

function ProtectedRoute({ element, redirectTo, isProtected }: ProtectedRouteProps) {
  const { user } = useAppContext();

  // 如果该路由受保护，并且用户不存在，那么就跳到登录页
  if(isProtected && !user) {
    return <Navigate to="/signin" />;
  }
  // 如果该路由受保护，并且用户存在，那么就正常跳转
  if(isProtected && user) {
    return element;
  }
  // 路由不受保护的情况，用户存在
  if(!isProtected && user && redirectTo) {
    return <Navigate to={redirectTo} />;
  }
  return element;
}

function App() {
  return (
    <div className="min-w-[240px] min-h-screen">
      <AppProvider>
        <HeaderBar />
        <RouterProvider router={router} />
      </AppProvider>
    </div>
  );
}

export default App;
