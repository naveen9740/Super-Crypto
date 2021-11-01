import { onAuthStateChanged } from "@firebase/auth";
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { CoinList } from "../Config/api";
import { auth } from "../firebase";

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

  useEffect(() => {
    currency === "INR" ? setSymbol("₹") : setSymbol("$");
  }, [currency]);

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
      }}
    >
      {children}
    </Crypto.Provider>
  );
};

export const useCrypto = () => useContext(Crypto);
