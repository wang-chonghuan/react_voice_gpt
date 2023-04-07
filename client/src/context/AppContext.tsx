import { createContext, useContext, useReducer, ReactNode } from 'react';
import {UserReq} from "./authenticate";

type State = {
  user: undefined | UserReq;
  permissions: undefined | string[];
  loading: boolean;
};
const initialState: State = {
  user: undefined,
  permissions: undefined,
  loading: false,
};

type Action =
  | {
  type: 'authenticate';
}
  | {
  type: 'authenticated';
  user: UserReq | undefined;
}
  | {
  type: 'authorize';
}
  | {
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
    case 'authenticate':
      return { ...state, loading: true };
    case 'authenticated':
      return { ...state, loading: false, user: action.user };
    case 'authorize':
      return { ...state, loading: true };
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
  dispatch: () => {},
});

type Props = {
  children: ReactNode;
};
export function AppProvider({ children }: Props) {
  // 用上面定义好的reducer函数来构造useReducer，
  // 生成出来的dispatch对象，包含了reducer里的功能，供外部使用，作用是用action修改状态
  // 把这个dispatch传给AppContext.Provider组件（其实就是上下文组件），这个组件再包裹app原有的根组件
  // 这样，根组件树上的所有组件，都能读取到dispatch函数了，同时也能读到user permission状态了。
  const [{ user, permissions, loading }, dispatch] = useReducer(reducer, initialState);
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
