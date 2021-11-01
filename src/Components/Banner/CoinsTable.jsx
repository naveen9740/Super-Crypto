import axios from "axios";
import { useEffect, useState } from "react";
import { useCrypto } from "../../Context/CurrencyContext";
import { CoinList } from "../../Config/api";
import {
  Container,
  createTheme,
  LinearProgress,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  ThemeProvider,
  Typography,
} from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { Pagination } from "@material-ui/lab";

export const CoinsTable = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const { currency, symbol } = useCrypto();
  const [page, setPage] = useState(1);

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
    fetchCoins();
  }, [currency]);

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });

  const handleSearch = () => {
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search) ||
        coin.symbol.toLowerCase().includes(search)
    );
  };
  const navigate = useNavigate();
  const useStyles = makeStyles(() => ({
    row: {
      backgroundColor: "#1617a",
      cursor: "pointer",
      "&:hover": {
        backgroundColor: "#131111",
      },
      fontFamily: "Roboto",
    },
    pagination: {
      "& .MuiPaginationItem-root": {
        color: "gold",
      },
    },
  }));
  const classes = useStyles();
  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  return (
    <div>
      <ThemeProvider theme={darkTheme}>
        <Container style={{ textAlign: "center" }}>
          <Typography variant="h4" style={{ margin: 18, fontFamily: "Roboto" }}>
            CryptoCurrency Prices by Market Cap
          </Typography>
          <TextField
            label="Search for a CryptoCurrency"
            variant="outlined"
            style={{ width: "100%", marginBottom: 20 }}
            onChange={(e) => setSearch(e.target.value)}
          />
          <TableContainer>
            {loading ? (
              <LinearProgress style={{ backgroundColor: "gold" }} />
            ) : (
              <>
                <Table aria-label="simple table">
                  <TableHead style={{ backgroundColor: "#EEBC1D" }}>
                    <TableRow>
                      {["Coins", "Price", "24h Change", "Market Cap"].map(
                        (head) => {
                          return (
                            <TableCell
                              style={{
                                color: "black",
                                fontWeight: "700",
                                fontFamily: "Roboto",
                                textAlign: "center",
                              }}
                              key={head}
                              align={head === "coin" ? "" : "right"}
                            >
                              {head}
                            </TableCell>
                          );
                        }
                      )}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {handleSearch()
                      .slice((page - 1) * 10, (page - 1) * 10 + 10)
                      .map((row) => {
                        const profit = row.price_change_percentage_24h > 0;
                        return (
                          <TableRow
                            onClick={() => navigate(`/coins/${row.id}`)}
                            className={classes.row}
                            key={row.name}
                          >
                            <TableCell
                              component="th"
                              scope="row"
                              style={{
                                gap: 15,
                                textAlign: "center",
                              }}
                            >
                              <img
                                src={row?.image}
                                alt={row.name}
                                height="50"
                                style={{
                                  marginBottom: 10,
                                }}
                              />
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                }}
                              >
                                <span
                                  style={{
                                    textTransform: "uppercase",
                                    fontSize: 22,
                                  }}
                                >
                                  {row.symbol}
                                </span>
                                <span style={{ color: "darkgray" }}>
                                  {row.name}
                                </span>
                              </div>
                            </TableCell>
                            <TableCell style={{ textAlign: "center" }}>
                              {symbol}
                              {numberWithCommas(row.current_price.toFixed(2))}
                            </TableCell>
                            <TableCell
                              style={{
                                color: profit > 0 ? "rgb(14,203,129)" : "red",
                                fontWeight: 500,
                                textAlign: "center",
                              }}
                            >
                              {profit && "+"}{" "}
                              {row.price_change_percentage_24h.toFixed(2)}%
                            </TableCell>
                            <TableCell style={{ textAlign: "center" }}>
                              {symbol}
                              {numberWithCommas(
                                row.market_cap.toString().slice(0, -6)
                              )}
                              M
                            </TableCell>
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </>
            )}
          </TableContainer>
          <Pagination
            style={{
              padding: 20,
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
            count={(handleSearch()?.length / 10).toFixed(0)}
            classes={{ ul: classes.pagination }}
            onChange={(_, value) => {
              setPage(value);
              window.scroll(0, 450);
            }}
          ></Pagination>
        </Container>
      </ThemeProvider>
    </div>
  );
};
