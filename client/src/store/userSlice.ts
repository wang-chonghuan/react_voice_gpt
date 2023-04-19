import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

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
  loading: false
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    unauthenticatedAction: (state) => {
      state.loading = false;
    },
    authenticateAction: (state) => {
      state.loading = true;
    },
    authenticatedAction: (state, action: PayloadAction<User | undefined>) => {
      state.user = action.payload;
      state.loading = false;
    },
    authorizeAction: (state) => {
      state.loading = true;
    },
    authorizedAction: (state, action: PayloadAction<string[]>) => {
      state.permissions = action.payload;
      state.loading = false;
    },
  },
});

export const {unauthenticatedAction, authenticateAction, authenticatedAction, authorizeAction, authorizedAction } =
  userSlice.actions;

export default userSlice.reducer;
