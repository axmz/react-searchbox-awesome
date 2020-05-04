import React, { forwardRef } from "react";
import InputSpan from './InputSpan'
import styles from './styles.module.css'

const {input} = styles
console.log('input styles', input)

const Input = React.memo(forwardRef(({placeholder, onInput, ...otherProps }, ref) => {
  console.log('Input')

  return (
    <div style={{ position: "relative" }}>
      <input
        ref={ref}
        {...otherProps}
        onInput={(e) => onInput(e)}
        tabIndex={1}
        type="text"
        placeholder={placeholder}
        className={input}
      />
      <InputSpan />
    </div>
  );
}));

export default Input;
