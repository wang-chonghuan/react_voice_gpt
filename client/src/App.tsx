import {ChatPage} from './components/ChatPage';
import {HeaderBar} from './components/HeaderBar';
import SpeechTestPage from "./components/SpeechTestPage";
import SignInPage from "./components/SignInPage";
import {AppProvider} from "./auth/AppContext";
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="signin" />
  },
  {
    path: '/signin',
    element: <SignInPage />
  },
  {
    path: '/chatpage',
    element: <ChatPage />
  },
  {
    path: '/setting',
    element: <SpeechTestPage />
  }
]);

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
