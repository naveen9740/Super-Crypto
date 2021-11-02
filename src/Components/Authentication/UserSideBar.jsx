import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import { useCrypto } from "../../Context/CurrencyContext";
import { Avatar } from "@material-ui/core";
import { signOut } from "@firebase/auth";
import { auth, db } from "../../firebase";
import { AiFillDelete } from "react-icons/ai";
import { doc, setDoc } from "@firebase/firestore";

export const UserSideBar = () => {
  const [state, setState] = useState({
    right: false,
  });
  const { user, setAlert, watchList, coins, symbol } = useCrypto();
  console.log({ coins });

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
    coin: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: "#EEBC1D",
      color: "black",
      padding: 10,
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

  const logOut = () => {
    signOut(auth);
    setAlert({ open: true, message: `You are Logged Out` });
    toggleDrawer();
  };
  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  const removeFromWatchlist = async (coin) => {
    const coinRef = doc(db, "watchList", user.uid);
    try {
      await setDoc(
        coinRef,
        {
          coins: watchList.filter((item) => item != coin?.id),
        },
        { merge: "true" }
      );

      setAlert({
        open: true,
        message: `${coin.name} Removed from WatchList`,
        type: "success",
      });
    } catch (error) {
      setAlert({
        open: "true",
        message: error.message,
        type: "error",
      });
    }
  };

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

                  {coins.map((coin) => {
                    if (watchList.includes(coin.id))
                      return (
                        <div className={classes.coin}>
                          <span>{coin.name}</span>
                          <span style={{ display: "flex", gap: 8 }}>
                            {symbol}{" "}
                            {numberWithCommas(coin.current_price.toFixed(2))}
                            <AiFillDelete
                              style={{ cursor: "pointer" }}
                              fontSize="16"
                              onClick={() => removeFromWatchlist(coin)}
                            />
                          </span>
                        </div>
                      );
                    else return <></>;
                  })}
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
