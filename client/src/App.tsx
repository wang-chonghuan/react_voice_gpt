import {ChatPage} from './components/ChatPage';
import {HeaderBar} from './components/HeaderBar';
import SpeechTestPage from "./components/SpeechTestPage";
import SignInPage from "./components/SignInPage";
import {AppProvider} from "./context/AppContext";
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
    <>
      <AppProvider>
        <HeaderBar/>
        <RouterProvider router={router} />
      </AppProvider>
    </>
  );
}

export default App;
