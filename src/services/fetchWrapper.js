/* eslint-disable sonarjs/no-duplicate-string */
import { backendUri } from "@/utils/constants/app_config";

import { userService } from "./user.serveice";

function getCombinedUrl(url) {
  return backendUri + url;
}

export const fetchWrapper = {
  post,
  put,
  handleResponse,
  getToken,
};

async function getToken() {
  return await fetch("/api/token", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(),
  }).then(fetchWrapper.handleResponse);
}

async function post(url, body) {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    origin: "*",
    body: JSON.stringify(body),
  };

  return await fetch(getCombinedUrl(url), requestOptions).then(handleResponse);
}

async function put(url, body) {
  const token = await getToken();

  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authToken: token.token,
    },
    origin: "*",
    body: JSON.stringify(body),
  };
  return await fetch(getCombinedUrl(url), requestOptions).then(handleResponse);
}

function handleResponse(response) {
  return response.text().then((text) => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if ([401].includes(response.status) && userService.userValue) {
        // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
        // 403 is removed for private canvas.
        userService.logout();
      }
      return data;
    }

    return data;
  });
}
