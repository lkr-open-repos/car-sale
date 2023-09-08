import React from "react";

import classes from "./FourOFour.module.css";

const fourOFour = () => {
  return (
    <div className={`${classes["four-o-four-wrapper"]} flex`}>
      <div className={`${classes["four-o-four-text"]} flex`}>
        <h1>404</h1>
        <h2>
          Looks like this page took a wrong turn at the crossroads of the
          digital highway!
        </h2>
      </div>
    </div>
  );
};

export default fourOFour;
