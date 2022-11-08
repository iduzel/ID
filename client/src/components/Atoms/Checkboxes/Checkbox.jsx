import * as React from "react";
import Checkbox from "@mui/material/Checkbox";

export default function CheckboxAtom(props) {
  return (
    <Checkbox 
      sx={{
        padding:props.padding,
        margin:props.margin,
        color: props.color,
        "&.Mui-checked": {
          color: props.checkedColor,
        },
        '& .MuiSvgIcon-root': { fontSize: props.checkboxSize },
        
       
      }}
      label={props.label}
      checked={props.checked}
      
    />
  );
}
