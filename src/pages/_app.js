import "../styles/globals.css";

// import { useEffect } from "react";
import { Provider } from "react-redux";

// import { userService } from "src/services/user.service";
import store from "@/redux/store";
// import { ip_data_API } from "@/utils/constants/app_config";

function MyApp({ Component, pageProps }) {
  // const user = userService?.userValue;

  // useEffect(() => {
  //   if (user) {
  //     userService.updateUserCountry(ip_data_API);
  //   }
  // });

  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
