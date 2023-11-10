import React from "react";
import { Link } from "react-router-dom";
import classes from "./Users.module.css";

export default function NotFoundPage() {
  return (
    <div className={classes.error_wrap}>
      <h2>404</h2>
      <h1>Page not found</h1>
      <p>
        Go to page <Link to="/albums">albums</Link>{" "}
      </p>
    </div>
  );
}
