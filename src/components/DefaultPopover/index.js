import React from "react";
import { Popover, Button } from "@mui/material";

import "./styles.scss";

export const PopoverItem = ({ component, label, icon, isDelete, hasDivider, ...restProps }) => (
  <>
    {component || (
      <Button className={isDelete ? "delete" : ""} {...restProps}>
        {icon}
        {label}
      </Button>
    )}
    {hasDivider && <div className="popover-item-divider" />}
  </>
);

const DefaultPopover = ({ state, setState, children, vertical, horizontal, className, onClose }) => {
  return (
    <Popover
      className={`default-popover-wrapper ${className || ""}`}
      open={Boolean(state)}
      anchorEl={state}
      onClose={e => {
        e.stopPropagation();
        setState(null);
        if (onClose) {
          onClose();
        }
      }}
      anchorOrigin={{
        vertical: vertical || "bottom",
        horizontal: horizontal || "center"
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center"
      }}
    >
      {children}
    </Popover>
  );
};

export default DefaultPopover;
