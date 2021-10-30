import React from "react";
import {
  AppBar,
  Container,
  createTheme,
  makeStyles,
  Toolbar,
  Typography,
  ThemeProvider,
  Select,
  MenuItem,
} from "@material-ui/core";
import { useNavigate } from "react-router-dom";

export let Header = () => {
  const useStyles = makeStyles(() => ({
    title: {
      flex: 1,
      color: "gold",
      fontFamily: "Roboto",
      fontWeight: "bold",
      cursor: "pointer",
    },
  }));
  const classes = useStyles();
  const navigate = useNavigate();
  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });
  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar color="transparent" position="static">
        <Container>
          <Toolbar>
            <Typography onClick={() => navigate("/")} className={classes.title}>
              Super Crypto
            </Typography>
            <Select
              variant="outlined"
              style={{
                width: 100,
                height: 40,
                marginRight: 15,
              }}
            >
              <MenuItem value={"INR"}>INR</MenuItem>
              <MenuItem value={"USD"}>USD</MenuItem>
            </Select>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
};
