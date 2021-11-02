import { onAuthStateChanged } from "@firebase/auth";
import { doc, onSnapshot } from "@firebase/firestore";
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { CoinList } from "../Config/api";
import { auth, db } from "../firebase";

const Crypto = createContext();

export const CryptoContext = ({ children }) => {
  const [currency, setCurrency] = useState("INR");
  const [symbol, setSymbol] = useState("₹");
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    type: "success",
  });
  const [watchList, setWatchList] = useState([]);
  console.log({ coins });

  useEffect(() => {
    if (user) {
      console.log({ user });
      const coinRef = doc(db, "watchList", user.uid);
      var unsubscribe = onSnapshot(coinRef, (coin) =>
        coin.exists
          ? setWatchList(coin.data().coins)
          : setAlert({
              open: true,
              messge: "No items Available in WatchList",
              type: "warning",
            })
      );
      return () => unsubscribe();
    }
  }, [user]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      return user ? setUser(user) : setUser(null);
    });
  }, []);

  const fetchCoins = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(CoinList(currency));
      setCoins(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (currency === "INR") {
      setSymbol("₹");
    } else {
      setSymbol("$");
    }
    fetchCoins();
  }, [currency]);

  return (
    <Crypto.Provider
      value={{
        currency,
        symbol,
        setCurrency,
        coins,
        loading,
        fetchCoins,
        alert,
        setAlert,
        user,
        watchList,
      }}
    >
      {children}
    </Crypto.Provider>
  );
};

export const useCrypto = () => useContext(Crypto);
