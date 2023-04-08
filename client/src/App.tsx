import {ChatPage} from './components/ChatPage';
import {HeaderBar} from './components/HeaderBar';
import SpeechTestPage from "./components/SpeechTestPage";
import SignInPage from "./components/SignInPage";
import {AppProvider, useAppContext} from "./auth/AppContext";
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';

const router = createBrowserRouter([
  { path: '/', element: <Navigate to="signin" /> },
  { path: '/signin', element: <SignInPage /> },
  { path: '/chatpage', element: <ProtectedRoute element={<ChatPage />} /> },
  { path: '/setting', element: <ProtectedRoute element={<SpeechTestPage />} /> },
]);

interface ProtectedRouteProps {
  element: React.ReactElement;
}

function ProtectedRoute({ element }: ProtectedRouteProps) {
  const { user } = useAppContext();
  if (!user) {
    return <Navigate to="/signin" />;
  }
  return element;
}

function App() {
  return (
    <div className="min-w-[240px] min-h-screen">
      <HeaderBar />
      <AppProvider>
        <RouterProvider router={router} />
      </AppProvider>
    </div>
  );
}

export default App;
