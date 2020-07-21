import React from 'react';
import './CreateButton.css';
import { useAuth0 } from "@auth0/auth0-react";

const CreateButton = () => {
  const { isAuthenticated } = useAuth0();

  return (!isAuthenticated &&
          <button className="login-button" onClick={() =>
            loginWithRedirect()}>Log In</button>
         )
};

export default LogIn;
