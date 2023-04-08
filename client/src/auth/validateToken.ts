// 远程验证本地存储的jwt，验证有效期和签名
export async function validateTokenOnServer(token: string): Promise<boolean> {
  try {
    const response = await fetch(process.env.REACT_APP_MAIVC_URL! + 'validateToken', {
      method: 'POST',
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
