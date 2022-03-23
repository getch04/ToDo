import React from "react";

import {
  Typography,
  TextField,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  formStyle: {
    padding: "30px",
    margin: "0px auto",
    maxWidth: "400px",
    borderRadius: "9px",
    boxShadow: "0px 0px 12px -3px #000000",
    // textAlign: "center",
    justifyContent: "center",
  },

  spacing: {
    marginTop: "20px",
  },
});

function SignIn() {
  const classes = useStyles();
  return (
    <>
      <form noValidate autoComplete="off" className={classes.formStyle}>
        <Typography variant="h5"> SignIn: </Typography>

        <TextField
          className={classes.spacing}
          id="enter-email"
          label="enter email"
          variant="outlined"
          fullWidth
        />

        <TextField
          className={classes.spacing}
          id="enter-password"
          type="password"
          label="enter password"
          variant="outlined"
          fullWidth
        />
        <Button
          className={classes.spacing}
          variant="contained"
          color="primary"
          type="submit"
        >
          SignIn
        </Button>
      </form>
    </>
  );
}

export default SignIn;
