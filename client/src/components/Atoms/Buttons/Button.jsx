import Button from "@mui/material/Button";

const Button2 = (props) => {
  return <Button variant={props.variant} type={props.type} className={props.className} color={props.color} onClick={props.onClick}>{props.name} </Button>;
};

export { Button2 };
