import React from "react";
import { Button } from "react-bootstrap";
import Router from 'next/router'

const LogoutBtn = ({ logoutHandler }) => (
  <Button
    id="qsLogoutBtn"
    variant="primary"
    className="btn-margin logoutBtn"
    onClick={() => Router.push('/api/logout')}
  >
    Log Out
  </Button>
);

export default LogoutBtn;
