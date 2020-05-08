import React, { useRef, useEffect } from 'react'

const Hotkeys = ({ children, onKeyDown }) => {
  const ref = useRef()
  const keyDownHandler = (e) => {
      let keyName = ""
      switch (true) {
        case (
          e.keyCode === 74
          && e.ctrlKey === true
          && e.altKey === false
          && e.shiftKey === false
        ):
          keyName = "ctrl+j"
          break;
        case (
          e.keyCode === 75
          && e.ctrlKey === true
          && e.altKey === false
          && e.shiftKey === false
        ):
          keyName = "ctrl+k"
          break;
        case (
          e.keyCode === 191
          && e.ctrlKey === false
          && e.altKey === false
          && e.shiftKey === false
        ):
          keyName = "/"
          break;
        case (
          e.keyCode === 13
          && e.ctrlKey === false
          && e.altKey === false
          && e.shiftKey === false
        ):
          keyName = "enter"
          break;
        case (
          e.keyCode === 27
          && e.ctrlKey === false
          && e.altKey === false
          && e.shiftKey === false
        ):
          keyName = "esc"
          break;

        default:
          break;
      }

      onKeyDown(keyName, e)
    }

  useEffect(() => {
    document.addEventListener("keydown", keyDownHandler )
    return () => {
      document.removeEventListener("keydown", keyDownHandler)
    }
  }, [keyDownHandler])

  return (
    < >{children}</>
  )
}

export default Hotkeys