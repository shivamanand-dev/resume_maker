import imageCompression from "browser-image-compression";
import { BehaviorSubject } from "rxjs";

import { fetchWrapper } from "./fetchWrapper";
import { s3Apis } from "./s3Apis";

const imageType = "image/jpeg";

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
  uploadToS3,
};

async function login(data) {
  return await fetchWrapper.post("/auth/login", data).then(async (data) => {
    if (data.success) {
      await fetch("/api/login", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data.authToken),
      });
      userSubject.next(data.userDetails);
      localStorage.setItem("user", JSON.stringify(data.userDetails));
    }
    return data;
  });
}

async function signup(data) {
  return await fetchWrapper.post("/auth/signup", data).then(async (data) => {
    if (data.success) {
      await fetch("/api/login", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data.authToken),
      });
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

async function compressImage(file) {
  const compressOptions = {
    maxSizeMB: 0.25,
    useWebWorker: true,
    fileType: imageType,
  };

  return await imageCompression(file, compressOptions);
}

async function uploadToS3(file, fileType) {
  const securedLink = await fetchWrapper.get("/profile/getS3url");

  const { success, s3URL } = securedLink;

  let data = file;
  if (fileType === "image") {
    data = await compressImage(data);
  }

  if (success) {
    const resData = await s3Apis.s3Put(s3URL, data);
    const { status, ok, url } = resData;

    return { status, ok, url: url.split("?")[0] };
  }
}
