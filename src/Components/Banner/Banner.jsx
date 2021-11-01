import { Container, makeStyles, Typography } from "@material-ui/core";
import { Carousel } from "./Carousel";

export let Banner = () => {
  const useStyles = makeStyles(() => ({
    banner: {
      backgroundImage: "url(./banner.jpg)",
      backgroundRepeat: "no-repeat",
      backgroundSize: "100vw",
    },
    bannerContent: {
      height: 400,
      display: "flex",
      flexDirection: "column",
      paddingTop: 25,
      justifyContent: "space-around",
    },
    tagLine: {
      display: "flex",
      textAlign: "center",
      flexDirection: "column",
      paddingTop: 25,
      justifyContent: "space-around",
    },
  }));
  const classes = useStyles();
  return (
    <div className={classes.banner}>
      <Container className={classes.bannerContent}>
        <div className={classes.tagLine}>
          <Typography
            variant="h2"
            style={{
              fontWeight: "bold",
              fontFamily: "Roboto",
              marginBottom: "15",
            }}
          >
            Super Crypto
          </Typography>
          <Typography
            variant="subtitle2"
            style={{
              color: "darkgray",
              fontFamily: "Roboto",
              textTransform: "capitalize",
            }}
          >
            Get All the Latest Info Regarding your Crypto Currencies
          </Typography>
        </div>
        <Carousel />
      </Container>
    </div>
  );
};
