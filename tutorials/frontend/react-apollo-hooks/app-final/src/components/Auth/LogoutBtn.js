import React from "react";
import { Button } from "react-bootstrap";

const LogoutBtn = ({ logoutHandler }) => (
  <Button
    id="qsLogoutBtn"
    variant="primary"
    className="btn-margin logoutBtn"
    onClick={logoutHandler}
  >
    Log Out
  </Button>
);

export default LogoutBtn;
