import React, { useRef, useState } from "react";
import { Tooltip } from "@mui/material";
import "./styles.scss";

const StyledTooltip = ({ children, isOverflowContent, className, disableInteractive, disablePortal, ...rest }) => {
  const ref = useRef();
  const [open, setOpen] = useState(false);

  if (!rest?.title) {
    return <>{children}</>
  }

  return (
    <Tooltip
      {...rest}
      disableInteractive={disableInteractive}
      ref={ref}
      PopperProps={{
        className: `styled-tooltip ${className || ""} ${disablePortal ? "disable-portal" : ""}`,
        disablePortal
    }}
      onOpen={() => {
        if ((ref?.current?.scrollWidth > ref?.current?.clientWidth && isOverflowContent) || !isOverflowContent) {
          setOpen(true)
        }
      }}
      onClose={() => setOpen(false)}
      open={open}
      enterTouchDelay={0}
    >
      {children}
    </Tooltip>
  )
};

export default StyledTooltip;
