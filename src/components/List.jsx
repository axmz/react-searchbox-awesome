import React from "react";
import { list } from "./styles.module.css"

const List = ({ children }) => {
  console.log("List")
  return (
    <ul className={list} >
      {children}
    </ul>
  );
};

export default List;
