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
          <RouterProvider router={router}/>
        </AuthProvider>
      </Provider>
    </div>
  );
}

export default App;
