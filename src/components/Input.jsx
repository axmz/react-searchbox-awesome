import React, { forwardRef } from "react";
import InputSpan from './InputSpan'
import styles from './styles.module.css'

const { input } = styles

const Input = forwardRef(({ placeholder, span, ...otherProps }, ref) => {
  return (
    <div style={{ position: "relative" }}>
      <input
        ref={ref}
        {...otherProps}
        tabIndex={1}
        type="text"
        placeholder={placeholder}
        className={input}
      />
      {
        span ? <InputSpan /> : <></>
      }
    </div>
  );
});

export default Input;
