import React from "react";

import { AppBar, Typography, Toolbar, Button } from "@material-ui/core";
import { Link, useNavigate } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

const useStyle = makeStyles({
  root: {
    flexGrow: 1,
  },
  linkStyle: {
    color: "#fafafa",
    textDecoration: "none",
  },
});

function NavBar() {
  const classes = useStyle();
  const navigate = useNavigate();
  const handleSignOut = () => {
    //signout the user
    navigate("/signin");
    console.log("redirect to signin");
  };

  return (
    <>
      <AppBar position="static">
        {/* toolbar used to put contents in row flex */}
        <Toolbar>
          <Typography variant="h3" className={classes.root}>
            <Link className={classes.linkStyle} to="/">
              TodoApp
            </Link>
          </Typography>

          <Typography className={classes.root} variant="subtitle2">
            User
          </Typography>

          <Button color="inherit" onClick={() => handleSignOut()}>
            SignOut
          </Button>
          <Button>
            <Link className={classes.linkStyle} to="/signup">
              SignUp
            </Link>
          </Button>
          <Button>
            <Link className={classes.linkStyle} to="/signin">
              Signin
            </Link>
          </Button>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default NavBar;
