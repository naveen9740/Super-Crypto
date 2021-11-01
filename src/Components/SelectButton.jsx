import { makeStyles } from "@material-ui/core";

export const SelectButton = ({ children, selected, onClick }) => {
  const useStyles = makeStyles(() => ({
    selectButton: {
      borderRadius: 5,
      padding: 10,
      fontFamily: "Roboto",
      cursor: "pointer",
      backgroundColor: selected ? "gold" : "",
      color: selected ? "black" : "",
      fontWeight: selected ? 700 : 500,
      "&:hover": {
        backgroundColor: "gold",
        color: "black",
      },
      width: "20%",
    },
  }));
  const classes = useStyles();
  return (
    <span onClick={onClick} className={classes.selectButton}>
      {children}
    </span>
  );
};
