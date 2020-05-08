import React from "react";
import { list } from "./styles.module.css"

const List = ({ children }) => {
  return (
    <ul className={list} >
      {children}
    </ul>
  );
};

export default List;
