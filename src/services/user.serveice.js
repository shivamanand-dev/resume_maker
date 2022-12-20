import { BehaviorSubject } from "rxjs";

import { fetchWrapper } from "./fetchWrapper";

const userSubject = new BehaviorSubject(
  typeof window !== "undefined" && JSON.parse(localStorage.getItem("user"))
);

export const userService = {
  user: userSubject.asObservable(),
  get userValue() {
    return userSubject.value?.userDetails;
  },
  login,
  updateUserCountry,
};

async function login() {
  return await fetchWrapper
    .post("/auth/login", {
      username: "shivam",
      password: "password",
    })
    .then((data) => {
      // console.log(data);

      userSubject.next(data);
      localStorage.setItem("user", JSON.stringify(data.userDetails));
    });
}

async function updateUserCountry() {
  try {
    if (!userService?.userValue?.country) {
      const country = await fetch(
        "https://api.ipdata.co/?api-key=9d43923f3db77214133560b64c0d2679caad5a16b378e3f128f9f73e",
        { method: "GET" }
      ).then((res) => res.json());
      await userService.updateProfile({
        key: "country",
        value: country?.country_code,
      });
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log({ error });
    return error;
  }
}
