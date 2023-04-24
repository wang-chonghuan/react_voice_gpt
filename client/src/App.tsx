import {HeaderBar} from './components/HeaderBar';
import {RouterProvider} from 'react-router-dom';
import {Provider} from "react-redux";
import AuthProvider from "./auth/AuthProvider";
import {store} from "./store/store";
import {router} from "./auth/protectedRouter";
import {useEffect, useState} from "react";

function App() {

  const [appHeight, setAppHeight] = useState<number>(window.innerHeight);
  useEffect(() => {
    const updateHeight = () => {
      setAppHeight(window.innerHeight);
    };
    window.addEventListener('resize', updateHeight);
    return () => {
      window.removeEventListener('resize', updateHeight);
    };
  }, []);

  return (
    <div className="w-full flex flex-col items-center justify-between"
         style={{
           height: `${appHeight}px`,
         }}
    >
      <Provider store={store}>
        <AuthProvider>
          <div className="container flex flex-col justify-start items-center mx-auto h-full">
            <RouterProvider router={router}/>
          </div>
        </AuthProvider>
      </Provider>
    </div>
  );
}

export default App;
