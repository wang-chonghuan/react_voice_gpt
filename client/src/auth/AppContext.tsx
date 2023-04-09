import {createContext, useContext, useReducer, ReactNode, useState, useEffect} from 'react';
import {validateTokenOnServer} from "./validateToken";

// 这个类型是用户输入进来的，用户后续的登录
export interface UserReq {
  username: string;
  password: string;
}

// 定义了一个名为User的接口,允许TypeScript在编译时检查user对象的属性类型是否正确
// 这个类型是登录成功后返回的，在context中保存用户信息的
export interface User {
  username: string;
  jwt: string;
}

type State = {
  user: undefined | User;
  permissions: undefined | string[];
  loading: boolean;
};

const initialState: State = {
  user: undefined,
  permissions: undefined,
  loading: false,
};

type Action = | {
  type: 'unauthenticated';
} | {
  type: 'authenticate';
} | {
  type: 'authenticated';
  user: User | undefined;
} | {
  type: 'authorize';
} | {
  type: 'authorized';
  permissions: string[];
};

/**
 * @param state 当前的状态
 * @param action 要对当前状态做什么修改
 * 如果action是authenticated，说明已经登录成功，这时需要把当前状态改成已登录
 * 跳转到authenticated分支，把正在加载的状态关掉，
 * 同时把action中携带的用户信息存入当前状态，得到新的状态，返回出去
 */
function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'unauthenticated':
      return {...state, loading: false};
    case 'authenticate':
      return {...state, loading: true};
    case 'authenticated':
      return {...state, loading: false, user: action.user};
    case 'authorize':
      return {...state, loading: true};
    case 'authorized':
      return {
        ...state,
        loading: false,
        permissions: action.permissions,
      };
    default:
      return state;
  }
}

type AppContextType = State & {
  dispatch: React.Dispatch<Action>;
};
const AppContext = createContext<AppContextType>({
  ...initialState,
  dispatch: () => {
  },
});

type Props = {
  children: ReactNode;
};

export function AppProvider({children}: Props) {
  // 用上面定义好的reducer函数来构造useReducer，
  // 生成出来的dispatch对象，包含了reducer里的功能，供外部使用，作用是用action修改状态
  // 把这个dispatch传给AppContext.Provider组件（其实就是上下文组件），这个组件再包裹app原有的根组件
  // 这样，根组件树上的所有组件，都能读取到dispatch函数了，同时也能读到user permission状态了。
  const [{user, permissions, loading}, dispatch] = useReducer(reducer, initialState);
  //
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
        console.log("AppProvider get saved user: ", savedUsername + ' ' + savedJwt);
        initialState.user = { username: savedUsername, jwt: savedJwt };
      } else {
        console.log("AppProvider INVALID saved user");
        initialState.user = undefined;
      }
    } else {
      console.log("AppProvider NO saved user");
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
    <AppContext.Provider
      value={{
        user,
        permissions,
        loading,
        dispatch,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const useAppContext = () => useContext(AppContext);
