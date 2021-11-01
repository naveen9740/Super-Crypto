import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { AppBar, Box, Button, Tab, Tabs } from "@material-ui/core";
import { Login } from "./Login";
import { SignUp } from "./SignUp";
import GoogleButton from "react-google-button";
import { GoogleAuthProvider, signInWithPopup } from "@firebase/auth";
import { auth } from "../../firebase";
import axios from "axios";
import { useCrypto } from "../../Context/CurrencyContext";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    color: "white",
    width: 400,
    borderRadius: 10,
  },
  google: {
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    gap: 20,
    fontSize: 20,
    padding: 24,
  },
}));

export const AuthModel = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const { setAlert } = useCrypto();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [value, setValue] = useState(0);
  console.log(value);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const googleProvider = new GoogleAuthProvider();

  const signInWithGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        setAlert({
          open: true,
          message: `Sign Up Success. Welcome ${result.user.email}`,
          type: `success`,
        });
        handleClose();
      })
      .catch((error) => {
        setAlert({
          open: true,
          message: error.message,
          type: `error`,
        });
      });
  };

  return (
    <div>
      <Button
        variant="contained"
        style={{
          width: "contained",
          height: 40,
          backgroundColor: `#EEBC1D`,
        }}
        onClick={() => handleOpen()}
      >
        Login
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <AppBar
              position="static"
              style={{ backgroundColor: "transparent", color: "white" }}
            >
              <Tabs
                value={value}
                onChange={handleChange}
                variant="fullWidth"
                style={{ borderRadius: 10 }}
              >
                <Tab label="Login" />
                <Tab label="Sign up" />
              </Tabs>
            </AppBar>
            {value === 0 ? (
              <Login handleClose={handleClose} />
            ) : (
              <SignUp handleClose={handleClose} />
            )}
            <Box className={classes.google}>
              <span>OR</span>
              <GoogleButton
                style={{ width: "100%", outline: "none" }}
                onClick={() => signInWithGoogle()}
              />
            </Box>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};
