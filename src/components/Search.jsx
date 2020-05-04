import React, { useRef, useState, useEffect } from "react";
import "normalize.css";
import List from "./List";
import ListItem from "./ListItem";
import Input from "./Input";
import HotkeysWrapper from "./HotkeysWrapper";

const Search = ({
  data,
  mapping = { title: "title" },
  style,
  color,
  placeholder,
  onEnter,
  onInput,
}) => {
  console.log("Search")
  const ref = useRef();
  const [app, setApp] = useState()
  const [input, setInput] = useState("")
  // const [data, filter] = useState([]);
  const [tabIndex, setTabIndex] = useState(1);

  // identifies the searchbar in the document for further use
  useEffect(() => {
    console.log('setApp')
    setApp(document.querySelector(".ReactSearchAwesome"))
  }, [app])

  // input EventListener
  useEffect(() => {
    const inputEl = app.querySelector("input")
    if (inputEl) {
      inputEl.addEventListener("input", onInput)
    }
    return () => inputEl.removeEventListener("input", onInput)
  }, [app])
  // focuses on input field
  useEffect(() => {
    console.log("focus on ref current")
    ref.current.focus();
  }, [ref]);

  // focus handler for addEventListener
  const focusHandler = React.useCallback(e => {
    setTabIndex(e.target.tabIndex);
  }, []);

  // attaches 'focus' eventlistener to the entire component
  useEffect(() => {
    console.log('focus effect')
    if (app) {
      app.addEventListener("focusin", focusHandler);
      return () => {
        app.removeEventListener("focusin", focusHandler);
      };
    }
  }, [app, focusHandler]);

  // cleanup the input
  const clearInput = () => {
    console.log("clearInput")
    setInput("")
    ref.current.value = ""
    ref.current.focus();
  }

  // moves focus to prev or next tabindex
  function tab(e, step) {
    console.log('tab', tabIndex)
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
    const nextElement = document.querySelector(`[tabIndex="${nextTabIndex}"]`);
    nextElement.focus();
  };

  // Hotkeys onKeyDown handler
  const onKeyDown = (keyName, e, handle) => {
    console.log('onKeyDown')
    if (keyName === "ctrl+j") {
      tab(e, 1);
    }
    if (keyName === "ctrl+k") {
      tab(e, -1);
    }
    if (keyName === "esc") {
      clearInput()
    }
    if (keyName === "/") {
      e.preventDefault()
      ref.current.focus();
    }
    // if (keyName === "enter") {
    //   e.preventDefault()
    //   onEnter(e)
    //   clearInput()
    // }
  };

  return (
    <div style={style} className="ReactSearchAwesome">
      <HotkeysWrapper onKeyDown={onKeyDown}>
        <Input ref={ref} onInput={e => setInput(e.target.value)} placeholder={placeholder} />
        {data.length > 0
          ? (<List>
            {data.map((item, i) => (
              <ListItem
                tabIndex={i + 2}
                key={i}
                searchItem={item}
                title={item[mapping.title]}
                onEnter={onEnter}
              />
            ))}
          </List>)
          : (<></>)}
      </HotkeysWrapper>
    </div>
  );
};

export default Search;
