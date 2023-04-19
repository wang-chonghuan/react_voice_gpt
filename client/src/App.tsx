import {HeaderBar} from './components/HeaderBar';
import {RouterProvider} from 'react-router-dom';
import {Provider} from "react-redux";
import AuthProvider from "./auth/AuthProvider";
import {store} from "./store/store";
import {router} from "./auth/protectedRouter";

function App() {
  return (
    <div className="min-w-[240px] min-h-screen">
      <Provider store={store}>
        <AuthProvider>
          <HeaderBar/>
          <div className="container flex flex-col justify-start items-center mx-auto">
            <RouterProvider router={router}/>
          </div>
        </AuthProvider>
      </Provider>
    </div>
  );
}

export default App;
