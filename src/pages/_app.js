import "../styles/globals.css";

import { Container, ThemeProvider } from "@material-ui/core";
// import { useEffect } from "react";
import { Provider } from "react-redux";

// import AlertMessage from "@/components/AlertMessage";
// import { userService } from "src/services/user.service";
import store from "@/redux/store";
import { mainTheme } from "@/utils/Theme/mainTheme";
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
      <ThemeProvider theme={mainTheme}>
        <Container>
          <Component {...pageProps} />
        </Container>
      </ThemeProvider>
    </Provider>
  );
}

export default MyApp;
