import Button from "@mui/material/Button";

const Button2 = (props) => {
  return (
    <Button
    sx={{
      margin:props.margin,
      borderRadius: props.borderRadius,
      display: props.display
    }}
      className={props.className}
      variant={props.variant}
      type={props.type}
      color={props.color}
      onClick={props.onClick}
      size={props.size}
    >
      {props.name}{" "}
    </Button>
  );
};

export { Button2 };
