import {ReactNode, useState, useEffect} from 'react';
import {validateTokenOnServer} from "./validateToken";
import {Provider, useDispatch, useSelector} from "react-redux";
import {RootState, store} from "../store/store";
import {authenticatedAction} from "../store/userSlice";

type Props = {
  children: ReactNode;
};

export function AuthProvider({children}: Props) {
  const user = useSelector((state: RootState) => state.user.user);
  const dispatch = useDispatch();
  const [isInitialized, setIsInitialized] = useState(false);
  useEffect(() => {
    validateAndSetInitialState().then(r => {});
  }, []);

  // 检查localStorage中是否存在jwt和username,必须用localStorage否则标签页关闭，数据就清空了
  // 初始化AppProvider时，到服务端验证jwt是否有效，验证成功以后，页面跳转时就不再到服务端验证了。
  // 如果它们存在，设置它们作为initialState的初始值
  const validateAndSetInitialState = async () => {
    const savedJwt = localStorage.getItem('jwt');
    const savedUsername = localStorage.getItem('username');

    if (savedJwt && savedUsername) {
      const isValid = await validateTokenOnServer(savedUsername, savedJwt);
      if (isValid) {
        console.log("AuthProvider get saved user: ", savedUsername + ' ' + savedJwt);
        dispatch(authenticatedAction({ username: savedUsername, jwt: savedJwt }));
      } else {
        console.log("AuthProvider INVALID saved user");
        dispatch(authenticatedAction(undefined));
      }
    } else {
      console.log("AuthProvider NO saved user");
    }
    setIsInitialized(true);
  };

  /*
  当我提到“返回null以确保应用的其他部分不会被渲染，直到初始化完成”时，
  我指的是当isInitialized为false时，AppProvider组件将不会渲染其子组件。
  return null;的作用是阻止子组件的渲染，直到初始化完成。

  当validateAndSetInitialState()函数完成执行后，你会更新isInitialized的状态。
  这将触发AppProvider组件重新渲染。在重新渲染过程中，它将检查isInitialized的值。
  如果isInitialized现在为true，那么AppProvider组件将正常渲染其子组件。

  这是React中组件更新和重新渲染的基本原理。当组件的状态（如isInitialized）发生变化时，组件会重新渲染。
  在这种情况下，当isInitialized从false变为true时，组件将从返回null变为正常渲染子组件。
  */
  if (!isInitialized) {
    return null; // 在完成初始化之前，不要渲染应用的其他部分
  }

  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
}
export default AuthProvider;
