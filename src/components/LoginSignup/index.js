/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";
import { encryptAll } from "src/services/RSAencryption";
import { userService } from "src/services/user.service";

import { ip_data_API } from "@/utils/constants/app_config";

import { PrimaryButton } from "../Buttons";
import InputField from "../InputField";
import StyledLoginSignup from "./StyledLoginSignup";

function LoginSignup({ activeForm = "login" }) {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    profileImageUrl: "",
    username: "",
    password: "",
  });

  const [showMessage, setShowMessage] = useState({
    showing: false,
    colorType: "success",
    message: "",
  });

  const [profilePicture, setProfilePicture] = useState();
  const [submitBtnIsDisabled, setSubmitBtnIsDisabled] = useState(false);
  const [submitBtnText, setSubmitBtnText] = useState(
    activeForm === "login" ? "Login" : "Sign Up"
  );

  // handle on Change for login
  function handleOnchange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleOnchangeProfilePic(e) {
    setProfilePicture(e.target.files[0]);
  }

  // On click Login
  async function onclickLogin() {
    setSubmitBtnIsDisabled(true);
    setSubmitBtnText("Loading...");

    const loginDetails = {
      username: formData.username,
      password: formData.password,
    };

    const encryptedLoginDetails = encryptAll(loginDetails);
    const response = await userService.login(encryptedLoginDetails);

    if (!response?.success) {
      setShowMessage({
        showing: true,
        colorType: "Error",
        message: response?.message,
      });

      setSubmitBtnIsDisabled(false);
      setSubmitBtnText("Login");
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
    setSubmitBtnIsDisabled(true);

    const toEncrypt = {
      email: formData.email,
      username: formData.username,
      password: formData.password,
    };

    const encryptedData = encryptAll(toEncrypt);

    const encryptedFormData = { ...formData, ...encryptedData };

    const response = await userService.signup(encryptedFormData);

    if (!response?.success) {
      setShowMessage({
        showing: true,
        colorType: "Error",
        message: response?.message,
      });
      setSubmitBtnIsDisabled(false);
      setSubmitBtnText("Sign up");
      return;
    } else {
      setShowMessage({
        showing: true,
        colorType: "Success",
        message: "Signed Up Successfully",
      });
    }

    if (profilePicture) {
      const imageUploadRes = await userService.uploadToS3(
        profilePicture,
        "image"
      );

      await userService.updateProfile({
        profileImageUrl: imageUploadRes.url,
      });
    }

    await userService.updateUserCountry(ip_data_API);
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
                onChange={handleOnchangeProfilePic}
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
            buttonText={submitBtnText}
            onClick={activeForm === "login" ? onclickLogin : onclickSignUp}
            disabled={submitBtnIsDisabled}
          />

          <p
            onClick={() => {
              if (activeForm === "login") {
                router.push("/signup");
              } else {
                router.push("/login");
              }
            }}
            onKeyDown={() => {
              router.push("/signup");
            }}
            className="switchForm"
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
