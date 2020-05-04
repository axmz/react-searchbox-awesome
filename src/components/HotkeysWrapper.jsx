import React from "react";
import Hotkeys from "react-hot-keys";

const HotkeysWrapper = ({ children, onKeyDown }) => {
  console.log('HotkeysWrapper')
  return (
    <Hotkeys
      filter={e => {
        if (((e.key === "j" && e.ctrlKey !== true)
          || (e.key === "k" && e.ctrlKey !== true))
          && e.target.nodeName === "INPUT"
        ) {
          return false;
        }
        return true;
      }}
      allowRepeat={true}
      keyName="ctrl+j,ctrl+k,esc,/,enter"
      onKeyDown={onKeyDown}
    >
      {children}
    </Hotkeys>
  );
}

  export default HotkeysWrapper;
