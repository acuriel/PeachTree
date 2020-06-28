import React, {useState} from 'react';
import {TextField, Button} from '@material-ui/core';
import AuthStore from '../../stores/AuthStore';
import { useHistory } from 'react-router-dom';

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("")
  const history = useHistory();
  const authStore = new AuthStore();

  const login = () => {
    authStore.login(username, password).then(res => {
      history.push("/");
    })
  }
  return (
    <div>
      <TextField fullWidth id="user" label="Username" value={username} onChange={e => setUsername(e.target.value)} />
      <TextField type="password" fullWidth id="password" label="Password" value={password} onChange={e => setPassword(e.target.value)} />

      <Button variant="contained" color="primary" fullWidth onClick={() => login()}>
        Log In
      </Button>
    </div>
  );
}

export default LoginForm;
