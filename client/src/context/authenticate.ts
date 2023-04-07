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

export function authenticate(): Promise<UserReq | undefined> {
  return new Promise(
    (resolve) => setTimeout(
      () => resolve({ username: 'walt', password: '1' }), 1000));
}


