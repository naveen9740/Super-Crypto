import { useState } from "react";
import { Box, Button, TextField } from "@material-ui/core";

export const Login = ({ handleClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = () => {};
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
