import React from "react";
import TextField from "@mui/material/TextField";

const Input = (props) => {
  return (
    <TextField
      inputProps={{
        minLength: props.min,
        maxLength: props.max,      
       
      }}
      sx={{
        width: props.width,
        backgroundColor: props.bg,
        margin: props.margin,
        border: props.border,
        borderRadius: props.borderRadius,  
        borderColor: props.borderColor,        
        input: {
         
          color: 'yellow',
          "&::placeholder": {    // <----- Add this.
            // opacity: 1,
            color:'aqua'
          },
       },
       label: { color: props.labelColor } 
       
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
     
    />
  );
};

export { Input };
