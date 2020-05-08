import React from 'react'
import { inputSpan, inputSpanInside } from "./styles.module.css"

const InputSpan = React.memo(() => {
  {/* var show or not*/ }
  return (
    <span className={inputSpan}>
      <span
        className={inputSpanInside}
      >/</span>
      <span
        className={inputSpanInside}
      >C^J</span>
      <span
        className={inputSpanInside}
      >C^K</span>
    </span>
  )

})

export default InputSpan