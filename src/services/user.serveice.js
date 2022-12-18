import { setUserDetails } from "@/redux/reduxStore";

import { fetchWrapper } from "./fetchWrapper";

export const userService = {
  login,
};

async function login(dispatch) {
  const data = await fetchWrapper.post("/auth/login", {
    username: "shivam",
    password: "password",
  });
  //   console.log(data);

  localStorage.setItem("user", JSON.stringify(data.userDetails));

  // setUserDetails(data.userDetails);
  dispatch(setUserDetails(data.userDetails));
}
