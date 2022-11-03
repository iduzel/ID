import React from "react";
import TextField from "@mui/material/TextField";

const Input = (props) => {
  return (
    <TextField
      sx={{
        width: props.width,
        backgroundColor: props.bg,
        borderRadius: props.borderRadius,
        margin: props.margin,
      }}
      fullWidth
      placeholder={props.placeholder}
      required={props.required}
      id={props.id}
      type={props.type}
      label={props.label}
      value={props.value}
      onChange={props.onChange}
      variant={props.variant}
      className={props.className}
      onFocus={props.onFocus}
      onBlur={props.onBlur}
      inputProps={{
        minLength: props.min,
        maxLength: props.max,
      }}
    />
  );
};

export { Input };
