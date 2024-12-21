import React, { useState } from "react";
import { Select, MenuItem } from "@mui/material";

import SelectArrow from "assets/iconComponents/SelectArrow";

import "./styles.scss";

const StyledSelect = (
  {
    label,
    value,
    onChange,
    required,
    disabled,
    error,
    options,
    className
  }
) => {
  const [open, setOpen] = useState(false);

  return (
    <div className={`styled-select-wrapper ${className || ""}`}>
      {label && (
        <div className="select-label">
          {label} {required && <span>*</span>}
        </div>
      )}
      <Select
        MenuProps={{
          className: "select-menu-wrapper",
          PaperProps: { className: "paper-wrapper" },
          MenuListProps: { className: "menu-list-wrapper" }
        }}
        className="select-wrapper"
        value={value}
        disabled={disabled}
        IconComponent={SelectArrow}
        error={!!error}
        open={open}
        onOpen={e => {
          e.preventDefault();
          e.stopPropagation();
          setOpen(true);
        }}
        onClose={e => {
          e.preventDefault();
          e.stopPropagation();
          setOpen(false);
        }}
      >
        {options.map(option => (
          <MenuItem
            key={option.value}
            value={option.value}
            onClick={e => {
              e.preventDefault();
              e.stopPropagation();
              setOpen(false);
              onChange(option.value);
            }}
            disabled={!!option.disabled}
            className="select-item"
          >
            {(option.iconComponent || option.icon) && (
              <div className="option-icon">
                {option.iconComponent && option.iconComponent}
                {option.icon && <option.icon />}
              </div>
            )}
            <div className="option-label">
              <div className="overflow-wrapper">
                {option.label}
              </div>
            </div>
          </MenuItem>
        ))}
      </Select>
    </div>
  )
};

export default StyledSelect;
