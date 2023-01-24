import "../styles/globals.css";

import { NoSsr } from "@mui/base";
import { Container } from "@mui/material";
// import { useEffect } from "react";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";

import Navbar from "@/components/Navbar";
// import { userService } from "src/services/user.service";
import store from "@/redux/store";

import { darkTheme } from "../utils/Theme/theme";
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
      <ThemeProvider theme={darkTheme}>
        <NoSsr>
          <Navbar />
          <div style={{ height: "64px" }}></div>
          <Container>
            <Component {...pageProps} />
          </Container>
        </NoSsr>
      </ThemeProvider>
    </Provider>
  );
}

export default MyApp;
