import {ChatPage} from './components/ChatPage';
import SpeechTestPage from "./components/SpeechTestPage";
import SignInPage from "./components/SignInPage";
import {AppProvider} from "./context/AppContext";

// <SpeechTestPage/>
function App() {
  return (
    <>
      <AppProvider>
        <SpeechTestPage/>
        <SignInPage/>
        <ChatPage/>
      </AppProvider>
    </>
  );
}

export default App;
