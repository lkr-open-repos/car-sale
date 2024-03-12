import { useEffect } from "react";

import classes from "./error.module.css";
import { Link, useNavigate } from "react-router-dom";

const Error = () => {
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
    <div className={`${classes["error-wrapper"]} flex`}>
      <div className={`${classes["error-text"]} flex`}>
        <h1>Oh wait...</h1>
        <h2>
          Something incredibly unexpected and terribly wrong happened. I will
          head back to the homepage and take notes to tackle the issue!
        </h2>
        <Link to={"/"}>Would You Like to Go Home by yourself?</Link>
      </div>
    </div>
  );
};

export default Error;
