import React from "react";
import { listItem } from "./styles.module.css"
import ListItemSpan from "./ListItemSpan"

const ListItem = React.memo(({ tabIndex, title, searchItem }) => {
  const dataAttributes = { "data-searchitem": JSON.stringify(searchItem) }

  return (
    <li
      className={listItem}
      {...dataAttributes}
      tabIndex={tabIndex}
    >
      {title}
      <ListItemSpan />
    </li>
  );
});

export default ListItem;
