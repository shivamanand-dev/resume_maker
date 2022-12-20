import "../styles/globals.css";

import { useEffect } from "react";
import { Provider } from "react-redux";
import { userService } from "src/services/user.serveice";

import store from "@/redux/store";

function MyApp({ Component, pageProps }) {
  const user = userService?.userValue;

  useEffect(() => {
    if (user) {
      userService.updateUserCountry();
      // reDirectUserToAuthRoute();
    }
    // setMounted(true);
  }, []);
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
