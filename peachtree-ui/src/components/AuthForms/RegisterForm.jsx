import React from 'react';
import {TextField, Button} from '@material-ui/core';


function RegisterForm() {
  return (
    <div>
      <TextField fullWidth id="user" label="Username" />
      <TextField fullWidth id="password" label="Password" />
      <TextField fullWidth id="password2" label="Confirm Password" />

      <Button variant="contained" color="primary" fullWidth>
        Register
      </Button>
    </div>
  );
}

export default RegisterForm;
