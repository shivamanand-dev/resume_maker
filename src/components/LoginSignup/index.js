/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";
import { userService } from "src/services/user.service";

// import { ip_data_API } from "@/utils/constants/app_config";
import { PrimaryButton } from "../Buttons";
import InputField from "../InputField";
import StyledLoginSignup from "./StyledLoginSignup";

function LoginSignup({ activeForm = "login" }) {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    // profilePic: "",
    username: "",
    password: "",
  });

  const [showMessage, setShowMessage] = useState({
    showing: false,
    colorType: "success",
    message: "",
  });

  // handle on Change for login
  function handleOnchange(e) {
    // setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }
  // On click Login
  async function onclickLogin() {
    const loginDetails = {
      username: formData.username,
      password: formData.password,
    };
    const response = await userService.login(loginDetails);

    if (!response?.success) {
      setShowMessage({
        showing: true,
        colorType: "Error",
        message: response?.message,
      });
    } else {
      setShowMessage({
        showing: true,
        colorType: "Success",
        message: "Logged In Successfully",
      });
    }
  }

  // On click Sign up
  async function onclickSignUp() {
    const response = await userService.signup(formData);
    // await userService.updateUserCountry(ip_data_API);

    if (!response?.success) {
      setShowMessage({
        showing: true,
        colorType: "Error",
        message: response?.message,
      });
    } else {
      setShowMessage({
        showing: true,
        colorType: "Success",
        message: "Signed Up Successfully",
      });
    }
  }

  return (
    <StyledLoginSignup>
      <div>
        <div>
          {activeForm === "signUp" && (
            <div>
              <InputField
                placeholder="Name"
                type="text"
                name="name"
                onChange={handleOnchange}
              />
              <InputField
                placeholder="Name"
                type="file"
                name="profilePic"
                onChange={handleOnchange}
              />
              <InputField
                placeholder="Email"
                type="email"
                name="email"
                onChange={handleOnchange}
              />
            </div>
          )}

          <InputField
            placeholder="Username"
            type="text"
            name="username"
            onChange={handleOnchange}
          />

          <InputField
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleOnchange}
          />
          <PrimaryButton
            buttonText={activeForm === "login" ? "Login" : "Sign Up"}
            onClick={activeForm === "login" ? onclickLogin : onclickSignUp}
          />

          <p
            onClick={() => {
              if (activeForm === "login") {
                router.push("/signup");
              }
            }}
            onKeyDown={() => {
              router.push("/signup");
            }}
          >
            {activeForm === "login" ? "Sign Up" : "Login"}
          </p>

          {showMessage.showing && (
            <p style={{ color: "red" }}>{showMessage.message}</p>
          )}
        </div>
      </div>
    </StyledLoginSignup>
  );
}

export default LoginSignup;
