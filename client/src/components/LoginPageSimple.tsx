import React, {useState} from "react";

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import {UserReq} from "../context/authenticate";

function LoginPageSimple() {

  const [user, setUser] = useState<UserReq>({
    username: '',
    password: ''
  });
  const [isAuthenticated, setAuth] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser({...user, [event.target.name]: event.target.value});
  }

  const login = async () => {
    console.log('login before fetch v2: ', user)
    const response = await fetch(process.env.REACT_APP_MAIVC_URL! + 'login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(user),
    });
    console.log('login end');
    console.log('login Response:', response);

    // if (response.headers.get('Content-Type')?.includes('application/json')) {
    const jwtToken = response.headers.get('Authorization');
    if (jwtToken !== null) {
      sessionStorage.setItem('jwt', jwtToken);
      setAuth(true);
      console.log('Authorization jwt success: ', sessionStorage.getItem('jwt'));
    } else {
      console.log('Authorization jwt is null')
    }
  };

  return (
  <div>
    <Stack spacing={2} alignItems='center' mt={2}>
      <TextField
        name="username"
        label="Username"
        onChange={handleChange}/>
      <TextField
        type="password"
        name="password"
        label="Password"
        onChange={handleChange}/>
      <Button
        variant="outlined"
        color="primary"
        onClick={login}>
        Login
      </Button>
    </Stack>
  </div>
);
}

export default LoginPageSimple;
