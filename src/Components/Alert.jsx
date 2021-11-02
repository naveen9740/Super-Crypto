import { Snackbar } from "@material-ui/core";
import { useCrypto } from "../Context/CurrencyContext";
import MuiAlert from "@material-ui/lab/Alert";

export const Alert = () => {
  const { alert, setAlert } = useCrypto();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlert({ open: false });
  };

  return (
    <Snackbar open={alert.open} autoHideDuration={3000} onClose={handleClose}>
      <MuiAlert
        onClick={handleClose}
        elevation={10}
        variant="filled"
        severity={alert.type}
      >
        {alert.message}
      </MuiAlert>
    </Snackbar>
  );
};
