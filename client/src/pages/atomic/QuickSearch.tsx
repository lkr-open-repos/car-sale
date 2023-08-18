import React from "react";
import classes from "./QuickSearch.module.css";
import DropDown from "./DropDown";
import Button from "../../components/shared/Button/Button";

const QuickSearch = () => {
  return (
    <form className={`${classes["quick-search"]} grid`}>
      <DropDown
        valuePairs={[
          { value: "Brand", text: "Brand" },
          { value: "bmw", text: "bmw" },
        ]}
      />
      <DropDown
        valuePairs={[
          { value: "Model", text: "Model" },
          { value: "i5", text: "i5" },
        ]}
      />
      <DropDown
        valuePairs={[
          { value: "Max Price", text: "Max Price ($)" },
          { value: "50.000", text: "50.000$" },
          { value: "100.000", text: "100.000$" },
        ]}
      />
      <DropDown
        valuePairs={[
          { value: "Year", text: "Year" },
          { value: "2020", text: "2020" },
          { value: "2021", text: "2021" },
        ]}
      />
      <div className={`${classes["search-buttons"]} grid`}>
        <Button>SEARCH</Button>
        <a href="/search">Detailed Search</a>
      </div>
    </form>
  );
};

export default QuickSearch;
