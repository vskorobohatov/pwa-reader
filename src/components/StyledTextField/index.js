import React, { useRef, useEffect } from "react";
import { InputAdornment, TextField } from "@mui/material";

import StyledTooltip from "components/StyledTooltip";

import TooltipIcon from "assets/iconComponents/TooltipIcon";

import "./styles.scss";

const StyledTextField = (
  {
    label,
    required,
    className,
    tooltipTitle,
    errorText,
    error,
    startContent,
    endContent,
    inputComponent,
    ...restProps
  }
) => {
  const ref = useRef();
  const hasError = !!errorText || !!error;

  useEffect(() => {
    if (ref?.current?.type === "number") {
      ref.current.addEventListener("wheel", e => e.preventDefault());
    }
  }, [ref]);

  return (
    <div className={`styled-text-field ${hasError ? "error" : ""} ${className || ""} ${startContent ? "with-start-content" : ""}`}>
      {label && (
        <div className="field-label">
          {label} {required && <span>*</span>}
          {!!tooltipTitle && (
            <StyledTooltip title={tooltipTitle} disableInteractive>
              <div className="tooltip-box">
                <TooltipIcon />
              </div>
            </StyledTooltip>
          )}
        </div>
      )}
      <TextField
        {...restProps}
        error={hasError}
        helperText={errorText}
        inputRef={ref}
        InputProps={{
          ...(startContent ? { startAdornment: <InputAdornment position="start">{startContent}</InputAdornment> } : {}),
          ...(endContent ? { endAdornment: <InputAdornment position="end">{endContent}</InputAdornment> } : {}),
          inputComponent
        }}
      />
    </div>
  )
};

export default StyledTextField;
