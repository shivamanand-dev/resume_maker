import { Alert, AlertTitle } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import { reduxStoreState, setShowAlert } from "@/redux/reduxStore";

import { StyledAlertMessage } from "./StyledAlertMessage";

function AlertMessage({
  title = "Error",
  message = "This is an error alert",
  onClose,
  severity = "error",
}) {
  const state = useSelector(reduxStoreState);
  const dispatch = useDispatch();

  return (
    <StyledAlertMessage>
      <Alert
        onClose={
          onClose ? onClose : () => dispatch(setShowAlert(!state.showAlert))
        }
        severity={severity}
      >
        <AlertTitle>{title}</AlertTitle>
        {message}
      </Alert>
    </StyledAlertMessage>
  );
}

export default AlertMessage;
