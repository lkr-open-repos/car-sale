import React, { useEffect } from "react";

import classes from "./FourOFour.module.css";
import { Link, useNavigate } from "react-router-dom";

const fourOFour = () => {
  const navigate = useNavigate();

  useEffect(() => {
    let timeToWait = 5000;
    const timer = setTimeout(() => {
      navigate("/");
    }, timeToWait);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className={`${classes["four-o-four-wrapper"]} flex`}>
      <div className={`${classes["four-o-four-text"]} flex`}>
        <h1>404</h1>
        <h2>
          Looks like this page took a wrong turn at the crossroads of the
          digital highway!
        </h2>
        <Link to={"/"}>Would You Like to Go Home?</Link>
      </div>
    </div>
  );
};

export default fourOFour;
