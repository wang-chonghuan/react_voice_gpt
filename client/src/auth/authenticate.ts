import {UserReq} from "./AppContext";

export function authenticate(): Promise<UserReq | undefined> {
  return new Promise(
    (resolve) => setTimeout(
      () => resolve({ username: 'walt', password: '1' }), 1000));
}


