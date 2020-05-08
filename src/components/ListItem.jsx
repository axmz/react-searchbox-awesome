import React, { useState } from "react";
import { listItem } from "./styles.module.css"
import ListItemSpan from "./ListItemSpan"

const ListItem = ({
  tabIndex,
  title,
  span,
  searchItem,
  clickHandler,
  color,
  ...otherProps
}) => {
  const dataAttributes = { "data-searchitem": JSON.stringify(searchItem) }
  const [liColor, setLiColor] = useState({})

  return (
    <li
      className={listItem}
      tabIndex={tabIndex}
      style={{
        overflow: "hidden",
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
        paddingRight: "6rem",
        ...liColor
      }}
      onFocus={() => setLiColor({ backgroundColor: color })}
      onBlur={() => setLiColor({})}
      onMouseEnter={() => setLiColor({ backgroundColor: color })}
      onMouseLeave={() => setLiColor({})}
      {...dataAttributes}
      {...otherProps}
    >
      {title}
      {span ? <ListItemSpan /> : <></>}
    </li>
  );
};

export default ListItem;
