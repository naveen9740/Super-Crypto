import {
  CircularProgress,
  createTheme,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { HistoricalChart } from "../Config/api";
import { useCrypto } from "../Context/CurrencyContext";
import { Line } from "react-chartjs-2";
import { SelectButton } from "./SelectButton";

export const CoinInfo = ({ coin }) => {
  const [historicData, setHistoricData] = useState();
  const [days, setDays] = useState(1);

  const { currency, symbol } = useCrypto();
  useEffect(() => {
    (async () => {
      const { data } = await axios.get(
        HistoricalChart(coin.id, days, currency)
      );
      setHistoricData(data.prices);
    })();
  }, [currency, days]);

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });
  const useStyles = makeStyles((theme) => ({
    container: {
      width: "75%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      marginTop: 25,
      paddingTop: 40,
      [theme.breakpoints.down("md")]: {
        width: "100%",
        marginTop: 0,
        padding: 20,
      },
    },
  }));
  const classes = useStyles();

  return (
    <ThemeProvider theme={darkTheme}>
      <div className={classes.container}>
        {!historicData ? (
          <CircularProgress
            style={{ color: "gold" }}
            size={250}
            thickness={1}
          />
        ) : (
          <>
            <Line
              data={{
                labels: historicData.map((coin) => {
                  let date = new Date(coin[0]);
                  let time =
                    date.getHours() > 12
                      ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                      : `${date.getHours()}:${date.getMinutes()} AM`;
                  return days === 1 ? time : date.toLocaleDateString();
                }),

                datasets: [
                  {
                    data: historicData.map((coin) => coin[1]),
                    label: `Price ( Past ${days} Days ) in ${currency}`,
                    borderColor: "#EEBC1D",
                  },
                ],
              }}
              options={{
                elements: {
                  point: {
                    radius: 1,
                  },
                },
              }}
            />
            <div
              style={{
                display: "flex",
                marginTop: 0,
                justifyContent: "space-around",
                width: "100%",
              }}
            >
              {["24 Hours", "30 Days", "3 Months", "1 Year"].map(
                (day, index) => {
                  return (
                    <SelectButton
                      key={index}
                      onClick={() => setDays(day)}
                      selected={index === days}
                    >
                      {day}
                    </SelectButton>
                  );
                }
              )}
            </div>
          </>
        )}
      </div>
    </ThemeProvider>
  );
};
