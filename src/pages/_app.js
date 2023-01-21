import "../styles/globals.css";

import { Container } from "@mui/material";
// import { useEffect } from "react";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";

import Navbar from "@/components/Navbar";
// import { userService } from "src/services/user.service";
import store from "@/redux/store";
import theme from "@/utils/theme/theme";
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
      <ThemeProvider theme={theme}>
        <Navbar />
        <Container>
          <Component {...pageProps} />
        </Container>
      </ThemeProvider>
    </Provider>
  );
}

export default MyApp;
