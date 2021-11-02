import { useState } from "react";
import { Box, Button, TextField } from "@material-ui/core";
import { useCrypto } from "../../Context/CurrencyContext";
import { signInWithEmailAndPassword } from "@firebase/auth";
import { auth } from "../../firebase";

export const Login = ({ handleClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setAlert } = useCrypto();
  const handleSubmit = async () => {
    if (!email || !password) {
      setAlert({
        open: true,
        message: `Please Fill All the Fields`,
        type: "warning",
      });
      return;
    }
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      console.log(result);
      setAlert({
        open: true,
        message: `Sign Up sccess, Welcome ${result.user.email}`,
        type: "success",
      });
      handleClose();
    } catch (error) {
      setAlert({ open: true, message: error.message, type: "error" });
    }
  };
  return (
    <>
      <Box
        p={3}
        style={{ display: "flex", flexDirection: "column", gap: "20px" }}
      >
        <TextField
          variant="outlined"
          type="email"
          label="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
        />
        <TextField
          variant="outlined"
          type="email"
          label="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
        />

        <Button
          variant="outlined"
          size="large"
          style={{ backgroundColor: "#EEBC1D" }}
          onClick={handleSubmit}
        >
          Sign Up
        </Button>
      </Box>
    </>
  );
};
