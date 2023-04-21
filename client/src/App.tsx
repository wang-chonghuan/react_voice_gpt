import {HeaderBar} from './components/HeaderBar';
import {RouterProvider} from 'react-router-dom';
import {Provider} from "react-redux";
import AuthProvider from "./auth/AuthProvider";
import {store} from "./store/store";
import {router} from "./auth/protectedRouter";
import ChatApp from "./samples/SampleChatApp";
import ScrollableBox from "./samples/SampleScrollableBox";
import SampleChatPage from "./samples/SampleChatPage";

function App() {
  return (
    <div className="min-w-[240px] min-h-screen h-screen max-h-screen overflow-hidden">
      <Provider store={store}>
        <AuthProvider>
          <div className="container flex flex-col justify-start items-center mx-auto">
            <RouterProvider router={router}/>
          </div>
        </AuthProvider>
      </Provider>
    </div>
  );
}

export default App;
