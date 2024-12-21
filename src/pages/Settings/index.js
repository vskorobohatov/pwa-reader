import React, { useEffect, useState } from "react";
import { Button, Checkbox } from "@mui/material";
import { toast } from "react-toastify";

import StyledSelect from "components/StyledSelect";

import "./styles.scss";

export const defaultStyles = {
  fontSize: `16px`,
  fontFamily: "GeneralSans",
  background: "#FFFFFF",
  color: "#000000",
  paddingTop: `20px`,
  paddingBottom: `20px`,
  paddingLeft: `20px`,
  paddingRight: `20px`,
};

const fontFamilyOptions = [
  { label: "Calibri", value: "Calibri" },
  { label: "General Sans", value: "GeneralSans" },
]

const Settings = () => {
  const [styles, setStyles] = useState(defaultStyles);

  useEffect(() => {
    getSavedStyles()
  }, []);

  const getSavedStyles = () => {
    const savedStyles = localStorage.getItem("bookStyles");
    if (!!savedStyles) {
      setStyles(JSON.parse(savedStyles));
    }
  };

  const saveStyles = () => {
    localStorage.setItem("bookStyles", JSON.stringify(styles));
    toast.success("Settings were saved successfully!");
  };

  const getSizeOptions = (min = 11, max = 34) => {
    const res = [];
    for (let i = min; i < max; i++) {
      const val = `${i}px`;
      res.push({ label: val, value: val });
    }
    return res;
  }

  return (
    <div className="settings-wrapper">
      <div className="section">
        <div className="section-title">Basic</div>
        <div className="input-box">
          <div className="label">Font Size</div>
          <StyledSelect
            value={styles.fontSize}
            onChange={val => setStyles({ ...styles, fontSize: val })}
            options={getSizeOptions()}
          />
        </div>
        <div className="input-box">
          <div className="label">Font Family</div>
          <StyledSelect
            className="wide"
            value={styles.fontFamily}
            onChange={val => setStyles({ ...styles, fontFamily: val })}
            options={fontFamilyOptions}
          />
        </div>
        <div className="input-box">
          <div className="label">Font color</div>
          <label className="color-value" htmlFor="fontColor" style={{ background: styles.color }} />
          <input className="color-input" id="fontColor" type="color" value={styles.color} onChange={e => setStyles({ ...styles, color: e.target.value })} />
        </div>
        <div className="input-box">
          <div className="label">Background color</div>
          <label className="color-value" htmlFor="backgroundColor" style={{ background: styles.background }} />
          <input className="color-input" id="backgroundColor" type="color" value={styles.background} onChange={e => setStyles({ ...styles, background: e.target.value })} />
        </div>
      </div>

      <div className="section">
        <div className="section-title">Padding</div>
        <div className="input-box">
          <div className="label">Padding Top</div>
          <StyledSelect
            value={styles.paddingTop}
            onChange={val => setStyles({ ...styles, paddingTop: val })}
            options={getSizeOptions(0, 50)}
          />
        </div>
        <div className="input-box">
          <div className="label">Padding Bottom</div>
          <StyledSelect
            value={styles.paddingBottom}
            onChange={val => setStyles({ ...styles, paddingBottom: val })}
            options={getSizeOptions(0, 50)}
          />
        </div>
        <div className="input-box">
          <div className="label">Padding Left</div>
          <StyledSelect
            value={styles.paddingLeft}
            onChange={val => setStyles({ ...styles, paddingLeft: val })}
            options={getSizeOptions(0, 50)}
          />
        </div>
        <div className="input-box">
          <div className="label">Padding Right</div>
          <StyledSelect
            value={styles.paddingRight}
            onChange={val => setStyles({ ...styles, paddingRight: val })}
            options={getSizeOptions(0, 50)}
          />
        </div>
      </div>
      <div className="controls-wrapper">
        <Button className="reset" onClick={() => setStyles(defaultStyles)}>Reset to default</Button>
        <Button className="save" onClick={saveStyles}>Save changes</Button>
      </div>
    </div>
  )
};

export default Settings;
