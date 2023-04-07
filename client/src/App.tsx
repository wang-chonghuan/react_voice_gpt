import {ChatPage} from './components/ChatPage';
import SpeechTestPage from "./components/SpeechTestPage";
import LoginPageSimple from "./components/LoginPageSimple";
import {AppProvider} from "./context/AppContext";
import {SignInPage} from "./components/SignInPage";

// <SpeechTestPage/>
function App() {
  return (
    <>
      <AppProvider>
        <SignInPage/>
        <SpeechTestPage/>
        <LoginPageSimple/>
        <ChatPage/>
      </AppProvider>
    </>
  );
}

export default App;
