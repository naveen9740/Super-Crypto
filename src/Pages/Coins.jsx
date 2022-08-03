import {
  Button,
  LinearProgress,
  makeStyles,
  Typography,
} from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { SingleCoin } from "../Config/api";
import { useCrypto } from "../Context/CurrencyContext";
import { CoinInfo } from "../Components/CoinInfo";
import ReactHtmlParser from "react-html-parser";
import { doc, setDoc } from "@firebase/firestore";
import { db } from "../firebase";

const Coins = () => {
  const { id } = useParams();
  const { currency, symbol, user, watchList, setAlert } = useCrypto();
  const [coin, setCoin] = useState();

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(SingleCoin(id));
      setCoin(data);
    })();
  }, []);

  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  const useStyles = makeStyles((theme) => ({
    container: {
      display: "flex",
      [theme.breakpoints.down("md")]: {
        flexDirection: "column",
        alignItems: "center",
      },
    },
    sideBar: {
      width: "30%",
      [theme.breakpoints.down("md")]: {
        width: "100%",
      },
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginTop: 25,
      borderRight: "2px solid grey",
    },
    heading: { fontWeight: "bold", marginBottom: 20, fontFamily: "Roboto" },
    description: {
      width: "100%",
      fontFamily: "Roboto",
      padding: 25,
      paddingBottom: 15,
      textAlign: "center",
    },
    marketData: {
      alignSelf: "start",
      padding: 23,
      paddingTop: 10,
      width: "100%",
      [theme.breakpoints.down("sm")]: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      },
      [theme.breakpoints.down("md")]: {
        display: "flex",
        justifyContent: "column",
        alignItems: "center",
      },
      [theme.breakpoints.down("xs")]: {
        alignItems: "start",
      },
    },
  }));
  const classes = useStyles();
  if (!coin) return <LinearProgress style={{ backgroundColor: "gold" }} />;

  const inWatchList = watchList?.includes(coin?.id);

  const addToWatchList = async () => {
    const coinRef = doc(db, "watchList", user.uid);
    try {
      await setDoc(coinRef, {
        coins: watchList ? [...watchList, coin?.id] : [coin?.id],
      });

      setAlert({
        open: true,
        message: `${coin.name} Added to WatchList`,
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

  const removeFromWatchList = async () => {
    const coinRef = doc(db, "watchList", user.uid);
    try {
      await setDoc(
        coinRef,
        {
          coins: watchList.filter((item) => item !== coin?.id),
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
    <div className={classes.container}>
      <div className={classes.sideBar}>
        <img
          src={coin?.image.large}
          alt={coin?.name}
          height="200"
          style={{ marginBottom: 20 }}
        />
        <Typography variant="h3" className={classes.heading}>
          {coin?.name}
        </Typography>
        <Typography className={classes.description}>
          {ReactHtmlParser(coin?.description.en.split(". ")[0])}
        </Typography>
        <div className={classes.marketData}>
          <span style={{ display: "flex" }}>
            <Typography className={classes.heading} variant="h5">
              Rank:{" "}
            </Typography>
            &nbsp;
            <Typography variant="h5" style={{ fontFamily: "Roboto" }}>
              {coin?.market_cap_rank}
            </Typography>
          </span>
          <span style={{ display: "flex" }}>
            <Typography className={classes.heading} variant="h5">
              CurrentPrice:{" "}
            </Typography>
            &nbsp;
            <Typography variant="h5" style={{ fontFamily: "Roboto" }}>
              {symbol}
              {numberWithCommas(
                coin?.market_data.current_price[currency.toLowerCase()]
              )}
            </Typography>
          </span>
          <span style={{ display: "flex" }}>
            <Typography className={classes.heading} variant="h5">
              Market Cap:{" "}
            </Typography>
            &nbsp;
            <Typography variant="h5" style={{ fontFamily: "Roboto" }}>
              {symbol}
              {numberWithCommas(
                coin?.market_data.market_cap[currency.toLowerCase()]
                  .toString()
                  .slice(0, -6)
              )}
            </Typography>
          </span>
          {user && (
            <Button
              variant="outlined"
              style={{
                width: "100%",
                height: 40,
                backgroundColor: inWatchList ? `#ff0000` : `#EEBC1D`,
              }}
              onClick={inWatchList ? removeFromWatchList : addToWatchList}
            >
              {inWatchList ? `Remove from watchList` : `Add to WatchList`}
            </Button>
          )}
        </div>
      </div>
      <CoinInfo coin={coin} />
    </div>
  );
};
export default Coins;
