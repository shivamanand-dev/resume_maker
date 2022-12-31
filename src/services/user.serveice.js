import { BehaviorSubject } from "rxjs";

import { fetchWrapper } from "./fetchWrapper";

const userSubject = new BehaviorSubject(
  typeof window !== "undefined" && JSON.parse(localStorage.getItem("user"))
);

export const userService = {
  user: userSubject.asObservable(),
  get userValue() {
    return userSubject.value;
  },
  login,
  signup,
  logout,
  updateUserCountry,
  updateProfile,
};

async function login(data) {
  return await fetchWrapper.post("/auth/login", data).then(async (data) => {
    await fetch("/api/login", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data.authToken),
    });
    if (data.success) {
      userSubject.next(data.userDetails);
      localStorage.setItem("user", JSON.stringify(data.userDetails));
    }
    return data;
  });
}

async function signup(data) {
  return await fetchWrapper.post("/auth/signup", data).then((data) => {
    if (data.success) {
      userSubject.next(data.user);
      localStorage.setItem("user", JSON.stringify(data.user));
    }
    return data;
  });
}

async function logout() {
  localStorage.clear();
}

async function updateUserCountry(api_key) {
  try {
    if (!userService?.userValue?.country) {
      const country = await fetch(`https://api.ipdata.co/?api-key=${api_key}`, {
        method: "GET",
      }).then((res) => res.json());

      await userService.updateProfile({
        liveCountry: country?.country_code,
      });
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log({ error });
    return error;
  }
}

async function updateProfile(data) {
  return await fetchWrapper.put("/profile/update", data).then((res) => {
    userSubject.next(res);
  });
}
