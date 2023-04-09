type AccountCredentials = {
  username: string,
  password: string
};

// 远程验证本地存储的jwt，验证有效期和签名，也验证用户名，这样只要后台删掉用户名，前端有Jwt也不能访问了
export async function validateTokenOnServer(username: string, token: string): Promise<boolean> {
  try {
    const credentials: AccountCredentials = {
      username: username,
      password: ""
    };
    const response = await fetch(process.env.REACT_APP_MAIVC_URL! + 'validateToken', {
      method: 'POST',
      body: JSON.stringify(credentials),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    return response.ok;
  } catch (error) {
    console.error('Error validating JWT:', error);
    return false;
  }
}

// 本地验证本地存储的jwt，只验证有效期
export const validateTokenOnClient = (token: string) => {
  try {
    return true;
  } catch (error) {
    return false;
  }
};
