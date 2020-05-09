import React, { useRef, useState, useEffect } from "react";
import "normalize.css";
import List from "./List";
import ListItem from "./ListItem";
import Input from "./Input";
import Hotkeys from "./Hotkeys";

const defaultStyle = {
  width: "calc(90% + (100vw - 100%))",
  color: "#333",               // children inherit
  backgroundColor: "white",    // children inherit
  fontSize: "2.5rem",          // children inherit
  position: "absolute",
  top: "0rem",

  // rounded corners example. 
  boxShadow: "0 0 4px 4px rgba(0,0,0,0.2)",
  border: "none",
  overflow: "hidden"
}

const Search = ({
  data = [],
  mapping = { title: "title" },
  style = defaultStyle,
  activeStyle = { backgroundColor: "pink" },
  placeholder = "Search...",
  shortcuts: shortcuts = false,
  onEnter = (() => { }),
  onInput = (() => { }),
  onClick = (() => { }),
  onEsc = (() => { }),
}) => {
  console.log('Search')
  const inputRef = useRef();
  const appRef = useRef();
  const [tabIndex, setTabIndex] = useState(1);
  const [inputColor, setInputColor] = useState({})
  var inputEvent = new Event('input'); // used to imitate native input event that doesn't trigger when input.value=""

  // input EventListener
  useEffect(() => {
    inputRef.current.addEventListener("input", onInput)
    return () => inputRef.current.removeEventListener("input", onInput)
  }, [onInput])

  // focuses on input field
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  // focus handler for addEventListener
  const focusHandler = e => {
    setTabIndex(e.target.tabIndex);
  };

  // attaches 'focus' eventlistener to the entire component
  useEffect(() => {
    appRef.current.addEventListener("focusin", focusHandler);
    return () => {
      appRef.current.removeEventListener("focusin", focusHandler);
    };
  }, [focusHandler]);

  // moves focus to prev or next tabindex
  function tab(e, step) {
    e.preventDefault();
    let nextTabIndex = tabIndex + step;
    if (nextTabIndex > data.length + 1) {
      if (e.repeat) {
        return;
      }
      nextTabIndex = 1;
    } else if (nextTabIndex < 1) {
      if (e.repeat) {
        return;
      }
      nextTabIndex = data.length + 1;
    }
    const nextElement = appRef.current.querySelector(`[tabIndex="${nextTabIndex}"]`);
    nextElement.focus();
  };

  // Cleanup input
  function CleanupInput() {
    inputRef.current.value = ""
    inputRef.current.dispatchEvent(inputEvent)
    inputRef.current.focus();
  }

  // Click handler

  const clickHandler = (e) => {
    onClick(e)
    CleanupInput()
  }

  // Hotkeys onKeyDown handler
  const onKeyDown = (keyName, e) => {
    if (keyName === "ctrl+j") {
      e.preventDefault();
      tab(e, 1);
    }
    if (keyName === "ctrl+k") {
      e.preventDefault();
      tab(e, -1);
    }
    if (keyName === "esc") {
      if (e.target.closest(".ReactSearchAwesome")) {
        CleanupInput()
        onEsc(e)
      }
    }
    if (keyName === "/") {
      e.preventDefault()
      inputRef.current.focus();
    }
    if (keyName === "enter") {
      if (e.target.closest(".ReactSearchAwesome") && e.target.nodeName == "LI") {
        CleanupInput()
        onEnter(e)
      }
    }
  };

  return (
    <div
      ref={appRef}
      style={{ ...style }}
      className="ReactSearchAwesome"
    >
      <Hotkeys
        onKeyDown={onKeyDown}
      >
        <Input
          ref={inputRef}
          onInput={onInput}
          placeholder={placeholder}
          style={{ ...inputColor }}
          shortcuts={shortcuts}
          onFocus={() => setInputColor({...activeStyle})}
          onBlur={() => setInputColor({})}
        />
        {data.length > 0
          ? (<List>
            {data.map((item, i) => (
              <ListItem
                shortcuts={shortcuts}
                tabIndex={i + 2}
                key={i}
                searchItem={item}
                title={item[mapping.title]}
                activeStyle={activeStyle}
                onClick={(e) => clickHandler(e)}
              />
            ))}
          </List>)
          : (<></>)
        }
      </Hotkeys>
    </div>
  );
};

export default Search;
