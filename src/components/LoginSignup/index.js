import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { userService } from "src/services/user.serveice";

import { PrimaryButton } from "../Buttons";
import InputField from "../InputField";
import StyledLoginSignup from "./StyledLoginSignup";

function LoginSignup({ activeForm = "login" }) {
  const dispatch = useDispatch();
  // eslint-disable-next-line no-unused-vars
  const [formActiveStatus, setformActiveStatus] = useState(activeForm);

  function onclickLogin() {
    userService.login(dispatch);
  }
  return (
    <StyledLoginSignup>
      <div>
        <div>
          <InputField
            placeholder="Username or Email"
            type="text"
            name="username"
          />

          <InputField type="password" placeholder="Password" name="password" />
          <PrimaryButton buttonText="Login" onClick={onclickLogin} />
        </div>
        <div></div>
      </div>
    </StyledLoginSignup>
  );
}

export default LoginSignup;
