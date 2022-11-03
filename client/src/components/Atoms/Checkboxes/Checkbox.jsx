import * as React from "react";
import Checkbox from "@mui/material/Checkbox";

export default function CheckboxAtom(props) {
  return (
    <Checkbox 
      sx={{
        padding:props.padding,
        margin:props.margin,
        color: 'yellow',
        "&.Mui-checked": {
          color: 'orange',
        },
        '& .MuiSvgIcon-root': { fontSize: props.checkboxSize },
        
       
      }}
      label={props.label}
      checked={props.checked}
      
    />
  );
}
