import React, { useState } from "react";
import { listItem } from "./styles.module.css"
import ListItemSpan from "./ListItemSpan"

const ListItem = ({
  tabIndex,
  title,
  shortcuts,
  searchItem,
  clickHandler,
  activeStyle,
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
      onFocus={() => setLiColor({ ...activeStyle })}
      onBlur={() => setLiColor({})}
      onMouseMoveCapture={() => setLiColor({ ...activeStyle })}
      onMouseLeave={() => setLiColor({})}
      {...dataAttributes}
      {...otherProps}
    >
      {title}
      {shortcuts ? <ListItemSpan /> : <></>}
    </li>
  );
};

export default ListItem;
