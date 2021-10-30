import { createContext, useContext, useEffect, useState } from "react";

const Crypto = createContext();

export const CryptoContext = ({ children }) => {
  const [currency, setCurrency] = useState("INR");
  const [symbol, setSymbol] = useState("₹");

  useEffect(() => {
    currency === "INR" ? setSymbol("₹") : setSymbol("$");
  }, [currency]);

  return (
    <Crypto.Provider value={{ currency, symbol, setCurrency }}>
      {children}
    </Crypto.Provider>
  );
};

export const useCrypto = () => useContext(Crypto);
