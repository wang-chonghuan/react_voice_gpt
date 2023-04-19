import {UserReq} from "../store/userSlice";

export function authenticate(): Promise<UserReq | undefined> {
  return new Promise(
    (resolve) => setTimeout(
      () => resolve({ username: 'walt', password: '1' }), 1000));
}


