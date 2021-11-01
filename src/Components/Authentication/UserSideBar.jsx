import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import { useCrypto } from "../../Context/CurrencyContext";
import { Avatar } from "@material-ui/core";

export const UserSideBar = () => {
  const [state, setState] = useState({
    right: false,
  });
  const { user } = useCrypto();

  const useStyles = makeStyles({
    list: {
      width: 250,
    },
    fullList: {
      width: "auto",
    },
    container: {
      width: 350,
      padding: 25,
      height: "100%",
      display: "flex",
      flexDirection: "column",
      fontFamily: "Roboto",
    },
    profile: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "20px",
      height: "92%",
    },
    picture: {
      width: 200,
      height: 200,
      cursor: "pointer",
      backgroundColor: "#EEBC1D",
      objectFit: "contain",
    },
    logOut: {
      backgroundColor: "#EEBC1D",
      height: "8%",
      width: "100%",
      marginTop: 20,
    },
    watchList: {
      flex: 1,
      width: "100%",
      backgroundColor: "grey",
      padding: 15,
      paddingTop: 15,
      borderRadius: 10,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 12,
      overflowY: "scroll",
    },
  });
  const classes = useStyles();

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  const logOut = () => {};

  return (
    <div>
      {["right"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Avatar
            onClick={toggleDrawer(anchor, true)}
            style={{
              height: 38,
              width: 38,
              marginLeft: 15,
              cursor: "pointer",
              backgroundColor: `#EEBC1D`,
            }}
            src={user.photoURL}
            alt={user.displayName || user.email}
          />
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            <div className={classes.container}>
              <div className={classes.profile}>
                <Avatar
                  className={classes.picture}
                  src={user.photoURL}
                  alt={user.displayName || user.email}
                />
                <span
                  style={{
                    width: "100%",
                    fontSize: 25,
                    textAlign: "center",
                    fontWeight: "bolder",
                    wordWrap: "break-word",
                  }}
                >
                  {user.displayName || user.email}
                </span>
                <div className={classes.watchList}>
                  <span style={{ fontSize: 15, textShadow: "0 0 5px black" }}>
                    WatchList
                  </span>
                </div>
              </div>

              <Button
                variant="contained"
                className={classes.logOut}
                onClick={logOut}
              >
                LogOut
              </Button>
            </div>
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
};
